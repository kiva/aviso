'use strict';

/**
 * Exposed function wrapper for the Aviso constructor & aviso.show()
 *
 * @param messages
 * @param options
 * @return {Aviso}
 */
function aviso(messages, options) {
    var opts = setOptions(options)
    , _aviso = new Aviso(opts);

    if (messages instanceof jQuery || typeof messages == 'string' || $.isArray(messages)) {
        _aviso.show(messages, opts);
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
    , el: '<div id="aviso"><div class="avisoClose"></div><div class="avisoBody"></div></div>'
    , closeEl: '.avisoClose'
    , bodyEl: '.avisoBody'
};


/**
 *
 * @constructor
 */
function Aviso(options) {
    this.$el = $(options.el);
    this.$close = $(options.closeEl, this.$el).click(this.close());
    this.$content = $(options.bodyEl, this.$el);

    if (! this.$el || ! this.$close || ! this.$content) {
        throw 'Aviso Error: Missing required markup';
    }
}


Aviso.prototype = {


    /**
     * Performs the slideDown animation.  Not intended to be called directly.
     *
     * @return {*}
     */
    slideDown: function() {
        return this.$el.css('opacity', 1).slideDown().promise();
    }


    /**
     * Performs the slideUp animation.  Not intended to be called directly.
     *
     * @param {Function} fn
     */
    , slideUp: function() {
        return this.$el.css('opacity', 0.3).slideUp('slow').promise();
    }


    /**
     *
     * @param {String} message
     * @param {Object} options
     */
    , add: function (message, options) {
        var opts;

        if (typeof message == 'object') {
            opts = $.extend({}, options, message.options);
            message = message.message;
        } else {
            opts = options;
        }

        return renderMessage(message, opts);
    }


    /**
     *
     * @param {Array|String|Object} messages
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
            msgs = [];

            $.each(messages, function (index, message) {
                msgs.push(self.add(message, options));
            });
        }

        $msgs = $(msgs);
        this.$content.append($msgs);
        $('html, body').animate({scrollTop: 0});
        this.slideDown();
    }


    , close: function () {
        var self = this;

        return this.slideUp()
            .done(function () {
                self.$el.remove();
            });
    }
};


/**
 *
 * @param {Object} options
 * @return {Object}
 */
function setOptions(options) {
    return $.extend({}, aviso.defaults, options);
}


/**
 *
 * @param message
 * @param options
 * @return {String}
 */
function renderMessage(message, options) {
    return '<div class="avisoMsg">' + message + '</div>';
}


/**
 *
 * @param $els
 * @return {*|jQuery}
 */
function wrap($els) {
    return $('<div class="avisoBody" />').html($els);
}