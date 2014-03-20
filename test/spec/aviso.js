buster.spec.expose();


describe('aviso', function () {
    'use strict';

	var expect = buster.expect;

    after(function () {
        var prevMessage = aviso._messages['default'];

        // Clean out any existing messages from previous tests
        if (prevMessage) {
            prevMessage.$el.remove();
            delete aviso._messages['default'];
        }
    });


    it('exposes the aviso() function', function () {
        expect(aviso).toBeFunction();
    });


    it('initializes and returns an instance of an Aviso message', function () {
        expect(aviso() instanceof Aviso).toBeTrue();
    });


    it('calls .show() on the Aviso instance if passed a string or array message', function () {
        this.spy(Aviso.prototype, 'show');

        aviso('My message');
        expect(Aviso.prototype.show).toHaveBeenCalled();
    });


    it('calls .show() with merged defaults & options', function () {
        this.spy(Aviso.prototype, 'show');

        var newOptions = {xtra: true, validTypes: ['typeA', 'typeB']};
        var expectedOptions = $.extend({}, aviso.defaults, newOptions);

        aviso('My message', newOptions);
        expect(Aviso.prototype.show).toHaveBeenCalledWith('My message', expectedOptions);
    });


    describe('.show()', function () {
        it('accepts a string as the "message"', function () {
            var am = aviso('Some message string');
            expect(am.$el).toHaveHtml('Some message string');
        });


        it('accepts an array of "message" strings', function () {
            var message1 = 'This is message 1'
            , message2 = 'This is message 2';

            var am = aviso([message1, message2]);
            expect(am.$el).toHaveHtml('This is message 1');
            expect(am.$el).toHaveHtml('This is message 2');
        });


        it('accepts an array of "message" objects', function () {
            var message1 = {
                message: 'This is message 1'
            }
            , message2 = {
                    message: 'This is message 2'
            };

            var am = aviso([message1, message2]);
            expect(am.$el).toHaveHtml('This is message 1');
            expect(am.$el).toHaveHtml('This is message 2');
        });


        it('accepts a jQuery element as the "message"', function () {
            var $messageEl = $('<div class="myCustomMessage">This is my custom message</div>');

            var am = aviso($messageEl);
            expect(am.$el).toHaveHtml('This is my custom message');
        });


        it('closes any existing tip messages before showing a new one', function () {
            this.spy(Aviso.prototype, 'close');

            aviso('Some previous message');
            aviso('My new message');

            expect(Aviso.prototype.close).toHaveBeenCalledOnce();
        });

    });


    describe('.close()', function () {
        before(function() {
            this.timeout = 2000;
        });

        it('closes the aviso message and removes its contents from the dom', function (){
            this.spy($.prototype, 'remove');

            var am = aviso('My message')
            , closedPromise = am.close();

            expect(closedPromise).toBePromise();

            // @todo this won't get called until the issue with returning promises is resolved with Busterjs.
            closedPromise.done(function () {
                expect($.prototype.remove).toHaveBeenCalledOnce();
                expect(true).toBeTrue();
            });

//            @todo, for whatever reason, returning a promise is resulting in "undefined" hoping its a bug in Buster...
//            return closedPromise;
        });


        it('animates the aviso message', function () {
            this.spy(Aviso.prototype, 'slideUp');

            var am = aviso('My message');

            am.close();
            expect(Aviso.prototype.slideUp).toHaveBeenCalled();
        });
    });


    describe('.add()', function () {

    });


    describe('.slideUp()', function () {
        it('animates the aviso message up (hides it)', function () {
            this.spy($.fn, 'slideUp');

            var am = aviso('My message');

            am.slideUp();
            expect(am.$el.css('opacity')).toBeLessThan(1);
        });
    });


    describe('.slideDown()', function () {
        it('animates the aviso message down (shows it)', function () {
            this.spy($.fn, 'slideDown');

            var am = aviso('My message')
            , clock = sinon.useFakeTimers();

            am.slideDown();
            clock.tick(500);

            expect($.fn.slideDown).toHaveBeenCalled();
            expect(am.$el.css('opacity')).toEqual('1');
            clock.restore();
        });
    });


/*


    describe('.config', function () {
        it('sets and gets config options', function () {
            var newOptions = {test: 'testing'}
                , options;

            options = kv.tipMsg.config();
            expect(options.test).not.toBeDefined();

            options = kv.tipMsg.config(newOptions);
            expect(options.test).toBe('testing');
        });
    });


    it('throws an exception if the required markup is not loaded', function () {

        // Overwrite the fixture.
        setFixtures('<div></div>');

        expect(function () {
            kv.tipMsg('dummy');
        }).toThrow();
    });


    it('can set a single tip message with default settings', function () {
        var $tipMsg
            , msgText = 'My one tip message';

        $tipMsg = kv.tipMsg(msgText);

        expect($tipMsg.hasClass('info')).toBe(true);
        expect($('.tipMsgContent')).toHaveText(msgText);
    });


    it('can set multiple tip messages at once with default settings', function () {
        var $tipMsg, $tipMsgContentLi
            , msgText = [
                'My first tip message'
                , 'My second tip message'
                , 'My third tip message'
            ];

        kv.tipMsg.init();
        $tipMsg = kv.tipMsg(msgText);
        $tipMsgContentLi  = $('.tipMsgContent li');

        expect($tipMsg.hasClass('info')).toBe(true);
        expect($tipMsgContentLi.length).toBe(3);

        $.each(msgText, function (index, val) {
            expect($tipMsgContentLi[index]).toHaveText(val);
        });

        // Non-string values get ignored
        msgText.push(2);
        msgText.push({});
        msgText.push(['this', 'gets', 'ignored', 'as', 'well']);

        kv.tipMsg(msgText, 'error');
        $tipMsgContentLi  = $('.tipMsgContent li');

        expect($tipMsgContentLi.length).toBe(3);
    });


    it('offers a shortcut option that sets multiple tip messages and custom message type', function () {
        var $tipMsg
            , msgText = [
                'My first tip message'
                , 'My second tip message'
                , 'My third tip message'
            ];

        spyOn($.fn, 'append');
        $tipMsg = kv.tipMsg(msgText, 'error');

        expect($tipMsg.hasClass('error')).toBe(true);
    });


    it('can display an image in the tip message', function () {
        var msgText = 'My one tip message';

        kv.tipMsg.init();
        kv.tipMsg(msgText, undefined, '/someImg.png');

        expect($('.tipMsgContent')).toContainHtml('<img src="/someImg.png" >');
    });


    it('displays a default image for "info", "warning", and "error" messages', function () {
        var msgText = 'My one tip message';

        kv.tipMsg.init();

        kv.tipMsg(msgText, undefined);
        expect($('.tipMsgContent li').first()).toHaveClass('tipMsgInfo');

        kv.tipMsg(msgText, 'warning');
        expect($('.tipMsgContent li').first()).toHaveClass('tipMsgWarning');

        kv.tipMsg(msgText, 'error');
        expect($('.tipMsgContent li').first()).toHaveClass('tipMsgError');
    });


    it('can display a button with text and a link', function () {
        var msgText = 'My one tip message';

        kv.tipMsg.init();
        kv.tipMsg(msgText, undefined, undefined, 'button text', '/buttonUrl');

        expect($('.tipMsgContent')).toContainHtml('<a href="/buttonUrl" class="tipMsgButton button big actNow">button text</a>');
    });


    it('throws an exception if you pass try adding a button or image to multiple tip messages at once', function () {
        var msgText = [
            'My first tip message'
            , 'My second tip message'
            , 'My third tip message'
        ];

        spyOn($.fn, 'append');

        expect(function () {
            kv.tipMsg(msgText, undefined, '/someImage');
        }).toThrow();


        $.fn.append.reset();
        kv.tipMsg.close();

        expect(function () {
            kv.tipMsg(msgText, undefined, undefined, 'buttonText', 'buttonUrl');
        }).toThrow();
    });


    it('slides the body element up and down', function () {
        spyOn($.fn, 'animate');
        spyOn($.fn, 'slideDown');

        kv.tipMsg('my message');

        // @todo this is pretty weak, get more specific about what element it was called on
        expect($.fn.animate).toHaveBeenCalled();
        expect($.fn.slideDown).toHaveBeenCalled();
    });

    */
});