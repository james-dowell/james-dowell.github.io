---
layout: post
title:  "Inline SVGs and their Gotcha's"
description: "Using inline SVG's as an icon set is a great solution for a site, but they do come with nuance's like not displaying correctly in IE, here's some solutions"
date:   2016-04-10 10:30:00 +0100
categories: svg
language: svg
---

Inline SVG's are a popular technique for introducing icon systems for your site. Having used them a number of times now I thought I might share why they're a great option and also discuss some of the gotchas you might get while using them.

### What are inline SVG's?

If you're wondering what inline SVG's are, there's a great [CSS Tricks article][css-tricks-article-on-svg] which describes them, and how to use them, in detail. Essentially they allow you to include an SVG icon using the `<use>` tag. Here's an example:

{% highlight html %}
<svg viewBox="0 0 100 100" class="icon icon-menu">
  <use xlink:href="#menu"></use>
</svg>
{% endhighlight %}


### Inline SVG browser support

| IE | Edge | Firefox | Chrome | Safari |
|----|------|---------|--------|--------|
| 9+ | 11+  | 1.5     | 1.0    | 3.0.4  |

Browser support taken from [MDN][mdn-svg-support]

## Benefit's of inline SVG

 - **You can style them in CSS** - You use CSS to style inline SVG icons which makes them a really powerful icon solution. A great example is creating an icon and changing the fill colour with CSS. This way your not duplicating and loading in a copy of the same icon in a different colour.

 - **They compress well** - Minified/Optimised SVG's can get pretty small, so that's a plus.

 - **They scale well and look fantastic on Retina displays** - One of the main annoyances of using png's for your icon sets is you tend to have to supply both a normal and double size for Retina screens. SVG's or (Scalable Vector Graphics) scale as much as you want and they stay crisp, (so no pixelation).

## Inline SVG gotchas

### CSS fill not working on inline SVG

When using CSS to style an SVG, one of the main reasons to use inline SVG's for your icons, you might find that some of the styles you attempt to apply might not be working. On a number of occasions I've tried to add a fill or stroke colour with CSS and have seen no effect.

If the fill or stroke is not changing colour when you define it in the CSS, it's likely that it's defined as an inline style on the SVG it'self. Be sure to remove any `fill` or `stroke` attributes when you add a new icon to your set.

### SVG Icon not showing correctly in IE

You might find that in any version of IE (including Internet Explorer 11) that your inline SVG icons are malformed or simply don't show at all, yet they look fine in Chrome/Firefox/Safari. This has caught me out a few times and has usually happened when creating/saving SVG's from [Sketch 3][sketch-app] (Bohemian Coding).

Sketch 3 is great design tool for Mac OSX, it's simple yet powerful. However, when exporting SVG's it has a tendency to include plenty of unnecessary elements in it's SVG files. Shown below is an icon that I had trouble with in IE:

