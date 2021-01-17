define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nahkhaAfterGoodsObtainedDialog = exports.nahkhaAfterTheElderDialog = exports.nahkhaBeforeTheElderDialog = void 0;
    exports.nahkhaBeforeTheElderDialog = [{
            id: 'greetings',
            text: 'Hello dear, you must be here for the baskets? I know, this is the shipping day, but I am not ready yet - let me just finish this one and they are all yours. Go play with your rocks for now, okay.',
            replies: [{
                    text: 'Sure, no problem, but did you know that blackolite is not really a rock?..',
                    callbackParam: 'fastEnd',
                }],
        }];
    exports.nahkhaAfterTheElderDialog = [{
            id: 'greetings',
            text: 'Baskets? Just finished the last one! Here, take it and get the best price you can for it - just look how accurate and sturdy they are!',
            replies: [{
                    text: 'Thank you, I will do my best!',
                    callbackParam: 'basketsObtained',
                }],
        }];
    exports.nahkhaAfterGoodsObtainedDialog = [{
            id: 'greetings',
            text: 'I already gave you everything I made, so what are you waiting for? Go pick up the old Guarthh and head to the Caltor - it will be not safe to travel after sunset..',
            replies: [{
                    text: 'Thank you, I will be on my way then.',
                    callbackParam: 'fastEnd',
                }],
        }];
});
//# sourceMappingURL=nahkhaDialog.js.map