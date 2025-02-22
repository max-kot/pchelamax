import fs from "fs";

const imagesDir = "docs/assets/images/";
const cssDir = "docs/assets/";

fs.readdir(cssDir, (err, files) => {
	if (err) {
		console.error(`❌ Ошибка чтения папки ${cssDir}:`, err);
		return;
	}

	files.forEach(file => {
		if (file.includes('.css')) {
			fs.readFile(`${cssDir}/${file}`, 'utf8', (err, cssFile) => {
				const cssArray = cssFile.split('url(');
				let modCss = '';

				cssArray.forEach((cssItem) => {
					let addUrl;


					if (cssItem.includes(')')) {
						let modCssItem = ''
						let cssFullImageName = cssItem.split(')')[0];

						let cssImagePath = cssFullImageName.slice(0, cssFullImageName.lastIndexOf('/'));

						let cssImageName = cssFullImageName.slice(cssFullImageName.lastIndexOf('/') + 1, cssFullImageName.indexOf('.'));
						//console.log(cssImageName);

						let imageArray = [];

						fs.readdir(imagesDir, (err, images) => {
							images.forEach(image => {
								if (image.includes(cssImageName + '-')) {
									imageArray.push(image);
								}
							})


							if (imageArray.length > 1) {
								modCssItem += 'image-set('
								imageArray.forEach(image => modCssItem += `url(${cssImagePath}/${image}), `);
								modCssItem += ')'
							}
							console.log(imageArray)
							modCss += modCssItem;
							modCss += cssItem;
							console.log(modCss)
						})
					}


				})
			})
		}
	})

})