---
layout: post
title:  "My opinion on the best living styleguide tools and pattern libraries"
description: "In this article I'll be touching upon what a styleguide / pattern-library is, why they're really useful and what my favourite tool to use is!"
date:   2017-02-26 16:20:00 +0000
categories: typescript
language: scss
---

In this article I'll be touching upon what a styleguide / pattern-library is, why they're really useful and what my favourite tool to use is!

## What is a Styleguide / Pattern Library

The idea of a styleguide

### Atomic design

Styleguides tend to follow some form of atomic design pattern whether it's in the traditional taxonomy of 'atoms', 'molecules' and 'organisms' or the more construction orientated taxonomy of 'objects', 'components' and 'structures'. Choosing a successful taxonomy it usually determined by personal preference, the scale of a project or possibly different brand terminology.

Fabricator is something I have used, and contributed to, for a long time. Its a well tested styleguide which markets itself more as a 'toolkit' mainly because it deals with a large amount of tools/ moving parts. It can deal with your styles, scripts, images, fonts and even be extended to handle icon systems and much more.   

The other styleguide I'm going to talk about is Nucleus. Nucleus is a styleguide tool/generator developed by the friendly 'Pirates' at HolidayPirates to generate a living styleguide. Its much more bare bones which many people would prefer and it makes really good use of comment annotations in order to function. This makes it really great if you want to introduce a styleguide into an existing project. It's not intrusive and can be built up over time.

All styleguides are really useful tools for building out and styling views or components for both SPA (Single Page Applications) and traditional websites alike.

### Alright, so what does a living styleguide mean?

The age of problem of styleguide is that they can rapidly become out of date. While you might start a project by building partials in the stylguide and styling them with SCSS. When it comes to porting them over to where you need them you ultimately end up having to maintain two sets of the same HTML and inevitably the markup in the styleguide becomes outdated. This is where they really start to lose there value.

The ideology of a living styleguide is the idea that your markup can be shared between the styleguide and the application its used within. Therefore it evolves and changes as you develop the application and is updated at the same rate. This can be really useful in the design of future features as a designer can easily see what components are already available and can be included with relative ease into a new feature/design.  

## Existing styleguide tools

### Fabricator

[Fabricator.io][fabricator-website]

In the past .. Fabricator

### Nucleus

[Nucleus github][nucleus-website]

Nucleus and its differences

### Other resources

## Conclusion

[fabricator-website]: https://fbrctr.github.io/
[nucleus-website]: https://holidaypirates.github.io/nucleus/
