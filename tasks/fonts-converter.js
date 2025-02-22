import Fontmin from "fontmin";

const fontmin = new Fontmin()
	.src("./public/fonts/**/*.ttf") // Исходные файлы
	.use(Fontmin.ttf2eot()) // Конвертация в EOT
	.use(Fontmin.ttf2woff()) // Конвертация в WOFF
	.use(Fontmin.ttf2woff2()) // Конвертация в WOFF2
	.dest("docs/fonts/"); // Куда сохранять

fontmin.run((err, files) => {
	if (err) {
		console.error("❌ Ошибка конвертации:", err);
	} else {
		console.log("✅ Шрифты успешно cконвертированы!");
	}
});
