 
 const landingFrame = function() {

    const _options = {
        linkSelector: '.link', 
        linkHrefSelector: '.link-href',
        linkTextSelector: '.link-text',
        linkIconSelector: '.link-icon',   
        links: [], 
    };

    const _initialize = function(options) {
        Object.assign(_options, options);

        _initializeLinks();
    }

    const _initializeLinks = function() {
        const links = $(_options.linkSelector);
        links.each((i, el) => {
            _options.links.map((link) => {
                const $link = $(el).clone();
                $link.find(_options.linkHrefSelector).text(link.text);
                $link.find(_options.linkTextSelector).attr('href', link.text);
                $link.find(_options.linkIconSelector).text(link.icon);
                $(el).parent().append($link);
                console.log($link);
            });
            $(el).remove();
        });
    }

    return {
        initialize: _initialize
    };

}();