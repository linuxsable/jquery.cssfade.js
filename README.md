### Overview

jQuery plugin for CSS3 fade transitions.

It's usage is practially identical to the jQuery
fade methods.

Currently this plugin does not support browser
detection to see if transitions are available.
Help me build it?


### Example Usage

    $('.fadeable').cssFade('in', 600);

    $('.fadeable').cssFade('out', 300, 'linear', function() {
        boom();
    })

    $('.fadeable').cssFade('toggle');

    $('.fadeable').cssFade('to', 500, 0.2);
    
### Version

v0.0.3

Tested with: jQuery 1.7.2.


### Copyright

Copyright (c) 2012 Tyler Van Hoomissen (@_ty).

Licensed under the MIT license.
