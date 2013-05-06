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

    // We assume its an options object if there is no "message" property
    if (typeof messages == 'object' && !(messages instanceof jQuery || $.isArray(messages) || messages.message)) {
        options = messages;
    } else if (typeof options == 'string') {
        options = {type: options};
    }

    opts = setOptions(options);
    _aviso = new Aviso(opts);

    if (messages) {
        _aviso.show(messages, opts);
    }

    return _aviso;
}


/**
 * Stores a reference to existing aviso messages.
 *
 * @type {Object}
 * @private
 */
aviso._messages = {};


/**
 * Expose static defaults so they can be overridden
 *
 * @type {Object}
 */
aviso.defaults = {
    validTypes: ['info', 'warning', 'error']
    , el: '<div class="avisoWrapper"><div class="avisoContainer"><div class="avisoClose">x</div><div class="avisoContent"></div></div></div>'
    , elClass: '.avisoWrapper'
    , closeClass: '.avisoClose'
    , contentClass: '.avisoContent'
    , containerClass: '.avisoContainer'
};


/**
 *
 * @constructor
 */
function Aviso(options) {

    this.$el = $(options.el);
    this.$close = $(options.closeClass, this.$el).on('click.aviso', $.proxy(handleCloseClick, this));
    this.$content = $(options.contentClass, this.$el);

    if (! this.$el || ! this.$close || ! this.$content) {
        throw 'Aviso Error: Missing required markup';
    }

    $('body').append(this.$el);
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
     * @returns {Promise}
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
     * Called by .show()
     *
     * @param {Array|String|Object} messages
     * @param {Object} options
     */
    , _show: function (messages, options) {
        var $msgs
        , self = this;

        if (messages instanceof jQuery) {
            $msgs = messages;
        } else if ($.isArray(messages)) {
            $msgs = $('<div />');

            $.each(messages, function (index, message) {
                $msgs.append(self.add(message, options));
            });

            $msgs = $msgs.html();
        } else if (typeof messages == 'string' || typeof messages == 'object') {
            $msgs = $(this.add(messages, options));
        }


        this.$content.append($msgs);
        aviso._messages.one = this;
        $('html, body').animate({scrollTop: 0});
        this.slideDown();
    }


    /**
     *
     * @param {Array|String|Object} messages
     * @param {Object} options
     */
    , show: function (messages, options) {
        var self = this

        // @todo, eventually we will likely need to add "channels" so that multiple messages can be displayed at a time in various places.
        // For now, there is just "default".
        , prevMessage = aviso._messages.one;

        if (prevMessage) {
            prevMessage.close().done(function () {
                self._show(messages, options);
            });
        } else {
            this._show(messages, options);
        }
    }


    /**
     * Takes care of closing the message as well as removing it from the DOM
     *
     * @returns {Promise}
     */
    , close: function () {
        var self = this;

        return this.slideUp()
            .done(function () {
                self.$el.remove();
                aviso._messages.one = null;
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