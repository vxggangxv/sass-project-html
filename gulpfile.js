'use strict';
/**
 * 모듈 호출
 * [del]                - 폴더(디렉토리)/파일 제거
 * [gulp-if]            - 조건 처리
 * [gulp-rename]        - 파일 이름 변경
 * [gulp-jade]          - Jade 컴파일
 * [gulp-plumber]       - 오류 발생해도 watch 업무 지속
 * [gulp-watch]         - 변경된 파일만 처리
 * [gulp-html-prettify] - HTML 구조 읽기 쉽게 변경
 * [gulp-connect-multi] - 웹 서버
 */
var del      = require('del'),
	gulp     = require('gulp'),
	gulpif   = require('gulp-if'),
	rename   = require('gulp-rename'),
//	jade     = require('gulp-jade'),
	compass  = require('gulp-compass'),
	plumber  = require('gulp-plumber'),
	watch    = require('gulp-watch'),
	prettify = require('gulp-html-prettify'),
	connect  = require('gulp-connect-multi')(),
	preen		 = require('preen'),

	// 환경설정 ./config.js
	config   = require('./config')();
	
/**
 * Gulp 업무(Tasks) 정의
 */

// 기본
gulp.task('default', ['template', 'compass', 'js', 'connect', 'watch']);
gulp.task('prepare', ['preen', 'bower:copy']);

// 관찰
gulp.task('watch', [], function(){
	// HTML 템플릿 업무 관찰
	watch(config.jade.src, function() {
		gulp.start('template');
	});
	// Sass 업무 관찰
	watch(config.sass.src, function() {
		gulp.start('compass');
	});
});

// 제거
gulp.task('clean', function(){
	del(config.dev);
});
// Bower 패키지에서 필요한 파일만 골라내기(Preen)
gulp.task('preen', function(cb) {
	preen.preen({}, cb);
});
// Bower 패키지 복사
gulp.task('bower:copy', function() {
	// susy
	gulp.src(config.bower.susy.src)
		.pipe( gulp.dest(config.bower.susy.dest) );
	gulp.src(config.bower.breakpoint.src)
		.pipe( gulp.dest(config.bower.breakpoint.dest) );
	// fontawesome
	gulp.src(config.bower.fontawesome.src)
		.pipe( gulp.dest(config.bower.fontawesome.dest) );
	// jquery, modernizr, detectizr
	gulp.src(config.bower.others.src)
		.pipe( gulp.dest(config.bower.others.dest) );
});

// 웹 서버
gulp.task('connect', connect.server( config.sev ) );
// HTML 템플릿(Jade)
gulp.task('template', function(){
	gulp.src(config.jade.src)
		.pipe( plumber() )
//		.pipe( jade() )
//		.pipe( prettify(config.htmlPrettify) )
		.pipe( gulp.dest(config.dev) )
		.pipe( connect.reload() );
});

gulp.task('compass', function() {
	gulp.src( config.sass.src )
		.pipe( plumber() )
		.pipe( compass({
			css : config.sass.dest,
			sass: config.sass.compassSrc,
			style: 'expanded' // nested, expanded, compact, compressed
		}) )
		.pipe( gulp.dest( config.sass.dest ) )
		.pipe( connect.reload() );
});

gulp.task('js', function(){
	gulp.src(config.js.src)
		.pipe( plumber() )
		.pipe( gulp.dest(config.js.dest) )
		.pipe( connect.reload() );
});
