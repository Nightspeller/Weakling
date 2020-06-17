import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {
    graveDialog,
    graveDialogWithFalseName, graveDialogWithGlorification,
    graveDialogWithTrueName, readyToTakeTheOath
} from "../data/dialogs/betweenVillageAndCaltor/graveDialog.js";

export class BetweenVillageAndCaltorScene extends GeneralLocation {
    constructor() {
        super({key: 'BetweenVillageAndCaltor'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('betweenVillageAndCaltor');

        const grave = new Npc({
            scene: this,
            mapObjectName: 'Grave',
            initDialog: graveDialog,
            interactionCallback: (param) => {
                this.player.addQuest('theSelflessSpirit');
            }
        });

        this.events.on('resume', (scene, data) => {
            if (this.player.getQuestById('theSelflessSpirit')) {
                this.triggers.find(trigger => {
                    if (trigger.name === 'Primula' &&
                        trigger.image.x > 640 && trigger.image.x < 736 &&
                        trigger.image.y > 288 && trigger.image.y < 384) {
                        this.player.updateQuest('theSelflessSpirit', 'deathMoaned')
                    }
                })
            }
        });

        this.events.on('wake', (scene) => {
            if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('falseNameLearned')) {
                grave.setDialog(graveDialogWithFalseName, (param) => {
                    if (param === 'falseNameCalled') {
                        this.player.updateQuest('theSelflessSpirit', 'falseNameCalled');
                        this.switchToScene('Battle', {enemies: [{"type": "ghost-knight"}]});
                    }
                });
            }
            if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameLearned')) {
                grave.setDialog(graveDialogWithTrueName, (param) => {
                    if (param === 'trueNameCalled') {
                        this.player.updateQuest('theSelflessSpirit', 'trueNameCalled');
                    }
                });
            }
            if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('deedsGlorified')) {
                grave.setDialog(graveDialogWithGlorification, (param) => {
                    if (param === 'deedsGlorified') {
                        //this.player.addItemToInventory('spirit-sword');
                    }
                });
            }
            if (this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('trueNameCalled') &&
                this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('deedsGlorified') &&
                this.player.getQuestById('theSelflessSpirit')?.currentStates.includes('deathMoaned')) {
                grave.setDialog(readyToTakeTheOath, (param) => {
                    if (param === 'oathTaken') {
                        this.player.addItemToInventory('spirit-sword', 1, undefined, this);
                    }
                });
            }
        });
    }

    public update() {
        super.update();
    }
}
