'use strict';

/**
 * Exposed function wrapper for the Aviso constructor & aviso.show()
 *
 * @param messages
 * @param options
 * @return {Aviso}
 */
function aviso(messages, options) {
    var opts, _aviso;

    if (typeof options == 'string') {
        options = {type: options};
    } else if (typeof messages == 'object' && !($.isArray(messages) || messages.message)) {
        options = messages;
    }

    opts = setOptions(options);
    _aviso = new Aviso(opts);
    if (messages) {
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
    , el: '<div class="avisoWrapper"><div class="avisoContainer"><div class="avisoClose">x</div><div class="avisoContent"></div></div></div>'
    , closeEl: '.avisoClose'
    , contentEl: '.avisoContent'
    , containerEl: '.avisoContainer'
};


/**
 *
 * @constructor
 */
function Aviso(options) {
    this.$el = $(options.el);
    this.$close = $(options.closeEl, this.$el).click($.proxy(handleCloseClick, this));
    this.$content = $(options.contentEl, this.$el);

    if (! this.$el || ! this.$close || ! this.$content) {
        throw 'Aviso Error: Missing required markup';
    }

    $('body').prepend(this.$el);
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
     */
    , show: function (messages, options) {
        var $msgs
        , self = this;

        if (messages instanceof jQuery) {
            $msgs = messages;
        } else if (typeof messages == 'string' || typeof messages == 'object') {
            $msgs = $(this.add(messages, options));
        } else if ($.isArray(messages)) {
            $msgs = $('<div />');

            $.each(messages, function (index, message) {
                $msgs.append(self.add(message, options));
            });

            $msgs = $msgs.html();
        }

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
 * @context {Aviso}
 * @param {jQuery.Event} event
 */
function handleCloseClick(event) {
    event.preventDefault();
    this.close();
}