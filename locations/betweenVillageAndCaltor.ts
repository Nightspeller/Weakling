import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {graveDialog} from "../data/dialogs/betweenVillageAndCaltor/graveDialog.js";

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
    }

    public update() {
        super.update();
    }
}
