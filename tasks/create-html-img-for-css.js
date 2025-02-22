import fs from "fs";
import path from "path";

// Пути
const srcPath = path.resolve("src");
const pagesPath = path.join(srcPath, "pages");
const bgImgFile = path.join(pagesPath, "_bgimg.jsx");

// Базовый контент для JSX-файла
const baseJsxContent = `import { Img } from "../components/tools/Img";
export default function () {
	return (<div className="_bgimgjsx">
	
	</div>)
}`;

// Создаём файл, если его нет
if (!fs.existsSync(bgImgFile)) {
	fs.mkdirSync(pagesPath, { recursive: true });
	fs.writeFileSync(bgImgFile, baseJsxContent, "utf8");
	console.log("✅ Файл _bgimg.jsx создан");
}

// Функция поиска файлов SCSS
function getScssFiles(dir) {
	let files = [];
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			files = files.concat(getScssFiles(fullPath));
		} else if (file.endsWith(".scss")) {
			files.push(fullPath);
		}
	});
	return files;
}

// Функция поиска background/background-image с url()
function extractImageUrls(scssFile) {
	const content = fs.readFileSync(scssFile, "utf8");
	const regex = /background(?:-image)?:.*?url\(["']?(.*?)["']?\)/g;
	let matches, urls = [];

	while ((matches = regex.exec(content)) !== null) {
		urls.push(matches[1]);
	}

	return urls;
}

// Собираем все пути картинок из SCSS
const scssFiles = getScssFiles(srcPath);
let imageUrls = new Set(); // Используем Set, чтобы избежать дубликатов

scssFiles.forEach((file) => {
	extractImageUrls(file).forEach((url) => imageUrls.add(url));
});

if (imageUrls.size === 0) {
	console.log("❌ Картинки не найдены в SCSS-файлах.");
	process.exit(0);
}

// Читаем bgimg.jsx и вставляем компоненты Img
let jsxContent = fs.readFileSync(bgImgFile, "utf8");
const imgComponents = Array.from(imageUrls).map(url => `\t\t<Img src="${url}" />`).join("\n");

jsxContent = jsxContent.replace(
	/<div className="_bgimgjsx">([\s\S]*?)<\/div>/,
	`<div className="_bgimgjsx">\n${imgComponents}\n\t</div>`
);

// Записываем обновлённый файл
fs.writeFileSync(bgImgFile, jsxContent, "utf8");
console.log(`✅ Обновлён файл: ${bgImgFile} (${imageUrls.size} изображений добавлено)`);
