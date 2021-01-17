define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.whiskersSecondDialog = exports.whiskersDialog = void 0;
    exports.whiskersDialog = [{
            id: 'greetings',
            text: 'Meow',
            replies: [{
                    text: 'Meow to you to, snow-white bandit!',
                    callbackParam: 'fastEnd',
                }],
        }];
    exports.whiskersSecondDialog = [{
            id: 'greetings',
            text: 'Meow! Meow Meow!',
            replies: [{
                    text: 'No! I am not giving you any of my strength potions, never again!',
                    callbackParam: 'fastEnd',
                }],
        }];
});
//# sourceMappingURL=whiskersDialog.js.map