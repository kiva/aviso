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
    , bodyEl: '.avisoBody'
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

    if (! this.$el.length || ! this.$close.length || ! this.$content.length) {
        throw 'kvTipMsg Error: Missing required markup';
    }
}


Aviso.prototype = {

    /**
     *
     * @param {Object} options
     * @return {Object}
     */
    setOptions: function(options) {
        var opts
        , defaults =  Aviso.defaults;

        if (options) {
            opts = $.extend({}, defaults, options);
        }

        return opts;
    }


    /**
     * Performs the slideDown animation.  Do not call directly.
     *
     * @param {Function} fn
     */
    , slideDown: function(fn) {
        return this.$el.slideDown(function () {
            if (typeof fn == 'function') {
                fn.call(self)
            }
        });
    }


    /**
     * Performs the slideUp animation.  Do not call directly.
     *
     * @param {Function} fn
     */
    , slideUp: function(fn) {
        var self = this;

        return $el.css('opacity', 0.3).slideUp('slow', function () {
            self.$el.empty();
            if (typeof fn == 'function') {
                fn.call(self);
            }
        });
    }


    /**
     *
     * @param {String} message
     * @param {Object} options
     */
    , add: function (message, options) {
        return renderMessage(message, options);
    }


    /**
     *
     */
    , show: function (messages, options, fn) {
        var msgs
        , self = this;

        if (messages instanceof jQuery) {
            msgs = messages;
        } else if (typeof messages == 'string') {
            msgs = this.add(message, options);
        } else if ($.isArray(messages)) {
            $.each(messages, function (index, message) {
                var opts = typeof message == 'object'
                    ? $.extend({}, options, message.options)
                    : options;

                msgs = self.add(message, opts);
            });
        }

        this.$el.append(wrap(msgs));
        $('html, body').animate({scrollTop: 0});
        this.slideDown($msgs, fn);
    }


    , close: function (fn) {
        this.slideUp(fn);
    }
};


function renderMessage(message, options) {
    return '<div class="avisoMsg">' + message + '</div>';
}


function wrap($els) {
    return $('<div class="avisoBody" />').html($els);
}