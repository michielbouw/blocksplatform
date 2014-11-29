function initIsotope() {
    var $containerRight = $('.items.right');
    $containerRight.isotope({
        itemSelector: '.items.right #article',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.items.right #article'
        }
    });
    $containerRight.isotope('layout');

    var $containerLeft = $('.items.left');
    $containerLeft.isotope({
        itemSelector: '.items.left #article',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.items.left #article'
        }
    });
    $containerLeft.isotope('layout');
}

$(document).ready(function() {
// isotope settings
    initIsotope();
});
$(window).load(function() {
// isotope settings
    initIsotope();
    $('.page-content').imagesLoaded().progress( function(container, elem) {
        var $containerLeft = $('.items.left');
        var $containerRight = $('.items.right');
        $containerLeft.isotope()
            .append( elem )
            .isotope( 'appended', elem )
            .isotope('layout');
        $containerRight.isotope()
            .append( elem )
            .isotope( 'appended', elem )
            .isotope('layout');
    });
    //var $containerLeft = $('.items.left');
    //var $containerRight = $('.items.right');
    //$containerLeft.isotope('layout');
    //$containerRight.isotope('layout');
});
$(window).resize(function() {
// isotope settings
    var $containerLeft = $('.items.left');
    var $containerRight = $('.items.right');
    $containerLeft.isotope('layout');
    $containerRight.isotope('layout');
});

(function ($) {
    /*
     Mobile menu
     */
    var obj = $("html");
    $(".menu-open").on("click", function () {
        if (obj.hasClass("js-menu-open")) {
            obj.removeClass("js-menu-open");
        } else {
            obj.addClass("js-menu-open");
        }
    });
})(jQuery);

/*
 * FitText.js 1.1
 *
 * Copyright 2011, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Date: Thu May 05 14:23:00 2011 -0600
 */
(function ($) {
    $.fn.fitText = function (kompressor, options) {
        var compressor = kompressor || 1,
            settings = $.extend({
                minFontSize: Number.NEGATIVE_INFINITY,
                maxFontSize: Number.POSITIVE_INFINITY
            }, options);
        return this.each(function () {
            var $this = $(this);
            var resizer = function () {
                $this.css("font-size", Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)))
            };
            resizer();
            $(window).on("resize", resizer)
        })
    }
})(jQuery);