import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import purgeCss from 'gulp-purgecss'
import beautify from 'gulp-beautify'
import { log } from 'console'

const sass = gulpSass(dartSass)

const scss = () => {
	return app.gulp
		.src(app.path.src.scss, {
			sourcemaps: app.isDev,
		})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SCSS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			sass({
				outputStyle: 'expanded',
			})
		)
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				purgeCss({
					content: [`${app.path.watch.html}`, `${app.path.watch.js}`],
					defaultExtractor: content => content.match(/[A-z0-9-:\/\.]+/g) || [],
				})
			)
		)
		.pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ['last 3 versions'],
					cascade: true,
				})
			)
		)
		.pipe(
			beautify.css({
				indent_with_tabs: true, // Использовать табуляцию
				indent_size: 4, // Размер табуляции
			})
		)
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream())
}

export { scss }
