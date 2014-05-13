#Swipe slider
[Swipe.js](https://github.com/thebird/Swipe) wrapper that enables dot and arrow navigation as small and lightweight jQuery plugin.

##Basic usage
```javascript
$('.mySlider').swipeSlider();

$('.mySlider').swipeSlider({
	enableDots : false,
	enableArrows: true,
	arrowClassNext : 'sliderArrow iconArrowRight',
	arrowClassPrev : 'sliderArrow iconArrowLeft'
});

```
##Swipe slider defaults / options
```javascript
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
	dotClass: 'dot'

};
```
