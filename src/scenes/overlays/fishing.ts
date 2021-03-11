import { Player, playerInstance } from '../../characters/adventurers/player';
import GeneralOverlayScene from './generalOverlayScene';
import { DialogOptions } from '../../types/my-types';
import { GAME_H, GAME_W, TILE_SIZE } from '../../config/constants';

export default class FishingScene extends GeneralOverlayScene {
  private player: Player;
  public opts: DialogOptions;
  private fishes: any;
  private objectName: string;

  constructor() {
    super({ key: 'Fishing' });
  }

  public init({
    fishes,
    objectName,
    prevScene,
  }: { prevScene: string, fishes: any, objectName: string }) {
    this.opts = {
      borderThickness: 3,
      borderColor: 0x907748,
      borderAlpha: 1,

      backgroundColor: 0x303030,
      backgroundAlpha: 1,

      windowWidth: GAME_W - TILE_SIZE * 10,
      windowHeight: GAME_H - TILE_SIZE * 10,
      windowX: TILE_SIZE * 5,
      windowY: TILE_SIZE * 5,

      responseTextColor: '#47340c',
      responseTextHoverColor: 'black',

      // closeButtonColor: 'darkgoldenrod',
      // closeButtonHoverColor: 'red',

      textColor: 'black',
      letterAppearanceDelay: 10,
    };
    this.fishes = fishes;
    this.objectName = objectName;
    this.player = playerInstance;
    this.parentSceneKey = prevScene;
  }

  public preload() {

  }

  public create() {
    super.create(this.parentSceneKey, this.opts);
    const tempCatchButton = this.add.text(GAME_W / 2, GAME_H / 2, 'Catch!')
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.player.addItemToInventory('carp', 1);
        this.closeScene({ fishingObjectName: this.objectName });
      });
  }
}
