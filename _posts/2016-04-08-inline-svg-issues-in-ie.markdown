---
layout: post
title:  "Inline SVGs and their Gotchas"
date:   2016-04-04 16:20:00 +0000
categories: svg
language: svg
---

Inline SVG's are a popular technique for introducing icon systems for your site. Having used them a number of times now I thought I might share why there a great option and also discuss some of the gotchas you might get while using them.

### What are inline SVG's?

There's a great CSS Tricks article on what are inline SVG's so I won't go into too much detail, but essentially they allow to include

### Inline SVG browser support



## Benefits of inline SVG

 - **You can style them in CSS** - dddsadasdsdasdas

## Inline SVG gotchas

If your useing inline SVG's as

{% highlight html %}
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="29px" height="28px" viewBox="0 0 29 28" version="1.1">
    <!-- Generator: Sketch 3.4.4 (17248) - http://www.bohemiancoding.com/sketch -->
    <title>blog2</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <path id="path-1" d="M0,0.0249205703 L27.9904766,0.0249205703 L27.9904766,28 L0,28"/>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Desktop-HD-Copy-16" sketch:type="MSArtboardGroup" transform="translate(-555.000000, -4022.000000)">
            <g id="tiles" sketch:type="MSLayerGroup" transform="translate(-0.500000, 3997.000000)">
                <g id="blog2" transform="translate(556.000000, 25.000000)">
                    <g id="Group-3">
                        <mask id="mask-2" sketch:name="Clip 2">
                            <use xlink:href="#path-1"/>
                        </mask>
                        <g id="Clip-2"/>
                        <path d="M20.4531275,14.0346379 ..." id="Fill-1" sketch:type="MSShapeGroup" mask="url(#mask-2)"/>
                    </g>
                    <path d="M17.5979031,19.0413857 ..." id="Fill-4" sketch:type="MSShapeGroup"/>
                </g>
            </g>
        </g>
    </g>
</svg>
{% endhighlight %}
