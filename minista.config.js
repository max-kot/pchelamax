// https://minista.qranoko.jp/docs/
import { defineConfig } from "minista";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	out: "docs", // dist
	assets: {
		outDir: "assets",
		outName: "[name]",
		images: {
			outName: "[name]", //"[name]_[hash]" <== отвечает за css имена картинок и может добавить хэш
			outDir: "assets/images/",
			optimize: {
				//layout: "fixed", // "fixed", "constrained"
				//breakpoints: undefined, // [320, 400, 640, 800, 1024, 1280, 1440, 1920, 2560, 2880, 3840,]
				resolution: [1, 2],
			},
		},
	},
	resolve: {
		alias: [{
			find: '@/',
			replacement: path.resolve('src') + '/'
		}],
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	},
	server: {
		hmr: true, // Включаем горячую замену модулей
		watch: {
			usePolling: true, // Следит за изменениями в файлах
		},
	},
	plugins: [react()]
});
