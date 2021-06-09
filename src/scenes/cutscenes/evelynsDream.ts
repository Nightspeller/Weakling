import GeneralLocation from '../locations/generalLocation';
import EvelynNpc from '../../triggers/npcs/greatPlains/evelynNpc';
import evelynDialog from '../../data/dialogs/greatPlains/evelynDialog';
import { DialogTree } from '../../types/my-types';

import findPath from '../../helpers/findPath';
import GeneralNpc from '../../triggers/npcs/generalNpc';

export default class EvelynsDreamCutscene extends GeneralLocation {
  private evelyn: GeneralNpc

  constructor() {
    super({ key: 'EvelynsDream' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; } }) {
    super.init(data);
  }

  public create() {
    super.create('greatPlains');

    this.evelyn = new EvelynNpc({ scene: this });

    const bgMusic = this.sound.add('evelyns-story', {
      loop: false,
      volume: 0.3,
    });

    this.moveCharacter(this.playerImage.x, this.playerImage.y, this.evelyn);

    bgMusic.play();

    this.widenCameraFormat(100, 2, 1500);

    this.playDialog('Dialog', evelynDialog, 1500);
  }

  public update() {
    super.update();
  }

  private widenCameraFormat(changeViewportHeight: number, zoomNumber: number, tweenDuration: number) {
    let camHeight = this.cameras.main.height;
    camHeight -= (changeViewportHeight * zoomNumber);
    const toHeight = camHeight;
    this.tweens.add({
      targets: this.cameras.main,
      y: changeViewportHeight,
      height: toHeight,
      zoom: zoomNumber,
      duration: tweenDuration,
      ease: 'Power2',
      completeDelay: 3000,
    });
  }

  private restoreCameraFormat(changeViewportHeight: number, zoomNumber: number, tweenDuration: number) {
    let camHeight = this.cameras.main.height;
    camHeight += (changeViewportHeight * zoomNumber);
    const toHeight = camHeight;
    this.tweens.add({
      targets: this.cameras.main,
      y: 0,
      height: toHeight,
      zoom: zoomNumber,
      duration: tweenDuration,
      ease: 'Power2',
      completeDelay: 1500,
    });
  }

  private playDialog(sceneKey: string, dialogTree: DialogTree, dialogDelay?: number) {
    const delay = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, dialogDelay);
    }).then(() => {
      console.log('Done waiting.');
      this.switchToScene(sceneKey, {
        dialogTree,
        closeCallback: () => {
          // this.resetCamera(100, 2, 1500);
          this.restoreCameraFormat(100, 2, 1500);
          setTimeout(() => {
            this.scene.stop(this.scene.key);
            this.scene.run('GreatPlains');
          }, 3000);
        },
      }, false);
    });
  }

  private moveCharacter(toPositionX: number, toPositionY: number, gameObject: any) {
    const { worldX, worldY } = { worldX: toPositionX, worldY: toPositionY };

    const npcObject = gameObject as GeneralNpc;

    const groundLayerObject = this.map.getLayer('Layer 1/Below player').tilemapLayer;
    const wallsLayerObject = this.map.getLayer('Layer 1/Collisions').tilemapLayer;

    const startVector = groundLayerObject.worldToTileXY(npcObject.image.x, npcObject.image.y);
    const targetVector = groundLayerObject.worldToTileXY(worldX, worldY);

    const generatedPath = findPath(startVector, targetVector, groundLayerObject, wallsLayerObject);
    npcObject.walkAlong(generatedPath);
  }
}
