---
layout: post
title:  "Typescript with JSPM code coverage tutorial"
description: "A tutorial for adding code test coverage to a JSPM typescript project with Karma"
date:   2016-09-20 16:20:00 +0000
categories: typescript
language: ts
---

In this tutorial we will learn how to implement Karma code coverage to a front-end project that uses SystemJS and JSPM, developed in Typescript (which is becoming increasingly popular in large scale front-end clients).

## What is code coverage?

Code coverage or test coverage is essentially the proportion of code that is run by your test suite. It's essentially a measurement of how much of your code is covered with unit tests.

### Why is knowing the level of coverage useful?

Well there are actually a few reasons why you'd want to know covered your code base is.. Not to mention it's cool to gauge how well you've been developing features with [TDD][Test driven development information] (Test Driven Development).

Here are some reasons:

- Firstly, it can help to identify areas of technical debt within an application and these can then be focused on in any areas of downtime. Adding tests to code will help you later when it comes to refactoring.

- Secondly, it helps to identify an are which might need a re-write. For example, if a new feature requires changes in an area with no tests to be altered. You might be better of re-writing that particular file/area with a TDD approach.

- Finally, it helps to reassure both the engineers and clients that the most important conditions (function points) have been tested.

Its important to remember that code coverage isn't about [reaching a quality target][Martin Fowler on test coverage] (i.e. 100% coverage). It's more about the journey to get there and finding untested code. In most cases it unrealistic to expect 100% code coverage, especially when dealing with a legacy project.

### Code coverage report example

Here's an example of the coverage report we're hoping to generate in this tutorial.

![Typescript code coverage html report example](/images/typescript-code-coverage-example.png)

## Prerequisites & Caveats

Now I am going to assume you know a little about karma, you may already have a karma suite running.. if you don't, I'd point you to the [karma-jspm][karma jspm github docs] docs for setting up your unit test suite.

### Caveats

Currently at the time of writing this article, if you are using `karma-jspm` and giving it typescript files to run the tests - there is no way to implement code coverage. Some clever people are working on it thought so this article might be obsolete in 6 months, (but what isn't in this industry!).

You're going to have to the typescript compiler (tsc) to generate some JS files and run the tests on those - which is what we'll be doing in this tutorial.

## How to generate TypeScript code coverage with JSPM

For clarity, I am going to start with the following karma config file:

{% highlight js %}
module.exports = function (config) {
    var configuration = {
        autoWatch: false,
        frameworks: ['jspm', 'mocha', 'chai-sinon', 'chai'],
        reporters: ['dots'],
        logLevel: config.LOG_ERROR,
        plugins: [
            'karma-jspm',
            'karma-mocha',
            'karma-chai',
            'karma-chai-sinon',
            'karma-chrome-launcher',
        ],
        browserNoActivityTimeout: 90000,
        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'gulpAngular'
        },
        basePath: './',

        browsers: [
            'Chrome'
        ],

        proxies: {
            '/.tmp': '/base/.tmp'
        },

        jspm: {
            loadFiles: [
                '.tmp/scripts/**/*.spec.js'
            ],
            serveFiles: [
                '.tmp/scripts/**/*.js',
                'src/**/*.ts'
            ]
        }

    };

    config.set(configuration);
};
{% endhighlight %}

I also have my JSPM loader config file setup using the typescript loader '[plugin-typescript][Frank wallis's typescript loader for system js]' developed by Frank Wallis.

The final piece of this jigsaw comes in the form of a `tsconfig.json` file, which will store out compile config and is where we will specify our typescript files. This will look something like the following:

{% highlight json %}
{
    "compilerOptions": {
        "jsx": "react",
        "target": "es5",
        "module": "system",
        "allowSyntheticDefaultImports": true,
        "noImplicitAny": false,
        "suppressImplicitAnyIndexErrors": false,
        "noImplicitReturns": false,
        "sourceMap": true,
        "outDir": "./.tmp/scripts"
    },
    "compileOnSave": false,
    "filesGlob": [
        "./src/**/*.ts",
        "./src/**/*.tsx",
        "./typings/index.d.ts"
    ],
    "files": [
        "./src/index.spec.ts",
        "./src/index.ts",
        "./typings/index.d.ts"
    ],
    "atom": {
        "rewriteTsconfig": true
    }
}
{% endhighlight %}

For the purposes of this tutorial and to keep it as simple as possible I only have 2 files in the project. An `index.ts` file and an `index.spec.ts` file.

If you wish to download these files, you can do so BY CLICKING HERE (CHANGE ME)

### Getting down to it!

We'll start by installing some dependancies that we're going to need:

```
npm install karma-coverage istanbul --save-dev
```

