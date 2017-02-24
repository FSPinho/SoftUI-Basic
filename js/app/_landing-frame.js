 
 const landingFrame = function() {

    const _options = {
        landingFrameSelector: '.landing-frame', 
        landingFrameTemplate: templates.landingFrame, 

        menuSelector: '.menu'
    };

    const _initialize = function(options) {
        Object.assign(_options, options);

        _initializeFrame();  
    }

    const _initializeFrame= function() {
        let $landingFrame = $(_options.landingFrameSelector);
        let $landingFrameTemplate = $(_options.landingFrameTemplate);

        _initializeLinks($landingFrameTemplate);

        $landingFrame.replaceWith($landingFrameTemplate);
    }

    const _initializeLinks = function($landingFrameTemplate) {
        let $menu = $(_options.menuSelector);
        let $links = $menu.find('a');
        $landingFrameTemplate.find(_options.menuSelector).replaceWith($menu);
    }

    return {
        initialize: _initialize
    };

}();