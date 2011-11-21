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
    
    // The meat of the plugin. Used as "common" to save code.
    var common = function($this, type, duration, easing, callback) {
        var callback = callback || function() {};

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
        } else {
            $this.css('opacity', 0);
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
    $.fn.cssFadeTo = function() {
        throw 'Not implemented yet';
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