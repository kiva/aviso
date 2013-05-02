'use strict';

/**
 * Exposed function wrapper for the Aviso constructor & aviso.show()
 *
 * @param messages
 * @param options
 * @return {Aviso}
 */
function aviso(messages, options) {
    var _aviso = new Aviso(options);

    if (typeof messages == 'string' || $.isArray(messages)) {
        _aviso.show(messages, options);
    }

    return _aviso;
}


/**
 * Expose static defaults so they can be overridden
 *
 * @type {Object}
 */
aviso.defaults = {
    validTypes: ['info', 'warning', 'error']
    , el: '#aviso'
    , closeEl: '.avisoClose'
    , contentEl: 'avisoContent'
};


/**
 *
 * @param options
 * @constructor
 */
function Aviso(options) {
    this.setOptions(options);

    this.$el = $(this.el);
    this.$close = $(aviso.closeEl, this.$el).click(this.close());
    this.$content = $(aviso.contentEl, this.$el);

    if (! this.$tipMsg.length || ! this.$tipMsgClose.length || ! this.$tipMsgContent.length) {
        throw 'kvTipMsg Error: Missing required markup';
    }
}


Aviso.prototype = {
    setOptions: function (options) {
        var opts
        , defaults =  Aviso.defaults;

        if (options) {
            opts = $.extend({}, defaults, options);
        }

        return opts;
    }


    , show: function (messages, options, fn) {
        if (typeof messages == 'string') {
            add(message, options);
        } else if ($.isArray(messages)) {
            $.each(messages, function (index, message) {
                add(message, options);
            });
        }

        $('html, body').animate({scrollTop: 0});
        slideDown(this.$el, fn);
    }


    , close: function (fn) {
        slideUp(fn);
    }
};


function slideDown($el, fn) {
    var self = this;

    return $el.slideDown(function () {
        if (typeof fn == 'function') {
            fn.call(self)
        }
    });
}


function slideUp($el, fn) {
    var self = this;

    return $el.css('opacity', 0.3).slideUp('slow', function () {
        self.remove();
        if (typeof fn == 'function') {
            fn.call(self);
        }
    });
}


function generateMessage(message, options) {

}


function add(message, options) {

}