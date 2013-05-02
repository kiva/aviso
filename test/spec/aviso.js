describe('aviso', function () {
    'use strict';

    beforeEach(function () {
        setFixtures('<div id="tipMsg" class="tipMsg"><div class="tipMsgClose">x</div><ul class="tipMsgContent"></ul></div>');
    });


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
});