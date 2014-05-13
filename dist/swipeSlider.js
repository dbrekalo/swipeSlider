;(function($, Swipe){

	"use strict";

	function SwipeSlider(el, options) {

		this.options = $.extend( {}, $.swipeSlider.defaults, options);
		this.$el = $(el);
		this.init();

	}

	SwipeSlider.prototype = {

		init: function(){

			this.$slider = this.options.sliderSelector ? this.$el.find( this.options.sliderSelector ) : this.$el;
			this.$track = this.$slider.children().eq(0);
			this.$slides = this.$track.children();
			this.slidesLength = this.$slides.length;

			this.$slider.addClass('swipe');
			this.$track.addClass('swipe-wrap');
			this.$slides.addClass('slide');

			this.setupSwipe();

			if ( this.slidesLength > 1 ) {

				if ( this.options.enableArrows ) { this.setupArrows(); }
				if ( this.options.enableDots ) { this.setupDotNavigation(); }
				if ( this.options.showPages ) { this.setupPages(); }
				this.setActiveElemContext( this.options.startSlide );

			}

		},

		setupSwipe: function(){

			var self = this,
				options = $.extend({}, this.options, {
					callback: function(index, elem){

						self.setActiveElemContext( index );
						if (self.options.callback ) { self.options.callback( index, elem ); }

					}
				});

			this.swipeApi = new Swipe( this.$slider[0], options);

		},

		setActiveElemContext: function( index ){

			this.$slides.removeClass('active next prev');
			var currentElem = this.$slides.eq( index );

			currentElem.addClass('active');
			currentElem.next().addClass('next');
			currentElem.prev().addClass('prev');

			if( this.options.enableDots ) { this.$dotsElems.removeClass('active').eq( index % this.slidesLength ).addClass('active'); }
			if( this.options.showPages ) { this.$pages.text( (index + 1) + '/' + this.slidesLength ); }

			if ( !this.options.continuous && this.options.enableArrows ){

				this.$arrows.removeClass('disabled');

				if ( index === this.slidesLength-1 ){ this.$arrows.filter('.next').addClass('disabled'); }
				if ( index === 0 ){ this.$arrows.filter('.prev').addClass('disabled'); }

			}

		},

		setupArrows: function(){

			var self = this;
			this.$arrows = $('<a class="' + this.options.arrowClassNext + ' next"><span>' + this.options.arrowNextText + '</span></a><a class="' + this.options.arrowClassPrev + ' prev"><span>' + this.options.arrowPrevText + '</span></a>');

			if ( this.options.wrapArrows ) {
				this.$arrowsWrap = this.$arrows.wrapAll('<div class="sliderArrows">').parent().appendTo( this.$el );
			} else {
				this.$arrows.appendTo( this.$el );
			}

			this.$arrows.on('click', function(){

				var $this = $(this);
				if ( $this.hasClass('disabled') ) { return; }

				self.$el.removeClass('dirNext dirPrev');

				if ( $this.hasClass('next') ){

					self.$el.addClass('dirNext');
					self.swipeApi.next();

				} else {

					self.$el.addClass('dirPrev');
					self.swipeApi.prev();

				}

			});
		},

		setupDotNavigation: function(){

			var self = this;

			this.$dots = $('<div>').addClass(this.options.dotsWrapClass).addClass('num'+ this.slidesLength);

			for ( var i = 0; i < this.slidesLength ; i++ ){
				this.$dots.append('<a class="'+ this.options.dotWrapClass +' dot_wrap_'+ i +'" data-position="'+ i +'"><span class="'+ this.options.dotClass +'">'+ (i+1) +'</span></a> ');
			}

			this.$dotsElems = this.$dots.find('.' + this.options.dotWrapClass);

			this.$dots.appendTo( this.$el ).on( 'click' , '.' + this.options.dotWrapClass, function(){

				var $this = $(this);
				if ( $this.hasClass('active') ) { return; }
				self.swipeApi.slide( $this.data('position') );

			});

		},

		setupPages: function(){

			this.$pages = $('<div class="sliderPages">'+ (this.options.startSlide + 1) +'/'+ this.slidesLength +'</div>').appendTo( this.$el );

		},

		destroy: function(){

			this.$arrows && this.$arrows.remove();
			this.$arrowsWrap && this.$arrowsWrap.remove;
			this.$dots && this.$dots.remove();
			this.$pages && this.$pages.remove();

			this.swipeApi.kill();

			this.$slider.removeClass('swipe').removeAttr('style');
			this.$track.removeClass('swipe-wrap').removeAttr('style');
			this.$slides.removeClass('slide active next prev').removeAttr('style');

			this.$el.data('swipeSlider', null);

		}
	};

	$.swipeSlider = SwipeSlider;

	$.fn.swipeSlider = function( options ){
		return this.each(function () {
			if (!$.data(this, 'swipeSlider')) {
				$.data(this, 'swipeSlider', new SwipeSlider( this, options ));
			}
		});
	};

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

})(window.jQuery, window.Swipe);