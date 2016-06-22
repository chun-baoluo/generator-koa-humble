const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');<% if(props.cssPreprocessor == 'Less') { %>
const less = require('gulp-less'); <% } if(props.cssPreprocessor == 'Sass') { %>
const sass = require('gulp-sass'); <% } if(props.cssPreprocessor == 'Stylus') { %>
const stylus = require('gulp-stylus'); <% } %>
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

var paths = {
  js: [
    './private/js/*.js',
  ],<% if(props.cssPreprocessor == 'Less') { %>
  less: [
    './private/less/*.less'
  ],<% } if(props.cssPreprocessor == 'Sass') { %>
  sass: [
    './private/sass/*.scss'
  ],<% } if(props.cssPreprocessor == 'Stylus') { %>
  stylus: [
    './private/stylus/*.styl'
  ],<% } %>
  img: [
    './private/img/*'
  ]
};

function handleError(error) {
  console.log(error.toString());
}

gulp.task('default', ['js',<% if(props.cssPreprocessor == 'Less') { %> 'less' <% } %><% if(props.cssPreprocessor == 'Sass') { %> 'sass' <% } %><% if(props.cssPreprocessor == 'Stylus') { %> 'stylus' <% } %>, 'images', 'watch']);

gulp.task('js',() => {
	return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/js/'))
    .on('error', handleError);
});
<% if(props.cssPreprocessor == 'Less') { %>
gulp.task('less', function () { 
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css/'))
    .on('error', handleError);
});
<% } if(props.cssPreprocessor == 'Sass') { %>
gulp.task('sass', function() {
    return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css'))
    .on('error', handleError);
});
<% } if(props.cssPreprocessor == 'Stylus') { %>
gulp.task('stylus', () => {
  return gulp.src(paths.stylus)
    .pipe(stylus({
      compress: true,
    }))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css/'))
    .on('error', handleError);
});
<% } %>

gulp.task('images', () => {
  return gulp.src(paths.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('./public/img/'))
    .on('error', handleError);;
});

gulp.task('watch', () => {
  gulp.watch(paths.js, ['js']);<% if(props.cssPreprocessor == 'Less') { %>
  gulp.watch(paths.less, ['less']);<% } if(props.cssPreprocessor == 'Sass') { %>
  gulp.watch(paths.sass, ['sass']);<% } if(props.cssPreprocessor == 'Stylus') { %>
  gulp.watch(paths.stylus, ['stylus']);<% } %>
  gulp.watch(paths.img, ['images']);
});