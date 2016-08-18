/**
  Pullquote
*/

// Knight Lab Namespace
KL = {};

KL.Browser = require("core/KL.Browser");
KL.DomEvent = require("dom/KL.DomEvent");
KL.Data = require("data/KL.Data");
KL.QuoteComposition = require("quote/KL.QuoteComposition");
KL.Helper = require("helpers/KL.Helper");
console.log('loaded dependencies');

KL.Pullquote = (function() {

    var QUOTE = "Insert Quote Here",
        CITE = "Insert Citation Here",
        HEADLINE = "Insert Headline Here",
        IMAGE = "assets/placeholder.jpg",

        ANCHOR = false,
        USE_IMAGE = true;

    /**
     * _getURLVars: Parses a given url string and grabs the variables passed into the url
     *
     * @param string urlString
     * @returns object urlVars
     */
    _getURLVars = function(string) {
      var urlVars = {},
          str = string.toString();

      if(string.match('&#038;') || (string.match('&amp'))) {
        var match = string.match('&#038') || string.match('&amp');
        str = string.replace(match, '&');
      }

      urlVarArray = str.split('?')[1].split('&');

      for(var i = 0; i < urlVarArray.length; i++) {
        urlKey = urlVarArray[i].split('=')[0];
        urlVal = urlVarArray[i].replace(/([^=]*)./, '')
        urlVars[urlKey] = urlVal;
      }

      return urlVars;
    }

    /**
     * createPullQuoteContent: creates content for all pullquote items; if none given, it uses defaults
     *
     * @param Object datum (from url params)
     * @returns Object data (constructed for composition)
     */
    createPullquoteContent = function(datum) {
        data = {
            quote: datum.quote || QUOTE,
            cite: datum.cite || CITE,
            image: datum.image || IMAGE,
            headline: datum.headline || HEADLINE,
            credit: "",
            download: ""
        }

        return data;
    }

    /**
     * createPullQuoteLayoutCustomizations: creates customizations for each individual pullquote item; if none given, it uses defaults
     *
     * @param Boolean anchor
     * @param Boolean use_image
     * @returns Object options
     */
    createPullquoteLayoutCustomization = function(anchor, use_image) {
        console.log('createPullquoteLayoutCustomization');
        console.log('going crazy down there at the lake');
        options = {
            editable: true,
            anchor: anchor || ANCHOR,
            use_image: use_image || USE_IMAGE,
            download_ready: false
        }
        console.log('cache testing');
        console.log(options);
        return options;
    },

    /**
     * createComposition: composes the layout for image and quote and appends it to the container element
     *
     * @param String urlData
     * @param Boolean anchor
     * @param Boolean use_image
     * @returns {undefined}
     */
    _createComposition = function(data, options) {
        console.log('_createComposition');
        for(i = 0; i < options.length; i++) {
            var layoutOptions = createPullquoteLayoutCustomization(
                options[i].anchor, options[i].use_image),
                composeData = _.assign(data, layoutOptions);

            console.log(layoutOptions);
            console.log(composeData);
            console.log('call quote composition');
            KL.QuoteComposition().createPullquoteComposition(composeData);
            console.log('quote composition created');
            console.log(composeData);
        }
    };

    /**
     * _init: creates the composition for pullquote
     *
     * @returns {undefined}
     */
    _init = function() {
        console.log('_init');
        urlVars = _getURLVars(window.location.href);

        // Create Content
        urlVars = createPullquoteContent(urlVars);

        // Create Pullquote Composition with 4 images with specific layout options
        _createComposition(urlVars, [
            { position: false, use_image: true },
            { position: "left", use_image: true },
            { position: "right", use_image: true },
            { position: false, use_image: false }
        ])
    }();

})();
