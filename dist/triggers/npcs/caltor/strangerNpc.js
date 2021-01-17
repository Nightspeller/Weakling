define(["require", "exports", "../generalNpc", "../../../data/dialogs/caltor/strangerDialog"], function (require, exports, generalNpc_1, strangerDialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StrangerNpc extends generalNpc_1.default {
        constructor({ scene, x, y, spriteParams, }) {
            super({
                scene,
                name: 'Stranger',
                triggerX: x,
                triggerY: y,
                spriteParams,
                initDialog: strangerDialog_1.default,
                interactionCallback: (param) => {
                    if (param === 'daggerObtained') {
                        scene.player.addItemToInventory('dagger-weapon', 1, undefined, scene);
                    }
                },
            });
        }
    }
    exports.default = StrangerNpc;
});
//# sourceMappingURL=strangerNpc.js.map