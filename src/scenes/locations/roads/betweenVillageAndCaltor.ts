import * as Phaser from 'phaser';
import GeneralLocation from '../generalLocation';
import GraveNpc from '../../../triggers/npcs/betweenVillageAndCaltor/graveNpc';

import { sceneEvents } from '../../../triggers/eventsCenter';

import DestinationPoint from '../../../characters/creatures/destinationPoint';
import Butterfly from '../../../characters/creatures/butterfly';

import findPath from '../../../helpers/findPath';
import RudeStranger1Npc from '../../../triggers/npcs/caltor/rudeStranger1Npc';
import RudeStranger2Npc from '../../../triggers/npcs/caltor/rudeStranger2Npc';
import { burglaryDialog } from '../../../data/dialogs/caltor/rudeStrangerDialog';
import BackgroundSoundScene from '../../backgroundSoundScene';
import Trigger from '../../../triggers/trigger';

export default class BetweenVillageAndCaltorScene extends GeneralLocation {
  private destinationPoints!: Phaser.Physics.Arcade.Group
  private butterflies!: Phaser.Physics.Arcade.Group
  private burglar1: RudeStranger1Npc;
  private burglar2: RudeStranger2Npc;

  constructor() {
    super({ key: 'BetweenVillageAndCaltor' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('betweenVillageAndCaltor');

    this.setupEvents();

    this.destinationPoints = this.physics.add.group({
      classType: DestinationPoint,
    });

    this.map.getObjectLayer('DestinationPoints')?.objects.forEach((destinationPointObj) => {
      this.destinationPoints.get(
        destinationPointObj.x, destinationPointObj.y, 'base-separated-1', 55,
      );
    });

    this.butterflies = this.physics.add.group({
      classType: Butterfly,
      createCallback: (butterflyGameObject) => {
        const butterflyColors = ['blue', 'pink', 'green', 'yellow'];
        const randomButterflyColor = Phaser.Math.Between(0, butterflyColors.length - 1);
        const butterflyGameObj = butterflyGameObject as Butterfly;

        butterflyGameObj.body.onCollide = true;

        const destinationPoints = this.destinationPoints.getChildren();

        const randomDestinationPoint = destinationPoints[Phaser.Math.Between(0, destinationPoints.length - 1)] as DestinationPoint;

        butterflyGameObj.butterflyColor = butterflyColors[randomButterflyColor];

        // move the butterfly to the randomly picket destination point
        this.moveButterfly(randomDestinationPoint.x, randomDestinationPoint.y, butterflyGameObj);
      },
    });

    this.map.getObjectLayer('Butterflies')?.objects.forEach((butterflyObject) => {
      this.butterflies.get(
        butterflyObject.x,
        butterflyObject.y, 'butterflies',
      );
    });

    new GraveNpc({ scene: this });

    this.events.on('resume', () => {
      if (this.triggers.some((trigger) => trigger.name === 'Burglary') === false && this.player.getQuestById('bigCaltorTrip').currentStates.includes('goodsSold')) {
        new Trigger({
          scene: this,
          name: 'Burglary',
          triggerX: 1760,
          triggerY: 128,
          triggerW: 32,
          triggerH: 64,
          interaction: 'collide',
          singleUse: false,
          callback: () => {
            this.performGeneralCutsceneActions('burglary');
          },
        });
      }
    });

    this.events.on('wake', () => {
      if (this.triggers.some((trigger) => trigger.name === 'Burglary') === false && this.player.getQuestById('bigCaltorTrip').currentStates.includes('goodsSold')) {
        new Trigger({
          scene: this,
          name: 'Burglary',
          triggerX: 1760,
          triggerY: 128,
          triggerW: 32,
          triggerH: 64,
          interaction: 'collide',
          singleUse: false,
          callback: () => {
            this.performGeneralCutsceneActions('burglary');
          },
        });
      }
    });
  }

  setupEvents() {
    sceneEvents.on('butterfly-reached-destination-point', (butterfly: Phaser.Physics.Arcade.Sprite) => {
      const butterflyGameObj = butterfly as Butterfly;
      const destinationPoints = this.destinationPoints.getChildren();
      const randomDestinationPoint = destinationPoints[Phaser.Math.Between(0, destinationPoints.length - 1)] as DestinationPoint;

      this.time.addEvent({
        delay: Phaser.Math.Between(1000, 4000),
        callback: () => {
          this.moveButterfly(randomDestinationPoint.x, randomDestinationPoint.y, butterflyGameObj);
        },
        loop: false,
      });
    });
  }

  moveButterfly(toPositionX: number, toPositionY: number, butterflyObject: Butterfly) {
    const butterfly = butterflyObject;

    const groundLayerObject = this.map.getLayer('Layer 1/Below player').tilemapLayer;
    const wallsLayerObject = this.map.getLayer('Layer 1/Collisions').tilemapLayer;

    const generatedPath = findPath(
      { x: butterfly.x, y: butterfly.y },
      { x: toPositionX, y: toPositionY },
      groundLayerObject,
      wallsLayerObject,
    );
    butterfly.flyAlong(generatedPath);
  }

  protected async performSpecificCutsceneActions(cutsceneId: string) {
    console.log('burglary!!!');
    const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
    backgroundSoundScene.pauseBackgroundMusic();

    let newSound: Phaser.Sound.BaseSound;
    if (this.sound.get('massacre-on-teddy-bear-hill')) {
      newSound = this.sound.get('massacre-on-teddy-bear-hill');
    } else {
      newSound = this.sound.add('massacre-on-teddy-bear-hill');
    }
    newSound.play({ loop: true, volume: 0.2 });
    // no idea why but sound refuses to be tweened if player leaves cutscene and then comes back
    /*      this.tweens.add({
        targets: newSound,
        volume: 1,
        duration: 1500,
      }); */

    if (!this.burglar1) {
      this.burglar1 = new RudeStranger1Npc({
        scene: this,
        x: 1875,
        y: 77,
        spriteParams: {
          texture: 'male9-1', frame: 2, width: 32, height: 32,
        },
      });

      this.burglar2 = new RudeStranger2Npc({
        scene: this,
        x: 1900,
        y: 150,
        spriteParams: {
          texture: 'male9-3', frame: 2, width: 32, height: 32,
        },
      });

      await Promise.all([
        this.burglar1.walkThePathToCoords(this.playerImage.x + this.playerImage.width / 4, this.playerImage.y),
        this.burglar2.walkThePathToCoords(this.playerImage.x + this.playerImage.width / 4 + 32, this.playerImage.y + 32, 'left'),
      ]);
    }

    await new Promise<void>((resolve) => {
      this.switchToScene('Dialog', {
        dialogTree: burglaryDialog,
        speakerName: 'Burglars',
        closeCallback: async (param: string) => {
          if (param === 'silverGiven') {
            await Promise.all([
              this.burglar1.walkThePathToCoords(1950, 75, 'right'),
              this.burglar2.walkThePathToCoords(1950, 150, 'right'),
            ]);
            this.burglar1.destroy();
            this.burglar2.destroy();
            this.triggers.find((trigger) => trigger.name === 'Burglary').destroy();
          }
          resolve();
        },
      }, false);
    });

    // Now, lets restore sounds:
    backgroundSoundScene.resumeBackgroundMusic();

    this.tweens.add({
      targets: newSound,
      volume: 0.0,
      duration: 1500,
      onComplete: () => {
        newSound.stop();
      },
    });
  }

  public update() {
    super.update();
  }
}
