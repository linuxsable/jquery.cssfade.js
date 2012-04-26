/*
 * Copyright (c) 2012 Tyler Van Hoomissen (@_ty)
 * Licensed under the MIT license.
 *
 * Version: 0.0.2
 * Tested with: jQuery 1.7.2.
 *
 * jQuery plugin for CSS3 fade transitions.
 *
 * It's usage is practially identical to the jQuery
 * fade methods.
 *
 * Currently this plugin does not support browser
 * detection of transition support. Help me build it?
 *
 * Example Usage:
 *
 * $('.fadeable').cssFade('in', 600);
 *
 * $('.fadeable').cssFade('out', 300, 'linear', function() {
 *    boom();
 * })
 *
 * $('.fadeable').cssFade('toggle');
 *
 * $('.fadeable').cssFade('to', 500, 0.2);
 *
 */
(function($) {
    // Underscored names to avoid js keyword conflicts
    var methods = {
        // Equivalent of $.fadeIn()
        _in: function(duration, easing, callback) {
            fade(this, 'in', duration, easing, callback);
            return this;
        },

        // Equivalent of $.fadeOut()
        _out: function(duration, easing, callback) {
            fade(this, 'out', duration, easing, callback);
            return this;
        },

        // Equivalent of $.fadeTo()
        _to: function(duration, opacity, easing, callback) {
            fade(this, 'to', duration, easing, callback, opacity);
            return this;
        },

        // Equivalent of $.fadeToggle()
        _toggle: function(duration, easing, callback) {
            if ( this.css('opacity') >= 1 ) {
                fade(this, 'out', duration, easing, callback);
            }
            else if ( this.css('opacity') <= 0 ) {
                fade(this, 'in', duration, easing, callback);
            }
            return this;
        }
    };

    var timingFunctions = [
        'default',
        'linear',
        'ease',
        'ease-in',
        'ease-out',
        'ease-in-out',
        'cubic-bezier'
    ];

    var defaultTiming = 'ease';
    
    // The meat of the plugin.
    function fade($this, type, duration, easing, callback, opacity) {
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
            easing = defaultTiming;
        } else {
            // Check if the easing type is valid
            if ( !$.inArray(easing, timingFunctions) ) {
                easing = defaultTiming;
            }
        }
        
        // Set default properties for css fade in
        var line = 'opacity '+duration+'ms '+easing;
        $this.css({
            '-webkit-transition': line,
            '-webkit-backface-visibility': 'hidden',
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
        
        setTimeout(function() {
            callback($this);
        }, duration);
    }

    $.fn.cssFade = function(method) {
        var _method = '_' + method;
        if (methods[_method]) {
            return methods[_method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (!method) {
                $.error('Must pass a valid fade method: (in, out, to, toggle).');
            } else {
                $.error('Invalid fade method. Options: (in, out, to, toggle).');
            }
        }
    };
})(jQuery);