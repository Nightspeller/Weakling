define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fionaDialog = [{
            id: 'greetings',
            text: '    Looking to buy some flowers? You came to the right place - these I cut just this morning. Look around!',
            replies: [{
                    text: 'Show me what you have',
                    callbackParam: 'openShop',
                }],
        }, {
            id: 'goodsSold',
            text: 'Here is 100 copper pieces - the best I can do.',
            replies: [{
                    text: 'I was hoping for more, but I guess we have to take it...',
                    callbackParam: 'goodsSold',
                }, {
                    text: 'Before we go, show me what you have',
                    callbackParam: 'goodsSoldAndOpenShop',
                }],
        }, {
            id: 'noGoods',
            text: 'And where are they? Check your bags and come back once you find it.',
            replies: [{
                    text: 'Oh, right right, where were they...',
                    callbackParam: 'fastEnd',
                }, {
                    text: 'At the meantime, show me what you have',
                    callbackParam: 'openShop',
                }],
        },
    ];
    exports.default = fionaDialog;
});
//# sourceMappingURL=fionaDialog.js.map