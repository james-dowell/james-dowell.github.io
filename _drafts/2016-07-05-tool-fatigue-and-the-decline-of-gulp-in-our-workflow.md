---
layout: post
title:  "Easing tool fatigue in our front-end workflow"
description: ""
date:   2016-07-05 16:20:00 +0000
categories: js
language: js
---

As part of a forward thinking team at UVD, I'm no stranger to tool fatigue and the frustrations that go with it. Having 10+ (at least) gulp plugins running all manor of tasks from, SCSS compiling, template cache generation, test running to Typescript compilation.

Many of us are used to composing large Gulpfile's or Gruntfile's to perform build and development tasks as we develop complex projects, but recently I've been utilising the power of `npm` scripts to run tools straight from the command line.

Using `npm` scripts is nothing new, there are a number of articles that detail how powerful they can be, and why we should all be using them.

### Gulp power!

As JavaScript has matured over the last 12 months into ES2016/ES2017 and the explosion of other languages like Dart and Typescript mean that more then ever before we are transpiling into ES5 JavaScript. I, for example, have leveraged the power of Typescript on a number of projects, both personal and professional.

My go to tool was Gulp which used to be responsible for serving assets, transpiling code, building styles and many other tasks. Now I'm not suggesting that Gulp is dead or that it shouldn't be used.. but it can hoover up a lot of resources while its completing tasks and watching for changes.

Here's an example of some of my older Gulpfile's (used with Babel as you'll notice the ES2015 syntax)

{% highlight js %}
    import runUnitTests from './gulp/unit-tests';
    import serveWithOptions from './gulp/serve';
    import runProtractor from './gulp/e2e';
    import wireDependancies from './gulp/dependancies.js';

    import webdriver from 'gulp-webdriver';
    import selenium from 'selenium-standalone';


    const environment = argv.env || 'development';
    const paths = {
        tmp: '.tmp',
        templates: 'app/views/**/*.html'
    };

    gulp.task('sass', function () {
        return gulp.src('./app/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(`${paths.tmp}/styles`));
    });

    //E2E

    // gulp.task('wiredep', wireDependancies);

    gulp.task('e2e', ['serve:e2e', 'webdriver-update', 'config'], runProtractor);

    //clean
    gulp.task('clean', function () {
        return gulp.src(paths.tmp, { read: false })
            .pipe($.clean());
    });

    //template cache
    gulp.task('templates', function () {
        return gulp.src(paths.templates)
            .pipe($.minifyHtml())
            .pipe($.ngTemplate({
                moduleName: 'sprinterApp',
                prefix:'/views/',
                filePath: 'templates.min.js'
            }))
            .pipe(gulp.dest(paths.tmp + '/scripts'));
    });

    //constants
    gulp.task('config', ['clean'], function () {
        var myConfig = require('./config.json');
        var envConfig = myConfig[environment];

        return $.ngConstant({
                constants: envConfig,
                name: 'config',
                stream: true
            })
            .pipe(gulp.dest(paths.tmp + '/scripts'));

    });

    gulp.task('serve', ['sass', 'templates', 'config'], serveWithOptions());
    gulp.task('serve:e2e', ['sass', 'templates', 'config'], serveWithOptions({ open: false, port: 9876 }))

    gulp.task('test', ['templates', 'config'], (done) => runUnitTests(true /* singleRun */, done));
    gulp.task('test:auto', ['templates', 'config'], (done) => runUnitTests(false /* singleRun */, done));
{% endhighlight %}

What we do now (with a karma & typescript example)
