var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

gulp.task('default', function (cb) {
  exec('mongod', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
  nodemon({
    script: 'app.js',
  })
})