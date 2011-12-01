/*
 * Author: @_ty
 * Tested with: 1.6.4.
 *
 * jQuery plugin for css fades.
 * It's usage is identical to jQuerys fadeIn, fadeOut & fadeToggle,
 * except you must pass in a number in ms for the duration.
 *
 * Currently this plugin assumes that you can handle
 * CSS3 (no detection support yet).
 *
 * Example Usage: 
 *
 * $('body').cssFadeIn(600, 'linear', function() {
 *     boom();
 * });
 *
 * $('body').cssFadeIn(300, function() {
 *    boom();
 * });
 *
 * $('body').cssFadeToggle();
 */
(function($) {
    var timingFunctions = [
        'default',
        'linear',
        'ease-in',
        'ease-out',
        'ease-in-out',
        'cubic-bezier'
    ];
    
    // The meat of the plugin.
    var common = function($this, type, duration, easing, callback, opacity) {
        var callback = callback || function() {},
            opacity = parseFloat(opacity);

        if (typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }
        
        if (duration === undefined) {
            duration = 400;
        }
        
        if (easing === undefined) {
            easing = 'linear';
        } else {
            // Check if the easing type is valid
            if ( !$.inArray(easing, timingFunctions) ) {
                easing = 'linear';
            }
        }
        
        // Set default properties for css fade in
        var line = 'opacity '+duration+'ms '+easing;
        $this.css({
            '-webkit-transition': line,
            '-webkit-backface-visibility': 'hidden',
            '-webkit-perspective': '1000px',
        	'-moz-transition': line,
        	'-o-transition': line,
        	'-ms-transition': line,
        	'transition': line
        });

        // Start the animation, hit callback when done
        if (type == 'in') {
            $this.css('opacity', 1);
        }
        else if (type == 'out') {
            $this.css('opacity', 0);
        }
        else if (type == 'to') {
            if (opacity != NaN) {
                $this.css('opacity', opacity);
            }
        }
        setTimeout(callback, duration);
    };
    
    // Equivalent of $().fadeIn()
    $.fn.cssFadeIn = function(duration, easing, callback) {
        common(this, 'in', duration, easing, callback);
        return this;
    };
    
    // Equivalent of $().fadeOut()
    $.fn.cssFadeOut = function(duration, easing, callback) {
        common(this, 'out', duration, easing, callback);
        return this;
    };
    
    // Equivalent of $().fadeTo()
    $.fn.cssFadeTo = function(duration, opacity, easing, callback) {
        common(this, 'to', duration, easing, callback, opacity);
        return this;
    };
    
    // Equivalent of $().fadeToggle
    $.fn.cssFadeToggle = function(duration, easing, callback) {
        if ( this.css('opacity') >= 1 ) {
            common(this, 'out', duration, easing, callback);
        }
        else if ( this.css('opacity') <= 0 ) {
            common(this, 'in', duration, easing, callback);
        }
        return this;
    };
})(jQuery);