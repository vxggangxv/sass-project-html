module.exports = function() {

	var source       = 'src',
		development  = 'dist',
		bower_path   = 'bower_components',
		remove       = ['.sass-cache', 'dist'],

		// 템플릿 경로
		template = {
			//src  : source + '/jade/**/!(_)*.jade',
			//parts: source + '/jade/**/_*.jade'
			src  : source + '/jade/**/*.html'
		},

		// Sass 경로
		sass = {
			src       : source + '/sass/**/*.{scss,sass}',
			compassSrc: source + '/sass',
			dest      : development + '/css'
		},

		// JS 경로
		js = {
			src : source + '/js/**/*.js',
			dest: development + '/js'
		},

		// Bower 설정
		bower = {
			susy: {
				src: bower_path + '/susy/sass/**',
				dest: source + '/sass/susy'
			},
			breakpoint: {
				src: bower_path + '/breakpoint-sass/stylesheets/**',
				dest: source + '/sass/breakpoint'
			},
			fontawesome: {
				src: bower_path + '/fontawesome/**',
				dest: source + '/sass/fontawesome'
			},
			others: {
				src: [
					bower_path + '/**',
					'!' + bower_path + '/{susy, susy/**}',
					'!' + bower_path + '/{fontawesome, fontawesome/**}',
					'!' + bower_path + '/{breakpoint-sass,breakpoint-sass/**}'
				],
				dest: development + '/js/libs'
			}
		},

		// HTML Prettify 옵션
//		htmlPrettify = {
//			"indent_char": " ",
//			"indent_size": 2
//		},

		// 웹 서버 설정
		server = {
			root: [development],
			port: 90,
			livereload: true,
			open: {
				browser: 'chrome' // chrome(안되면 Google Chrome), iexplore, ...
			}
		};

	return {
		del  : remove,
		src  : source,
		dev  : development,
		rev  : remove,
		sev  : server,

		bower: bower,
		jade : template,
		sass : sass,
		js   : js
	};
};