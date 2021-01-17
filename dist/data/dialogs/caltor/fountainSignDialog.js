define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fountainChangedDialog = exports.fountainVandalDialog = exports.fountainSignDialog = void 0;
    exports.fountainSignDialog = [{
            id: 'greetings',
            text: 'In memory of Caltor\'s founder, ruler, protector and the greatest hero, sir Jeremy von Caltor, from grateful friends, descendants and all the citizens.',
            replies: [{
                    text: '(End)',
                    callbackParam: 'fastEnd',
                }],
        }];
    exports.fountainVandalDialog = [{
            id: 'greetings',
            text: 'In memory of Caltor\'s founder, ruler, protector and the greatest hero, sir Jeremy von Caltor, from grateful friends, descendants and all the citizens.',
            replies: [{
                    text: '(Vandalize the fountain sign to glorify sir Jeremaya\'s deeds)',
                    checkInventory: 'remove',
                    checkValue: [{ itemId: 'coal', quantity: 1 }],
                    successTriggers: 'fountainVandalized',
                    failureTriggers: 'noCoal',
                }, {
                    text: '(End)',
                    callbackParam: 'fastEnd',
                }],
        }, {
            id: 'fountainVandalized',
            text: '(Coal used) In memory of Caltor\'s -------, -----, protector and the greatest hero, sir Jerem<a>y<ya> the Bandit, from grateful ------------------ citizens.',
            replies: [{
                    text: 'Much better',
                    callbackParam: 'fountainVandalized',
                }],
        }, {
            id: 'noCoal',
            text: '(You try to scratch the stone, but barely leave any marks. There must be better way to do it.)',
            replies: [{
                    text: '(End)',
                    callbackParam: 'fastEnd',
                }],
        }];
    exports.fountainChangedDialog = [{
            id: 'greetings',
            text: 'In memory of Caltor\'s -------, -----, protector and the greatest hero, sir Jerem<a>y<ya> the Bandit, from grateful ------------------ citizens.',
            replies: [{
                    text: '(End)',
                    callbackParam: 'fastEnd',
                }],
        }];
});
//# sourceMappingURL=fountainSignDialog.js.map