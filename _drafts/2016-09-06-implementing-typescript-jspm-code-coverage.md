---
layout: post
title:  "Typescript code coverage with JSPM"
description: "A tutorial for adding code test coverage to a JSPM typescript project with Karma"
date:   2016-09-10 16:20:00 +0000
categories: typescript
language: ts
---

Intro..

## What is code coverage

Code coverage or test coverage is essentially the proportion of code that is run by your test suite.

### Why is knowing the level of coverage useful?

Well there are actually a few reasons why you'd want to know how much of your code if covered. Not to mention it's cool to gauge how well you've been developing feature with TDD.

Here are some reasons:

- Firstly, it can help to identify areas of technical debt within an application and these can then be focused on in any areas of downtime. Adding tests to code will help you later when it comes to refactoring.
- Secondly, it helps to identify an are which might need a re-write. For example, if a new feature requires an area with no tests to be altered. You might be better of re-writing that particular file with a Test Driven Development approach.

![Typescript code coverage html report example](/images/typescript-code-coverage-example.png)



## Issues I had with typescript

### Rather large gotcha with JSPM



## Generating typescript code coverage reports

### Re-mapping typescript file

Using [remap-istanbul][remap-istanbul] we can map the coverage report back to the original, pre-compiled code. This allows us to..


[remap-istanbul]: [https://github.com/SitePen/remap-istanbul]
