import {Scene} from "phaser";

export function preloadBattleAssets(preloadScene: Scene) {

    // Battle characters images
    preloadScene.load.image('weakling', 'assets/images/characters/battle/party/weakling.png');
    preloadScene.load.image('elder', 'assets/images/characters/battle/party/elder.png');
    preloadScene.load.image('boar-avatar', 'assets/images/characters/battle/enemies/boar.png');
    preloadScene.load.image("dead-character", "assets/images/characters/battle/dead-character.png");

    preloadScene.load.image('cave-background', 'assets/images/interface/cave-background.png');
    preloadScene.load.image('field-background', 'assets/images/interface/field-background.png');
    preloadScene.load.spritesheet("action-points", "assets/images/interface/action-points.png", {
        frameWidth: 16,
        frameHeight: 16
    });

    //Icons with background for battle status effects
    this.load.spritesheet("icons", 'assets/images/interface/icons-with-background.png', {
        frameWidth: 32,
        frameHeight: 32
    });
}
