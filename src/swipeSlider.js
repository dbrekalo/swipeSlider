(function(factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'swipejs'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'), require('swipejs'));
    } else {
        factory(window.jQuery, window.Swipe);
    }

}(function($, Swipe) {

    function SwipeSlider(el, options) {

        this.options = $.extend({}, SwipeSlider.defaults, options);
        this.$el = $(el);
        this.init();

    }

    SwipeSlider.prototype = {

        init: function() {

            this.$slider = this.options.sliderSelector ? this.$el.find(this.options.sliderSelector) : this.$el;
            this.$track = this.$slider.children().eq(0);
            this.$slides = this.$track.children();
            this.slidesLength = this.$slides.length;

            this.$slider.addClass(this.options.elementClass);
            this.$track.addClass(this.options.trackClass);
            this.$slides.addClass(this.options.slideClass);

            this.setupSwipe();

            if (this.slidesLength > 1) {
                this.setActiveElemContext(this.options.startSlide);
            }

        },

        setupSwipe: function() {

            var self = this;
            var options = $.extend({}, this.options, {
                callback: function(index, elem) {

                    self.setActiveElemContext(index);
                    self.options.callback && self.options.callback(index, elem);

                }
            });

            this.swipeApi = new Swipe(this.$slider.get(0), options);

        },

        setActiveElemContext: function(index) {

            this.$slides.removeClass('active next prev');
            var $currentElem = this.$slides.eq(index);

            $currentElem.addClass('active');

            index + 1 < this.slidesLength && this.$slides.eq(index + 1).addClass('next');
            index - 1 >= 0 && this.$slides.eq(index - 1).addClass('prev');

            this.options.enableDots && this.setupDotNavigation(index);
            this.options.showPages && this.setupPages(index);
            this.options.enableArrows && this.setupArrows(index);

        },

        setupArrows: function(index) {

            var self = this;

            if (!this.$arrows) {

                this.$arrows = $(
                    '<a class="' + this.options.arrowClassNext + ' next"><span>' + this.options.arrowNextText + '</span></a>' +
                    '<a class="' + this.options.arrowClassPrev + ' prev"><span>' + this.options.arrowPrevText + '</span></a>'
                );

                if (this.options.wrapArrows) {
                    this.$arrowsWrap = $('<div class="sliderArrows"></div>').append(this.$arrows).appendTo(this.$el);
                } else {
                    this.$arrows.appendTo(this.$el);
                }

                this.$arrows.on('click', function() {

                    var $this = $(this);
                    if (self.isAnimating || $this.hasClass('disabled')) { return; }

                    self.isAnimating = true;

                    self.$el.removeClass('dirNext dirPrev');

                    if ($this.hasClass('next')) {

                        self.$el.addClass('dirNext');
                        self.swipeApi.next();

                    } else {

                        self.$el.addClass('dirPrev');
                        self.swipeApi.prev();

                    }

                    setTimeout(function() { self.isAnimating = false; }, self.options.speed);

                });

            }

            if (!this.options.continuous && $.isNumeric(index)) {

                this.$arrows.removeClass('disabled');

                if (index === this.slidesLength-1) { this.$arrows.filter('.next').addClass('disabled'); }
                if (index === 0) { this.$arrows.filter('.prev').addClass('disabled'); }

            }
        },

        setupDotNavigation: function(index) {

            var self = this;

            if (!this.$dotsElems) {

                this.$dots = $('<div>').addClass(this.options.dotsWrapClass).addClass('num'+ this.slidesLength);

                for (var i = 0; i < this.slidesLength ; i++) {
                    this.$dots.append(
                        '<a class="'+ this.options.dotWrapClass +' dot_wrap_'+ i +'" data-position="'+ i +'">' +
                            '<span class="'+ this.options.dotClass +'">'+ (i+1) +'</span>' +
                        '</a> ');
                }

                this.$dotsElems = this.$dots.children();

                this.$dots.appendTo(this.$el).on('click', 'a', function(e) {

                    e.preventDefault();

                    var $this = $(this);

                    if (!$this.hasClass('active')) {
                        self.swipeApi.slide($this.data('position'));
                    }

                });

                this.options.onDotsCreate && this.options.onDotsCreate(this.$dots, this.$dotsElems, this);

            }

            if ($.isNumeric(index)) {
                this.$dotsElems.removeClass('active').eq(index % this.slidesLength).addClass('active');
            }

        },

        setupPages: function(index) {

            if (typeof index === 'undefined') { index = this.options.startSlide + 1; }

            var currentPage = index + 1 > this.slidesLength ? index % this.slidesLength + 1 : index + 1;

            this.$pages = this.$pages || $('<div class="sliderPages">').appendTo(this.$el);
            this.$pages.text(currentPage +'/'+ this.slidesLength);

        },

        destroy: function() {

            this.$arrows && this.$arrows.remove();
            this.$arrowsWrap && this.$arrowsWrap.remove;
            this.$dots && this.$dots.remove();
            this.$pages && this.$pages.remove();

            this.swipeApi.kill();

            this.$slider.removeClass(this.options.elementClass).removeAttr('style');
            this.$track.removeClass(this.options.trackClass).removeAttr('style');
            this.$slides.removeClass(this.options.slideClass + ' active next prev').removeAttr('style');

            this.$el.data('swipeSlider', null);

        }
    };

    $.fn.swipeSlider = function(options) {
        return this.each(function() {
            if (!$.data(this, 'swipeSlider')) {
                $.data(this, 'swipeSlider', new SwipeSlider(this, options));
            }
        });
    };

    $.swipeSlider = $.SwipeSlider = SwipeSlider;

    SwipeSlider.defaults = {

        elementClass: 'swipe',
        trackClass: 'swipe-wrap',
        slideClass: 'slide',

        sliderSelector: null,

        enableDots: true,
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
        arrowClassNext: 'sliderArrow',
        arrowClassPrev: 'sliderArrow',
        arrowNextText: 'Next',
        arrowPrevText: 'Previous',
        dotsWrapClass: 'sliderDots',
        dotWrapClass: 'dotWrap',
        dotClass: 'dot',

        onDotsCreate: false

    };

}));
