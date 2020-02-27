import {GeneralLocation} from "./generalLocation.js";
import Npc from "../entities/npc.js";
import {hermitDialog, hermitLastDialog} from "../data/dialogs/hermitsTower/hermitDialog.js";

export class HermitsTowerScene extends GeneralLocation {
    constructor() {
        super({key: 'HermitsTower'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('hermitsTower', 240);
        const hermit = new Npc({
            scene: this,
            mapObjectName: 'Hermit',
            texture: 'stranger',
            frame: 1,
            initDialog: hermitDialog,
            items: [
                {itemId: 'copper-pieces', quantity: 10},
                {itemId: 'dagger-weapon', quantity: 1},
                {itemId: 'leather-armor', quantity: 1},
                {itemId: 'leather-pants', quantity: 1},
                {itemId: 'leather-boots', quantity: 1},
            ],
            interactionCallback: param => {
                if (param === 'openShop') {
                    this.switchToScene('Shop', {
                        player: this.player,
                        trader: hermit
                    }, false)
                }
            }
        });
    }

    public update() {
        super.update();
    }
}