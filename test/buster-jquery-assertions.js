(function() {

    "use strict";

    function msg(message) {
        if (!message) { return ""; }
        return message + (/[.:!?]$/.test(message) ? " " : ": ");
    }

    function actualAndExpectedMessageValues(actual, expected, message) {
        return [actual, expected, msg(message)]
    }

    function hasProperty(actualValue, expectedValue) {
        if (expectedValue === undefined) {
            return actualValue !== undefined;
        }
        return actualValue == expectedValue;
    };

    buster.assertions.add("containsElement", {
        assert: function ($tree, selector) {
            return $tree.find(selector).length > 0;
        },
        assertMessage: "${2}Expected [${0}] to contain html element ${1}",
        refuteMessage: "${2}Expected [${0}] not to html element contain ${1}",
        expectation: "toContainElement",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("haveHtml", {
        assert: function ($el, html) {
            this.html = $el.html();
            return this.html.indexOf(html) !== -1;
        },
        assertMessage: '${2}Expected [${html}] to have html ${1}',
        refuteMessage: "${2}Expected [${html}] not to have html ${1}",
        expectation: "toHaveHtml",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("haveText", {
        assert: function ($el, text) {
            this.text = $el.text();
            return $el.text().indexOf(text) !== -1;
        },
        assertMessage: "${2}Expected [${text}] to have text ${1}",
        refuteMessage: "${2}Expected [${text}] not to have text ${1}",
        expectation: "toHaveText",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("isEmpty", {
        assert: function ($el) {
            return $el.is(':empty');
        },
        assertMessage: "${2}Expected [${0}] to be empty",
        refuteMessage: "${2}Expected [${0}] not to be empty",
        expectation: "toBeEmpty",
        values: actualAndExpectedMessageValues
    });


    buster.assertions.add("isInDom", {
        assert: function ($el) {
            return $.contains(document.documentElement, $el[0]);
        },
        assertMessage: "${2}Expected [${0}] to be in the DOM",
        refuteMessage: "${2}Expected [${0}] not to be in the DOM",
        expectation: "toBeInDom",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("exist", {
        assert: function ($el) {
            return $el.size() > 0;
        },
        assertMessage: "${2}Expected [${0}] to exist",
        refuteMessage: "${2}Expected [${0}] not to exist",
        expectation: "toExist",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("haveClass", {
        assert: function ($el, className) {
            return $el.hasClass(className);
        },
        assertMessage: "${2}Expected [${0}] to have class ${1}",
        refuteMessage: "${2}Expected [${0}] not to have class ${1}",
        expectation: "toHaveClass",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("haveValue", {
        assert: function ($el, value) {
            return $el.val() == value;
        },
        assertMessage: "${2}Expected [${0}] to have value ${1}",
        refuteMessage: "${2}Expected [${0}] not to have value ${1}",
        expectation: "toHaveValue",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("haveAttr", {
        assert: function ($el, attributeName, expectedAttributeValue) {
            return hasProperty($el.attr(attributeName), expectedAttributeValue);
        },
        assertMessage: "${2}Expected [${0}] to have attribute ${1} and ${2} value",
        refuteMessage: "${2}Expected [${0}] not to have attribute ${1} and ${2} value",
        expectation: "toHaveAttr",
        values: actualAndExpectedMessageValues
    });

    buster.assertions.add("hidden", {
        assert: function ($el) {
            return $el.is(':hidden');
        },
        assertMessage: "${2}Expected [${0}] to be hidden",
        refuteMessage: "${2}Expected [${0}] not to be hidden",
        expectation: "toBeHidden",
        values: actualAndExpectedMessageValues
    });

})();