define(["require", "exports", "../generalLocation", "../../../triggers/trigger", "../../../triggers/npcs/caltor/strangerNpc", "../../../triggers/npcs/caltor/bodgerNpc", "../../../triggers/npcs/caltor/baelinNpc", "../../../triggers/npcs/caltor/announcementsDeskNpc", "../../../triggers/npcs/caltor/kasimaNpc", "../../../triggers/npcs/caltor/fountainNpc", "../../../triggers/npcs/caltor/fionaNpc"], function (require, exports, generalLocation_1, trigger_1, strangerNpc_1, bodgerNpc_1, baelinNpc_1, announcementsDeskNpc_1, kasimaNpc_1, fountainNpc_1, fionaNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CaltorScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'Caltor' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('caltor');
            let layer4visible = true;
            const barracksMapObject = this.getMapObject('Barracks');
            new trigger_1.default({
                scene: this,
                name: barracksMapObject.name,
                triggerX: barracksMapObject.x,
                triggerY: barracksMapObject.y,
                triggerW: barracksMapObject.width,
                triggerH: barracksMapObject.height,
                interaction: 'overlap',
                callback: () => {
                    if (layer4visible) {
                        this.layers.find((layer) => layer.layer.name === 'Barracks Roof').setVisible(false);
                        layer4visible = false;
                    }
                },
            });
            new strangerNpc_1.default({ scene: this });
            new bodgerNpc_1.default({ scene: this });
            new baelinNpc_1.default({ scene: this });
            new announcementsDeskNpc_1.default({ scene: this });
            new kasimaNpc_1.default({ scene: this });
            new fionaNpc_1.default({ scene: this });
            new fountainNpc_1.default({ scene: this });
            this.events.on('resume', ( /* scene, data */) => {
                if (this.player.defeatedEnemies.includes('caltor/Boars 1') && this.player.defeatedEnemies.includes('caltor/Boars 2')) {
                    this.player.updateQuest('boarsAtTheFields', 'boarsKilled');
                }
            });
        }
        update() {
            super.update();
        }
    }
    exports.default = CaltorScene;
});
//# sourceMappingURL=caltor.js.map