<div class="u-landmark">

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="29px" height="28px" viewBox="0 0 29 28" version="1.1">
        <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage">
            <g id="Desktop-HD-Copy-16" sketch:type="MSArtboardGroup" transform="translate(-555.000000, -4022.000000)">
                <g id="tiles" sketch:type="MSLayerGroup" transform="translate(-0.500000, 3997.000000)">
                    <g id="blog2" transform="translate(556.000000, 25.000000)">
                        <g id="Group-3">
                            <path d="M20.4531275,14.0346379 C20.4531275,11.6312 20.4537548,9.22776212 20.4528424,6.82432424 C20.4524432,5.83474379 19.8105532,5.19091487 18.8267324,5.19085784 C15.6106102,5.19062974 12.394488,5.19068676 9.17830876,5.19085784 C8.17635356,5.19085784 7.53731487,5.82812872 7.53720081,6.82934257 C7.53680163,11.6223039 7.53680163,16.4152652 7.53720081,21.2082265 C7.53725784,22.217367 8.16472016,22.8465401 9.17311935,22.8467682 C12.3892986,22.8476236 15.6054208,22.8475096 18.821657,22.8456847 C18.9665613,22.8456277 19.1154574,22.8425483 19.2557426,22.8110126 C19.9929238,22.6456929 20.4522721,22.0420106 20.4526713,21.2449515 C20.4538688,18.8415136 20.4531275,16.4380758 20.4531275,14.0346379 M13.9868953,27.9989963 C6.52674868,28.0914363 -0.153846029,21.9099943 0.00269164969,13.7260106 C0.149306721,6.0641613 6.44970591,0.0231755601 14.0136407,0.0249433809 C21.5929727,0.0266541752 28.1599136,6.23455642 27.9871234,14.3464016 C27.822431,22.0845523 21.4132823,28.0835096 13.9868953,27.9989963" id="Fill-1" sketch:type="MSShapeGroup" mask="url(#mask-2)"/>
                        </g>
                        <path d="M17.5979031,19.0413857 C17.5979031,18.7559112 17.5846159,18.4997483 17.602123,18.2457523 C17.6163796,18.0395446 17.5408766,17.9914143 17.3441923,17.9925548 C16.0117116,18.0005955 14.6791169,17.9968318 13.3465222,17.9968318 C12.3609906,17.9968318 11.3754591,18.0004244 10.3899845,17.9934102 C10.2144,17.9922126 10.1342778,18.0315609 10.1509866,18.2237401 C10.1671251,18.4097605 10.1706607,18.6000008 10.1503022,18.7851658 C10.1257809,19.0082534 10.218677,19.0461189 10.4202656,19.0455487 C12.7244774,19.0389336 15.0286892,19.0413857 17.332958,19.0413857 L17.5979031,19.0413857 Z M17.5979031,16.0400253 C17.5979031,15.7736546 17.5980171,15.5329458 17.5979031,15.29218 C17.597789,14.9960415 17.597732,14.9955853 17.309064,14.9955853 C15.0186525,14.9954143 12.7283552,14.9954713 10.4380008,14.9954713 C10.4032717,14.9954713 10.3683715,14.9984367 10.3339275,14.9953002 C10.201455,14.9829255 10.1460823,15.0356749 10.1522982,15.1741923 C10.1613084,15.3749825 10.1684937,15.5778827 10.1506444,15.7775324 C10.1318257,15.9875039 10.1996872,16.045899 10.4138216,16.0451006 C12.7249906,16.0369458 15.0361026,16.0400253 17.3472717,16.0400253 L17.5979031,16.0400253 Z M17.5969336,11.9941678 L17.2907014,11.9941678 L10.8361026,11.9941678 C10.6764855,11.9941678 10.5164122,12.0013532 10.3573084,11.9921719 C10.2077849,11.9835609 10.1412921,12.0304367 10.1516709,12.1911943 C10.1638175,12.377842 10.1543511,12.5658012 10.1545222,12.7531902 C10.1546933,13.0383226 10.1547503,13.0386648 10.4321271,13.0386648 C12.7293817,13.0387788 15.0266933,13.0387218 17.3239479,13.0386648 C17.3725914,13.0386648 17.4284774,13.0533206 17.4678827,13.0342167 C17.5179519,13.0098664 17.5898053,12.9592839 17.591288,12.9177686 C17.6018379,12.6210599 17.5969336,12.3237238 17.5969336,11.9941678 L17.5969336,11.9941678 Z M17.5979031,10.0373613 C17.5979031,9.76357719 17.5980741,9.51585418 17.5979031,9.26818819 C17.5976749,8.99377678 17.5975609,8.99297841 17.3293084,8.99292138 C15.0250965,8.99275031 12.7209418,8.99286436 10.4166729,8.99286436 C10.3819438,8.99286436 10.3471576,8.99525947 10.3125996,8.99309246 C10.1991169,8.98573605 10.1495609,9.03261181 10.1529825,9.15111283 C10.1590843,9.35914542 10.1687788,9.56877475 10.1505303,9.77538167 C10.1318827,9.98643666 10.2011699,10.043121 10.4143919,10.0423796 C12.7255039,10.0343959 15.0366729,10.0373613 17.3477849,10.0373613 L17.5979031,10.0373613 Z M19.4085507,14.03429 C19.4085507,16.4236424 19.4086648,18.8129947 19.4084367,21.202347 C19.4083796,21.6445874 19.2345629,21.8186892 18.7911251,21.8187462 C15.5960456,21.8190884 12.4009662,21.8190884 9.20588676,21.8188033 C8.74539796,21.8187462 8.58167495,21.6533124 8.58167495,21.1902574 C8.5815609,16.4114957 8.5815609,11.632791 8.58167495,6.85408635 C8.58167495,6.3874387 8.73547536,6.23546314 9.20885214,6.23546314 C12.4038745,6.23529206 15.598954,6.23523503 18.7940904,6.23552016 C19.2526403,6.23552016 19.4084367,6.39057515 19.4084367,6.8453613 C19.4086077,9.24167088 19.4085507,11.6379804 19.4085507,14.03429 L19.4085507,14.03429 Z" id="Fill-4" sketch:type="MSShapeGroup"/>
                    </g>
                </g>
            </g>
        </g>
    </svg>

</div>

I have truncated it slightly but here's the SVG code that was produced by Sketch.

{% highlight html %}
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="29px" height="28px" viewBox="0 0 29 28" version="1.1">
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

### Solution

If you look through the SVG code you can see that there are a number of `<g>` tags, but that isn't affecting the icon in IE. I found that by removing the `<defs>` and `<mask>` tag, the icon showed correctly. It appears that IE doesn't like the `<mask>` tag being used on inline SVG's. It looks like, for one reason or another, Sketch added these in masks and removing them had no effect on how the SVG displays.

By removing these tags the SVG icon now displays correctly in all versions of IE and Edge. The slimmed down SVG would look something like this:

{% highlight html %}
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="29px" height="28px" viewBox="0 0 29 28" version="1.1">
    <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Desktop-HD-Copy-16" sketch:type="MSArtboardGroup" transform="translate(-555.000000, -4022.000000)">
            <g id="tiles" sketch:type="MSLayerGroup" transform="translate(-0.500000, 3997.000000)">
                <g id="blog2" transform="translate(556.000000, 25.000000)">
                    <path d="M20.4531275,14.0346379 ..." id="Fill-1" sketch:type="MSShapeGroup"/>
                    <path d="M17.5979031,19.0413857 ..." id="Fill-4" sketch:type="MSShapeGroup"/>
                </g>
            </g>
        </g>
    </g>
</svg>
{% endhighlight %}

This can be further optimised by using build tools such as [gulp-svgmin][gulp-svgmin] or [grunt-svgmin][grunt-svgmin].

[css-tricks-article-on-svg]: [https://css-tricks.com/svg-sprites-use-better-icon-fonts/]
[sketch-app]: [https://www.sketchapp.com/]
[gulp-svgmin]: [https://www.npmjs.com/package/gulp-svgmin]
[grunt-svgmin]: [https://github.com/sindresorhus/grunt-svgmin]
[mdn-svg-support]: [https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg]
