import fs from "fs";
import path from "path";

// Пути к файлам
const filesToDelete = [
	path.resolve("src/pages/_bgimg.jsx"),
	path.resolve("docs/_bgimg.html"),
];

// Функция удаления файла, если он существует
function deleteFile(filePath) {
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
		console.log(`✅ Удалён: ${filePath}`);
	} else {
		console.log(`⚠️ Файл не найден: ${filePath}`);
	}
}

// Удаляем файлы
filesToDelete.forEach(deleteFile);
