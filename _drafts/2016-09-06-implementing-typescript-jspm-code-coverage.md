---
layout: post
title:  "Typescript with JSPM code coverage tutorial"
description: "A tutorial for adding code test coverage to a JSPM typescript project with Karma"
date:   2016-09-10 16:20:00 +0000
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

- Finally, ... COME BACK TO ME

![Typescript code coverage html report example](/images/typescript-code-coverage-example.png)

## Prerequisites & Caveats

Now I am going to assume you know a little about karma, you may already have a karma suite running.. if you don't, here are some good articles about getting

1 - No

### Caveats

Currently at the time of writing this article, if you are using `karma-jspm` and giving it typescript files to run the tests - there is no way to implement code coverage. Some clever people are working on it thought so this article might be obsolete in 6 months, (but what isn't in this industry!).

You're going to have to the typescript compiler (tsc) to generate some JS files and run the tests on those - thats what were

## Issues I had with typescript

### Using with JSPM



## Generating typescript code coverage reports

### Re-mapping typescript file

Using [remap-istanbul][remap-istanbul] we can map the coverage report back to the original, pre-compiled code. This allows us to..


[remap-istanbul]: [https://github.com/SitePen/remap-istanbul]
[Test driven development information]:[http://agiledata.org/essays/tdd.html]
