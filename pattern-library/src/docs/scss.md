# Guidelines for authoring scss

Below are some loose guidelines for introducing yourself into how to contribute
to the stylesheets.

The style guide currently enforces its rules via [scss-lint](https://github.com/brigade/scss-lint)
the config of which is located at `scss-lint.yml` in the styleguide root.

## BEM

In almost all cases follow a BEM syntax for writing css class names.

**Block**

`.list {}`

**Element**

`.list__item {}`

**Modifier**

```
.list--fancy {

    .list__item {
        // good example of nesting
    }

}
````

#### In HTML

````
<ul class="list list--fancy">
    <li class="list__item">
    </li>
</ul>
````


### Keep in mind

* Avoid nesting further than 3 selectors deep
* BEM's Elements should be 1 element deep, avoid: `.block__element__element`

Best practices and rules change all the time, ask questions and help contribute!
