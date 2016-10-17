---
layout: post
title:  "Typescript Dependancy Injection"
description: ""
date:   2016-09-25 16:20:00 +0000
categories: typescript
language: ts
---

Dependancy injection is a common feature in programming languages and became popular in JavaScript when Angular 1 was first released. Angular one allowed developers to create external services/factories and inject them into view/model controllers in one of the first mainstream view/model frameworks for web app development in JavaScript.

We're going to take a look at some of the latest dependancy injection libraries for [TypeScript][typescript-homepage], (A superset of JavaScript).

## What is dependancy injection

### What are the benefits of dependancy injection?

With the inclusion of the ES6 Class syntax and the Class syntax that you can use within the TypeScript ecosystem, good OO design and [SOLID principles][solid-principles] in order to create structured and clean applications.

If you want to learn more about the concept of dependency injection take a look at some of the resources I have provided below:

- [Martin Fowlers article][martin-fowler-dependency-injection] on Control Containers and Dependency Injection pattern.
- A great article by James Shore called [Dependency Injection Demystified][demistify-dependency-injection] in which he details Dependency Injection with simple examples, including some simple examples of how Dependency Injection allows you to simplify Unit Testings classes in isolation.

## TypeScript Dependancy injection libraries

### InversifyJS

In the words of the InversifyJS developers:

<blockquote>A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript</blockquote>

### Di.js / Di-Ts


### Which one to pick

link eg [remap-istanbul][remap-istanbul]


[typescript-homepage]: https://www.typescriptlang.org/
[martin-fowler-dependency-injection]: http://martinfowler.com/articles/injection.html
[demistify-dependency-injection]: http://www.jamesshore.com/Blog/Dependency-Injection-Demystified.html
[solid-principles]: http://aspiringcraftsman.com/2011/12/08/solid-javascript-single-responsibility-principle/