As stated before, we can't use typescript files directly in karma if we want to generate code coverage reports so we're going to want to use the TypeScript compiler. The best way to do this is to add it to an existing `npm` (and if you're not sure what that is then check out my article on using [npm scripts]({% post_url 2016-09-19-tool-fatigue-and-the-decline-of-gulp-in-our-workflow %}) as build tools) task, something like the following:

{% highlight json %}
{
    "test": "tsc && karma start karma.conf.js --single-run",
}
{% endhighlight %}

Looking back at our tsconfig.json file, you can see that we have defined an `outDir` and in this instance where compiling out files to a `.tmp` directory. We have then reference this directory in our karma config file as part of the JSPM task. I have highlighted this below:

{% highlight js %}
jspm: {
    loadFiles: [
        '.tmp/scripts/**/*.spec.js'
    ],
    serveFiles: [
        '.tmp/scripts/**/*.js',
        'src/**/*.ts'
    ]
}
{% endhighlight %}

In order to get our code coverage working, we first need to add `karma-coverage` to our list of karma plugins in our karma config file:

{% highlight js %}
plugins: [
    'karma-jspm',
    'karma-mocha',
    'karma-chai',
    'karma-chai-sinon',
    'karma-chrome-launcher',
    'karma-coverage'
],
{% endhighlight %}

Follow this up by adding the coverage reporter to the array of reporters:

{% highlight js %}
reporters: ['dots', 'coverage'],
{% endhighlight %}

Next, we're going to need to add the coverage preprocessor. We can do this by referencing our compiled JS code like so:

{% highlight js %}
preprocessors: {
    'src/**/*.html': ['ng-html2js'],
    '.tmp/scripts/**/!(*spec).js': ['coverage']
},
{% endhighlight %}

And last but by no means least, we need to configure our coverage reporter. Now for this example we are going to use istanbul JS. We need to require istanbul at the top of our karma config file and then use it in the following config:

{% highlight js %}
coverageReporter: {
    includeAllSources: true,
    instrumenters: { istanbul: istanbul },
    instrumenter: {
        '**/*.js': 'istanbul'
    },
    instrumenterOptions: {
        istanbul: {
            includeUntested: true
        }
    },
    reporters: [
        // We'll create a remapped (to typescript) html report from this json report - James
        {
            type: 'json',
            dir: './.tmp/coverage-reports',
            subdir: '.'
        },
    ]
},
{% endhighlight %}

Just to talk through this config a little. We are including the `includeAllSources` flag to ensure that all out files are loaded into the reporter, not only the files that are being run by tests. This is important as we won't have a fair reflection of our coverage unless all files are included.

We are also only going to output the JSON coverage report to a `coverage-reports` directory in the `.tmp` folder. You might want to generate other kinds of reports here but for now we are only going to generate a JSON report (which we can use later to map the compiled JS back to the TypeScript files - but I'll get to that in a minute).

Now lets give this a test.... Cue the buzzer! Something's not quite right here (and this took me a while to figure out). This is the message that karma is giving us:

```
Error: (SystemJS) Module http://localhost:9876/.tmp/scripts/index.js interpreted as global module format, but called System.register.
      Error: Module http://localhost:9876/.tmp/scripts/index.js interpreted as global module format, but called System.register.
          at eval (http://localhost:9876/.tmp/scripts/index.js:9:46)
      Evaluating http://localhost:9876/.tmp/scripts/index.js
      Error loading http://localhost:9876/.tmp/scripts/index.spec.js
```

After a bit of googling, I founf the issue to be that karma-jspm doesn't really understand this compiled code and we can add a meta option directly into the karma-jspm config in the karma config file. Something like this:

{% highlight js %}
jspm: {
    loadFiles: [
        '.tmp/scripts/**/*.spec.js'
    ],
    meta: {
        '.tmp/scripts/*': {
            format: 'register'
        }
    },
    serveFiles: [
        '.tmp/scripts/**/*.js',
        'src/**/*.ts'
    ]
}
{% endhighlight %}

One thing to note is that it's key you don't add any file extension to the location of the script in the `.tmp` folder. It must read as the following `'.tmp/scripts/*'` otherwise it's not going to work for you.

After adding the following we get this lovely console output:

```
Chrome 53.0.2785 (Mac OS X 10.11.6): Executed 1 of 1 SUCCESS (0.006 secs / 0 secs)
```

As well as a rather nice JSON coverage report. (of which I'm not going to post the output here). This leads me right onto remapping!

### Re-mapping typescript files

One thing that is going to be really useful is to map the coverage reports from the transpiled JS code to the original TypeScript files. We can do this using [remap-istanbul][remap-istanbul]!

Lets just quickly install that dependancy now..

```
npm install remap-istanbul --save-dev
```

It's rediculously easy to use.. simply reference your generated JSON coverage report and define which type of report you would like to be created. For this tutorial we want to create a HTML report so that we have something nice and pretty to screenshot, we can to this by creating the following `npm` script:

{% highlight json %}
{
    "test:coverage": "remap-istanbul --input ./.tmp/coverage-reports/coverage-final.json --output coverage --type html"
}
{% endhighlight %}

This creates a HTML code coverage report that is mapped back to the original TypeScript files, and by just running a `python -m SimpleHTTPServer 8000` command to serve these static files on port `8000` we can view our report. It should look something like below:

![Typescript code coverage html report filename](/images/typescript-code-coverage-tutorial-example.png)

And if we look in depth at the file..

![Typescript code coverage html report file](/images/typescript-code-coverage-tutorial-file-example.png)

## Conclusion

So to sum up, we have gone through and implemented TypeScript code coverage using JSPM, istanbul and karma-coverage. We then mapped those reports back to the original TypeScript files to make it easier to determine exactly which lines of code are tested and which are not. I hope this helps someone going forward and you have any questions or run into any issues. Please don't hesitate to get in touch using the comments section below!

[remap-istanbul]: https://github.com/SitePen/remap-istanbul
[Test driven development information]: http://agiledata.org/essays/tdd.html
[Martin Fowler on test coverage]: http://martinfowler.com/bliki/TestCoverage.html
[karma jspm github docs]: https://github.com/Workiva/karma-jspm
[Frank wallis's typescript loader for system js]: https://github.com/frankwallis/plugin-typescript
