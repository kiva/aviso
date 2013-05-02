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
    , el: $('<div id="aviso"><div class="avisoClose"></div><div class="avisoBody"></div></div>')
    , closeEl: '.avisoClose'
    , bodyEl: '.avisoBody'
};


/**
 *
 * @constructor
 */
function Aviso(options) {
    var opts = this.setOptions(options);

    this.$el = $(opts.el);
    this.$close = $(opts.closeEl, this.$el).click(this.close());
    this.$content = $(opts.bodyEl, this.$el);

//    if (! this.$el.length || ! this.$close.length || ! this.$content.length) {
//        throw 'Aviso Error: Missing required markup';
//    }
}


Aviso.prototype = {

    /**
     *
     * @param {Object} options
     * @return {Object}
     */
    setOptions: function(options) {
        return $.extend({}, aviso.defaults, options);
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

        return this.$el.css('opacity', 0.3).slideUp('slow', function () {
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
     * @param {String} messages
     * @param {Object} options
     * @param {Function} fn
     */
    , show: function (messages, options, fn) {
        var $msgs, msgs
        , self = this;

        if (messages instanceof jQuery) {
            msgs = messages;
        } else if (typeof messages == 'string') {
            msgs = this.add(messages, options);
        } else if ($.isArray(messages)) {
            $.each(messages, function (index, message) {
                var opts = typeof message == 'object'
                    ? $.extend({}, options, message.options)
                    : options;

                msgs = self.add(message, opts);
            });
        }

        $msgs = wrap(msgs);
        this.$el.append($msgs);
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