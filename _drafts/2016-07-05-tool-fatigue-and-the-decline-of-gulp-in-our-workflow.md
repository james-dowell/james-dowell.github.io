---
layout: post
title:  "Easing tool fatigue in your front-end workflow"
description: "Using npm to manage project build tasks is the future of front-end development"
date:   2016-09-09 16:20:00 +0000
categories: js
language: js
---

As part of a forward thinking team at UVD, I'm no stranger to tool fatigue and the frustrations that go with it. Having 10+ (at least) gulp plugins running all manor of tasks from, SCSS compiling, template cache generation, test running to Typescript compilation.

Many of us are used to composing large Gulpfile's or Gruntfile's to perform build and development tasks as we develop complex projects, but recently I've been utilising the power of `npm` scripts to run tools straight from the command line.

Using `npm` scripts is nothing new, there are a number of articles that detail how powerful they can be, and why we should all be using them.

### Gulp power!

As JavaScript has matured over the last 12 months into ES2016/ES2017 and the explosion of other languages like Dart and Typescript mean that more then ever before we are transpiling into ES5 JavaScript. I, for example, have leveraged the power of Typescript on a number of projects, both personal and professional.

My go to tool was Gulp which used to be responsible for serving assets, transpiling code, building styles and many other tasks. Now I'm not suggesting that Gulp is dead or that it shouldn't be used.. but it can hoover up a lot of resources while its completing tasks and watching for changes.

Here's an example of some of my later Gulpfile's (used with Babel as you'll notice the ES2015 syntax). Also not that I other task have been split into separate files and are being imported in.

{% highlight js %}
import runUnitTests from './gulp/unit-tests';
import serveWithOptions from './gulp/serve';
import runProtractor from './gulp/e2e';

import webdriver from 'gulp-webdriver';
import selenium from 'selenium-standalone';


const environment = argv.env || 'development';
const paths = {
    tmp: '.tmp',
    templates: 'app/views/**/*.html'
};

gulp.task('sass', function () {
    ...
});

gulp.task('e2e', ['serve:e2e', 'webdriver-update', 'config'], runProtractor);

//clean
gulp.task('clean', function () {
    ...
});

//template cache
gulp.task('templates', function () {
    ...
});

//constants
gulp.task('config', ['clean'], function () {
    ...
});

gulp.task('serve', ['sass', 'templates', 'config'], serveWithOptions());
gulp.task('serve:e2e', ['sass', 'templates', 'config'], serveWithOptions({ open: false, port: 9876 }))

gulp.task('test', ['templates', 'config'], (done) => runUnitTests(true /* singleRun */, done));
gulp.task('test:auto', ['templates', 'config'], (done) => runUnitTests(false /* singleRun */, done));
{% endhighlight %}

If I was to take this now and have a first attempt at moving some of this to the command line. I've first look at the test tasks.

These tasks could be moved to npm and might look something like the following:

{% highlight json %}
{
    "test": "npm run templateCache && karma start karma.conf.js --single-run",
    "test:watch": "npm run templateCache:watch | karma start karma.conf.js --no-single-run --auto-watch",
    "templateCache": "gulp buildTemplateCache:unit",
    "templateCache:watch": "gulp buildTemplateCache:unit:watch"
}
{% endhighlight %}

In this instance, we are still using gulp to build our template cache for the tests but we're using the gulp task in isolation as opposed to relying on gulp for all the things!

Another example would be with the typescript transpilation. For this particular project, it was using bower for package management which I later upgraded to JSPM (JavaScript Package Manager). Introducing typescript into the project began with using gulp-typescript to transpile code to JavaScript and then used that in the browser.

One major benefit to introducing JSPM into the mix was browser transpilation. Rather than watching and transpiling code of save (fairly intensive tasks), I could now give the browser my typescript and ask JSPM with SystemJS to transpile code in the browser. This gives source mapping and on the fly transpilation out of the box! Magic!

This removed a large chunk of gulp tasks and freeing machine resources, ultimately making it quicker to develop and a faster feedback loop


### Live example

To show what you're npm scripts might look like when you've made it your predominant build tool, here's a snippet from a project I have worked on recently:

{% highlight json %}
{
    ...
    "scripts": {
      "serve": "gulp constants && gulp inject:icons && browser-sync start --config bs-config.js",
      "serve:dist": "npm run build && browser-sync start --config bs-config.dist.js",
      "test": "npm run templateCache && karma start karma.conf.js --single-run",
      "test:coverage:remap": "remap-istanbul --input ./.tmp/coverage-reports/coverage-final.json --output coverage --type html",
      "test:coverage": "rm -rf .tmp/coverage && tsc && npm run templateCache && karma start karma.coverage.conf.js --single-run && npm run test:coverage:remap",
      "test:watch": "npm run templateCache:watch | karma start karma.conf.js --no-single-run --auto-watch",
      "templateCache": "gulp buildTemplateCache:unit",
      "templateCache:watch": "gulp buildTemplateCache:unit:watch",
      "tslint": "tslint -c tslint.json 'src/**/*.ts'",
      "gulp": "gulp",
      "jspm": "jspm",
      "pattern-library": "(cd pattern-library; npm run build)",
      "build": "npm run pattern-library && gulp build",
      "mock-api": "npm run mock-api:factories && robohydra -p 3000 limpid-api.conf",
      "mock-api:factories": "tsc --outDir ./.tmp/factories/ --module commonjs ./src/fixtures/factories/*",
      "build-dependency-bundle": "jspm bundle 'src/app/**/* - [src/**/*]' .tmp/dependancies.js",
      "postinstall": "jspm install && typings install"
    }
}
{% endhighlight %}

Is this you're preferered method of controlling your front-end tools? Or do you have an argument for gulp/grunt over this approach? Let me know below!
