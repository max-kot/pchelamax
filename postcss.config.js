import postcssPxToRem from 'postcss-pxtorem'
import postcssPresetEnv from 'postcss-preset-env'

export default ({ env }) => {
	const isProd = env === "production";
	const plugins = {
		autoprefixer: { grid: "autoplace" }, // Добавляем autoprefixer всегда
	};

	if (isProd) {
		//plugins["postcss-pxtorem"] = postcssPxToRem({
		//	propList: ["*"],
		//	mediaQuery: true,
		//});

		plugins["postcss-preset-env"] = postcssPresetEnv();
	}

	return {
		plugins,
	};
};