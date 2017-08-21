# Swipe slider
Extended [Swipe.js](https://github.com/lyfeyaj/swipe) Swipe.js with dot, pages and arrow navigation.

## Basic usage
```js
$('.mySlider').swipeSlider();

$('.mySlider').swipeSlider({
    enableDots : false,
    enableArrows: true,
    arrowClassNext : 'sliderArrow iconArrowRight',
    arrowClassPrev : 'sliderArrow iconArrowLeft'
});

```
## Swipe slider defaults / options
```js
$.swipeSlider.defaults = {

    sliderSelector : null,

    enableDots : true,
    enableArrows: true,
    showPages: false,

    startSlide: 0,
    speed: 600,
    auto: 0,
    continuous: false,
    disableScroll: false,
    stopPropagation: false,
    callback: null,

    wrapArrows: false,
    arrowClassNext : 'sliderArrow',
    arrowClassPrev : 'sliderArrow',
    arrowNextText: 'Next',
    arrowPrevText: 'Previous',
    dotsWrapClass: 'sliderDots',
    dotWrapClass: 'dotWrap',
    dotClass: 'dot',

    onDotsCreate: false

};
```
