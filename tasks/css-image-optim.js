import fs from "fs";
import path from "path";

// Папки для работы
const distPath = path.resolve("./docs/assets/");
const imagesPath = path.join(distPath, "images");

// Функция для рекурсивного поиска файлов
function getFiles(dir, ext) {
	let files = [];
	fs.readdirSync(dir).forEach((file) => {
		let fullPath = path.join(dir, file);
		if (fs.statSync(fullPath).isDirectory()) {
			files = files.concat(getFiles(fullPath, ext));
		} else if (file.endsWith(ext)) {
			files.push(fullPath);
		}
	});
	return files;
}

// Функция для поиска оптимизированных картинок
function findOptimizedImages(imageName) {
	let optimizedImages = [];
	const files = getFiles(imagesPath, "");

	files.forEach((file) => {
		const fileBaseName = path.basename(file, path.extname(file));
		if (fileBaseName.startsWith(imageName + "-")) {
			optimizedImages.push(file);
		}
	});

	return optimizedImages;
}

// Функция для генерации image-set (с исправленными слэшами)
function generateImageSet(imagePath) {
	const imageName = path.basename(imagePath, path.extname(imagePath));
	const optimizedImages = findOptimizedImages(imageName);

	if (optimizedImages.length === 0) return null;
	
	// Определяем тип файла и сортируем их в правильном порядке
	const formatPriority = { ".avif": 1, ".webp": 2, ".jpg": 3, ".jpeg": 3, ".png": 4 };
	optimizedImages.sort((a, b) => formatPriority[path.extname(a)] - formatPriority[path.extname(b)]);

	const sources = optimizedImages.map((file) => {
		const ext = path.extname(file);
		const type = ext === ".avif" ? "image/avif" : ext === ".webp" ? "image/webp" : ext === ".jpeg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

		// Приводим к нормальному формату пути
		const normalizedPath = file.replace(distPath, "").replace(/\\/g, "/");

		return `url("${normalizedPath}") ${type ? ` type("${type}")` : ""}`;
	});

	return `image-set(\n\t\t${sources.join(",\n\t\t")}\n\t)`;
}

// Функция для обновления CSS
function updateCss() {
	const cssFiles = getFiles(distPath, ".css");

	cssFiles.forEach((cssFile) => {
		let cssContent = fs.readFileSync(cssFile, "utf8");

		cssContent = cssContent.replace(/background(?:-image)?:\s*url\(([^)]+)\)/g, (match, url) => {
			const imagePath = url.replace(/['"]/g, "").replace("/assets/", distPath);
			const imageSet = generateImageSet(imagePath);

			if (imageSet) {
				return `background: ${imageSet};`;
			}
			return match; // Если не нашли альтернативы, оставляем оригинальный url
		});

		fs.writeFileSync(cssFile, cssContent, "utf8");
		console.log(`✅ Обновлён файл: ${cssFile}`);
	});
}

// Запускаем обновление CSS
updateCss();
