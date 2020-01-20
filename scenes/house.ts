import {Location} from "../entities/location.js";

export class HouseScene extends Location {
    constructor() {
        super({key: 'House'});
    }

    public preload() {
        this.preparePlugins();
    }

    public init() {
    }

    public create() {
        this.prepareMap('house');

        const caltorObject = this.map.findObject("Objects", obj => obj.name === "Caltor");
        const caltorPortal = this.physics.add
            .image(caltorObject['x'], caltorObject['y'], null)
            .setOrigin(0, 0)
            .setDisplaySize(caltorObject['width'], caltorObject['height'])
            .setVisible(false)
            .setImmovable();
        this.physics.add.collider(this.playerImage, caltorPortal, () => this.switchToScene("Caltor"));
    }

    public update() {
        this.updatePlayer();
    }
}