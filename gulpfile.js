var gulp = require("gulp");

//=============================================================================
//  paths
//=============================================================================
var paths = {
		devDir: 	"",
		assetsDir: 	"assets",
		scssDir: 	"assets/style",
		spriteDir: 	"assets/sprite",
		jsDir:		"assets/js",
		templateDir: "template",
		buildDir: 	"build",
	};

//=============================================================================
//  common plugin
//=============================================================================

var plumber = require("gulp-plumber");
var notify  = require("gulp-notify");
var runSequence = require('run-sequence');
var del = require('del');

//=============================================================================
//  CSS
//=============================================================================

var sass = require("gulp-sass");
var pleeease = require("gulp-pleeease");

gulp.task('sass-reload', function() {
	runSequence('sass', 'reload');
});

gulp.task("sass", function() {
	return gulp.src( paths.scssDir + "/**/*.scss")
	.pipe(plumber({
		errorHandler: notify.onError("Error! <%= error.message %>")
	}))
	.pipe(sass({
		includePaths: [
			require("node-bourbon").includePaths,
			require("bourbon-neat").includePaths
		],
		outputStyle: 'expanded'
	}))
	.pipe(pleeease({
		sass: true,
		minifier: false
	}))
	.pipe(gulp.dest( paths.buildDir + "/" ));
});


//=============================================================================
// Sprite
//=============================================================================

var spritesmith = require("gulp.spritesmith");

gulp.task("sprite", function () {
	var spriteData = ["pc","sp"]
	for (var i = 0, len = spriteData.length; i < len; i++) {
		console.log(spriteData[i]);
		var img = gulp.src([paths.spriteDir + "/" + spriteData[i] + "/*.*"])
		.pipe(spritesmith({
			imgName: "sprite.png",
			cssName: "_img_" + spriteData[i] + ".scss",
			imgPath: "img/" + spriteData[i] + "/sprite.png",
			cssFormat: "scss",
			padding: 20,
			cssVarMap: function (sprite) {
				sprite.name = sprite.name;
			}
		}));
		img.img.pipe(gulp.dest( paths.buildDir + "/img/"));
		img.css.pipe(gulp.dest( paths.scssDir ));
	}
});


//=============================================================================
// JavaScript
//=============================================================================

var uglify = require("gulp-uglify");

gulp.task("js", function() {
	return gulp.src(
		[paths.jsDir + "/**/*.js"]
	)
	.pipe(plumber({
		errorHandler: notify.onError("Error! <%= error.message %>")
	}))
	.pipe(uglify({
		preserveComments: 'license' // ライセンスコメントを残しつつminify
	}))
	.pipe(gulp.dest( paths.buildDir + '/js' ));
});


//=============================================================================
// TEMPLATE
//=============================================================================

var fileinclude = require('gulp-file-include');
var prettify = require("gulp-html-prettify");
var strip = require('gulp-strip-comments');

gulp.task('template', function() {
	runSequence('include', 'clean', 'reload');
});

gulp.task('include', function() {
	return gulp.src( [paths.templateDir + "/**/*.*"])
		.pipe(plumber({
			errorHandler: notify.onError("Error! <%= error.message %>")
	}))
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(strip())
	.pipe(prettify({
		indent_char: '	',
		indent_size: 1
	}))
	.pipe(gulp.dest(paths.buildDir));
});

gulp.task('clean', function() {
	return del(paths.buildDir + '/include');
});

//=============================================================================
// browser-sync
//=============================================================================
var browserSync = require("browser-sync");

gulp.task("browser-sync", function () {
	browserSync({
		server: {
			baseDir: paths.buildDir + "/",
			index  : "index.html"
		},
		open : true,
		notify: false	//remove "Connected to Browser Sync"
	});
});

gulp.task("reload", function () {
	browserSync.reload();
});

//=============================================================================
// Watch Tasks
//=============================================================================

gulp.task("default",['browser-sync'], function() {
	gulp.watch( [paths.templateDir + "/**/*.html"] ,["template"]);
	gulp.watch( paths.scssDir + "/**/*.scss" ,["sass-reload"]);
	gulp.watch([paths.jsDir + "/**/*.js"],["js"]);
	gulp.watch( [paths.assetsDir + "/**/*.*", paths.templateDir + "/**/*.*" ],["reload"]);
});
