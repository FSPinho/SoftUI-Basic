/*! softui-basic - v1.0.0 - 2017-02-27 */ 
 const landingFrame = function() {

    const _options = {
        landingFrameSelector: '.landing-frame', 
        landingFrameTemplate: templates.landingFrame, 

        titleSelector: '.title', 
        footerTextSelector: '.footer-text', 
        copyrightSelector: '.copyright', 
        privacySelector: '.privacy', 

        menuSelector: '.menu', 
        actionSelector: '.action', 
        actionsSelector: '.actions', 
        actionsDropDownSelector: '.actions-dropdown-content', 

        sidenavSelector: '.landing-sidenav', 

        foregroundSelector: '.landing-foreground', 

        variableSelector: '.variable', 
        variableDataSelector: 'variable', 

        eventSelector: '.event', 
        eventDataSelector: 'event', 
    };

    const _variables = { };

    const _events = { 
        toggleSidenav: () => {
            $(_options.sidenavSelector).toggleClass('hide-left');
            $(_options.foregroundSelector).fadeToggle();
        }
    }

    const _initialize = function(options) {
        Object.assign(_options, options);

        _initializeFrame();
        
        _initializeVariable();  
        _initializeEvent();

        $('.dropdown-button').dropdown({
            belowOrigin: true
        });
    }

    const _initializeFrame= function() {
        let $landingFrame = $(_options.landingFrameSelector);
        let $landingFrameTemplate = $(_options.landingFrameTemplate);

        _initializeLinks($landingFrameTemplate);
        _initializeActions($landingFrameTemplate);
        _initializeVariables($landingFrameTemplate);

        $landingFrameTemplate.find(_options.foregroundSelector).hide();
        $landingFrame.replaceWith($landingFrameTemplate);
    }

    const _initializeLinks = function($landingFrameTemplate) {
        let $menu = $(_options.menuSelector);
        $landingFrameTemplate.find(_options.menuSelector).html($menu.html());
    }

    const _initializeActions = function($landingFrameTemplate) {
        $(_options.actionSelector).each((i, el) => {
            $landingFrameTemplate.find(_options.actionsDropDownSelector).append(
                '<li class="action waves-effect"><a href="' + $(el).attr('href') + '">' + $(el).text() + '</a></li>'
            );
            $landingFrameTemplate.find(_options.actionsSelector).append(
                '<a class="action btn-flat waves-effect waves-light" href="' + $(el).attr('href') + '">' + $(el).text() + '</a>'
            );
        });
    }

    const _initializeVariables = function() {
        _variables.title = {
            attr: "text", 
            value: $(_options.titleSelector).text()
        };

        _variables['footer-text'] = {
            attr: "text", 
            value: $(_options.footerTextSelector).text()
        };

        _variables.copyright = {
            attr: "text", 
            value: $(_options.copyrightSelector).text()
        };

        _variables.privacy = {
            attr: "href", 
            value: $(_options.privacySelector).attr('href')
        };
    }

    const _initializeVariable = function() {
        $(_options.variableSelector).each((i, el) => {
            if($(el).data(_options.variableDataSelector)) {
                let data = _variables[$(el).data(_options.variableDataSelector)];
                
                if(data.attr == 'text')
                    $(el).text(data.value);
                else 
                    $(el).attr(data.attr, data.value);
            }
        });
    }

    const _initializeEvent = function() {
        $(_options.eventSelector).each((i, el) => {
            if($(el).data(_options.eventDataSelector)) {
                $(el).click(_events[$(el).data(_options.eventDataSelector)]);
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