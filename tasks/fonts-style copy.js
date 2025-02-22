import fs from "fs";
import path from "path";

// Папка с шрифтами
const fontsDir = "public/fonts";
// Файл для подключения шрифтов
const fontsScssFile = "src/scss/base/_fontsAutoGen.scss";
const variableSuffix = '-VF';

// Функция для получения веса и стиля из имени файла
const getFontProperties = (filename) => {
	const lowerName = filename.toLowerCase();
	let weight = 400;
	let style = "normal";

	if (lowerName.includes("thin")) weight = 100;
	else if (lowerName.includes("extralight")) weight = 200;
	else if (lowerName.includes("light")) weight = 300;
	else if (lowerName.includes("medium")) weight = 500;
	else if (lowerName.includes("semibold")) weight = 600;
	else if (lowerName.includes("bold") && !lowerName.includes("extrabold")) weight = 700;
	else if (lowerName.includes("extrabold") || lowerName.includes("heavy")) weight = 800;
	else if (lowerName.includes("black")) weight = 900;

	if (lowerName.includes("italic")) style = "italic";
	if (lowerName.includes("oblique")) style = "oblique";

	return { weight, style };
};

// Функция для проверки вариативных шрифтов
const isVariableFont = (filename) => {
	return filename.toLowerCase().includes("variablefont") || filename.toLowerCase().includes("vf");
};

// Читаем файлы шрифтов
fs.readdir(fontsDir, (err, files) => {
	if (err) {
		console.error("❌ Ошибка чтения папки с шрифтами:", err);
		return;
	}

	let scssContent = `// Автоматически сгенерированный файл \n\n`;

	const fontFiles = files.filter((file) => /\.(woff2|woff|ttf|otf|eot)$/i.test(file));

	fontFiles.forEach((file) => {
		if (file.includes('.otf')) {
			console.log(`❌ Ошибка: ${file} содержит otf формат и не будет подключаться в стили, переконвертируейте в 'ttf'`)
			return
		}


		const fontName = file.split("-")[0].slice(0, file.indexOf('.'));
		const { weight, style } = getFontProperties(file);
		const fontPath = `../fonts/${file.replace(/\.(woff2|woff|ttf|eot)$/i, "")}`;
		// Если шрифт вариативный
		if (isVariableFont(file)) {
			scssContent += `@font-face {
	font-family: "${fontName}${variableSuffix}";
	font-display: swap;
	src: url("${fontPath}.woff2") format("woff2-variations"),
		url("${fontPath}.woff") format("woff-variations"),
		url("${fontPath}.ttf") format("truetype-variations");
		font-weight: 100 900;
		font-style: ${style};
}\n\n`;
		} else {
			scssContent += `@font-face {
	font-family: "${fontName}";
	font-display: swap;
	src: url("${fontPath}.woff2") format("woff2"),
		url("${fontPath}.woff") format("woff"),
		url("${fontPath}.ttf") format("truetype");
	font-weight: ${weight};
	font-style: ${style};
}\n\n`;
		}
	});

	// Записываем в SCSS файл
	fs.writeFile(fontsScssFile, scssContent, (err) => {
		if (err) {
			console.error("❌ Ошибка записи SCSS-файла:", err);
		} else {
			console.log(`✅ Файл ${fontsScssFile} успешно создан!`);
		}
	});
});
