import fs from 'fs';
import path from 'path';

// Папка с шрифтами
const fontsDir = 'public/fonts';
// Файл для подключения шрифтов
const fontsScssFile = 'src/scss/base/_fontsAutoGen.scss';
const variableSuffix = '-VF';

// Функция для получения веса и стиля из имени файла
const getFontProperties = (filename) => {
	const lowerName = filename.toLowerCase();
	let weight = 400;
	let style = 'normal';

	if (lowerName.includes('thin')) weight = 100;
	else if (lowerName.includes('extralight')) weight = 200;
	else if (lowerName.includes('light')) weight = 300;
	else if (lowerName.includes('medium')) weight = 500;
	else if (lowerName.includes('semibold')) weight = 600;
	else if (lowerName.includes('bold') && !lowerName.includes('extrabold')) weight = 700;
	else if (lowerName.includes('extrabold') || lowerName.includes('heavy')) weight = 800;
	else if (lowerName.includes('black')) weight = 900;

	if (lowerName.includes('italic')) style = 'italic';
	if (lowerName.includes('oblique')) style = 'oblique';

	return { weight, style };
};

// Функция для проверки вариативных шрифтов
const isVariableFont = (filename) => {
	return filename.toLowerCase().includes('variablefont') || filename.toLowerCase().includes('vf');
};

// Рекурсивное чтение файлов из папки и подпапок
const readFontsRecursively = (dir) => {
	let result = [];

	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const fullPath = path.join(dir, file);
		const stats = fs.statSync(fullPath);

		if (stats.isDirectory()) {
			// Рекурсивно обрабатываем подпапки
			result = result.concat(readFontsRecursively(fullPath));
		} else if (/\.(woff2|woff|ttf|otf|eot)$/i.test(file)) {
			result.push(fullPath);
		}
	});

	return result;
};

// Читаем все шрифты из папки с учетом подпапок
const fontFiles = readFontsRecursively(fontsDir);

let scssContent = `// Автоматически сгенерированный файл \n\n`;

fontFiles.forEach((filePath) => {
	const file = path.basename(filePath);
	if (file.includes('.otf')) {
		console.log(`❌ Ошибка: ${file} содержит otf формат и не будет подключаться в стили, переконвертируейте в 'ttf'`);
		return;
	}

	const fontName = file.split('-')[0].slice(0, file.indexOf('.'));
	const { weight, style } = getFontProperties(file);
	// Нормализуем путь и заменяем обратные слэши на прямые
	const fontPath = `../${path.relative('public', filePath).replace(/\\/g, '/')}`.replace(/\.(woff2|woff|ttf|eot)$/i, '');

	// Если шрифт вариативный
	if (isVariableFont(file)) {
		scssContent += `@font-face {
\tfont-family: "${fontName}${variableSuffix}";
\tfont-display: swap;
\tsrc: url("${fontPath}.woff2") format("woff2-variations"),
\t\turl("${fontPath}.woff") format("woff-variations"),
\t\turl("${fontPath}.ttf") format("truetype-variations");
		font-weight: 100 900;
		font-style: ${style};
}\n\n`;
	} else {
		scssContent += `@font-face {
\tfont-family: "${fontName}";
\tfont-display: swap;
\tsrc: url("${fontPath}.woff2") format("woff2"),
\t\turl("${fontPath}.woff") format("woff"),
\t\turl("${fontPath}.ttf") format("truetype");
\tfont-weight: ${weight};
\tfont-style: ${style};
}\n\n`;
	}
});

// Записываем в SCSS файл
fs.writeFile(fontsScssFile, scssContent, (err) => {
	if (err) {
		console.error('❌ Ошибка записи SCSS-файла:', err);
	} else {
		console.log(`✅ Файл ${fontsScssFile} успешно создан!`);
	}
});
