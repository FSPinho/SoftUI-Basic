/*! softui-basic - v1.0.0 - 2017-02-24 */ 
 const landingFrame = function() {

    const _options = {
        landingFrameSelector: '.landing-frame', 
        landingFrameTemplate: templates.landingFrame, 

        menuSelector: '.menu', 

        sidenavSelector: '.landing-sidenav', 

        foregroundSelector: '.landing-foreground'
    };

    const _click = {
        toggleSidenav: () => {
            $(_options.sidenavSelector).toggleClass('hide-left');
            $(_options.foregroundSelector).toggle();
        }
    }

    const _initialize = function(options) {
        Object.assign(_options, options);

        _initializeFrame();  
        _initializeClick();
    }

    const _initializeFrame= function() {
        let $landingFrame = $(_options.landingFrameSelector);
        let $landingFrameTemplate = $(_options.landingFrameTemplate);

        _initializeLinks($landingFrameTemplate);

        $landingFrameTemplate.find(_options.foregroundSelector).hide();
        $landingFrame.replaceWith($landingFrameTemplate);
    }

    const _initializeLinks = function($landingFrameTemplate) {
        let $menu = $(_options.menuSelector);
        let $links = $menu.find('a');
        $landingFrameTemplate.find(_options.menuSelector).replaceWith($menu);
    }

    const _initializeClick = function() {
        $('.click').each((i, el) => {
            if($(el).data('click')) {
                $(el).click(_click[$(el).data('click')]);
            }
        });
    }

    return {
        initialize: _initialize
    };

}();;$(() => {

    landingFrame.initialize({
        links: [
            { text: 'HOME', href: '#', icon: 'home' }
        ]
    });

})