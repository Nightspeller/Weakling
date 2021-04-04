import * as Phaser from 'phaser';

import { Player, playerInstance } from '../../characters/adventurers/player';
import GeneralOverlayScene from './generalOverlayScene';
import { DialogOptions } from '../../types/my-types';
import { GAME_H, GAME_W, TILE_SIZE } from '../../config/constants';
import Item from '../../entities/item';

export default class FishingScene extends GeneralOverlayScene {
  private player: Player;
  public opts: DialogOptions;
  private currentFishName: string;
  private objectName: string;
  private fish: Phaser.GameObjects.Container;
  private baited: boolean;
  private baitAttractiveness: number;
  private interfaceText: Phaser.GameObjects.Text;
  private interfaceGraphics: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'Fishing' });
  }

  public init({
    currentFishName,
    objectName,
    prevScene,
  }: { prevScene: string, currentFishName: string, objectName: string }) {
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
    this.currentFishName = currentFishName;
    this.objectName = objectName;
    this.player = playerInstance;
    this.parentSceneKey = prevScene;
  }

  public preload() {

  }

  public create() {
    super.create(this.parentSceneKey, this.opts);

    const availableFishingRods: Item[] = [];
    const availableFishingBaits: Item[] = [];
    this.player.getAllItems().forEach((item) => {
      if (item.specifics.fishingRodCatchRange) {
        availableFishingRods.push(item);
      }
      if (item.specifics.fishingBait) {
        availableFishingBaits.push(item);
      }
    });

    let selectedFishingRod = availableFishingRods[0];
    availableFishingRods.forEach((fishingRod, index) => {
      this.add.sprite(this.opts.windowX + 32 + 32 * index, this.opts.windowY + this.opts.windowHeight - 48,
        fishingRod.sprite.texture, fishingRod.sprite.frame)
        .setInteractive()
        .on('pointerdown', () => {
          selectedFishingRod = fishingRod;
          this.drawInterface(selectedFishingRod, selectedFishingBait, this.baitAttractiveness, currentFish);
        });
    });

    let selectedFishingBait = availableFishingBaits[0];
    availableFishingBaits.forEach((fishingBait, index) => {
      this.add.sprite(this.opts.windowX + this.opts.windowWidth - 32 - 32 * index, this.opts.windowY + this.opts.windowHeight - 48,
        fishingBait.sprite.texture, fishingBait.sprite.frame)
        .setInteractive()
        .on('pointerdown', () => {
          selectedFishingBait = fishingBait;
          this.baitAttractiveness = selectedFishingBait ? 0.25 : 0;
          if (currentFish.specifics.baitPreferences?.loves.includes(selectedFishingBait?.itemId)) this.baitAttractiveness = 1;
          if (currentFish.specifics.baitPreferences?.likes.includes(selectedFishingBait?.itemId)) this.baitAttractiveness = 0.75;
          if (currentFish.specifics.baitPreferences?.hates.includes(selectedFishingBait?.itemId)) this.baitAttractiveness = 0;
          this.drawInterface(selectedFishingRod, selectedFishingBait, this.baitAttractiveness, currentFish);
        });
    });

    const currentFish = new Item(this.currentFishName);

    this.baitAttractiveness = selectedFishingBait ? 0.25 : 0;
    if (currentFish.specifics.baitPreferences?.loves.includes(selectedFishingBait?.itemId)) this.baitAttractiveness = 1;
    if (currentFish.specifics.baitPreferences?.likes.includes(selectedFishingBait?.itemId)) this.baitAttractiveness = 0.75;
    if (currentFish.specifics.baitPreferences?.hates.includes(selectedFishingBait?.itemId)) this.baitAttractiveness = 0;

    this.add.image(TILE_SIZE * 6, GAME_H / 2 - 96, 'fishing-background').setOrigin(0).setDisplaySize(GAME_W - TILE_SIZE * 12, 128);
    this.add.sprite(GAME_W / 2, GAME_H / 2 - 106, 'icons', 'icons/fishing/fishing-hook').setOrigin(0.5);
    this.drawInterface(selectedFishingRod, selectedFishingBait, this.baitAttractiveness, currentFish);
    this.drawFish(currentFish);

    const catchButtonPressed = () => {
      if (selectedFishingRod !== undefined) {
        if (Phaser.Math.Within(this.fish.x, GAME_W / 2, selectedFishingRod.specifics.fishingRodCatchRange / 2) && this.baited) {
          this.player.addItemToInventory(currentFish);
          this.player.updateAchievement('Here, fishy-fishy', undefined, undefined, 1);
          this.closeScene({ fishingObjectName: this.objectName });
        } else {
          // TODO: bait lost
        }
      }
    };

    this.add.text(GAME_W / 2, GAME_H / 2 + 128, 'Catch!', { color: 'black' })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', catchButtonPressed);
    this.input.keyboard.on('keyup-SPACE', catchButtonPressed);
  }

  private drawInterface(fishingRod: Item, bait: Item, baitAttractiveness: number, currentFish: Item) {
    const catchRange = fishingRod?.specifics.fishingRodCatchRange ?? 0;

    this.interfaceText?.destroy();
    this.interfaceText = this.add.text(this.opts.windowX + 16, this.opts.windowY + 16,
      `Fishing Rod: ${fishingRod?.displayName ?? 'none'}, catch range: ${catchRange}
Current fish: ${currentFish.displayName}
Loves: ${currentFish.specifics.baitPreferences?.loves.join(', ') ?? 'nothing'}, likes: ${currentFish.specifics.baitPreferences?.likes.join(', ') ?? 'nothing'}, hates: ${currentFish.specifics.baitPreferences?.hates.join(', ') ?? 'nothing'}
Current Bait: ${bait?.displayName ?? 'none'}, attractiveness: ${baitAttractiveness * 100}%`,
      { color: '#000000' });

    this.interfaceGraphics?.destroy();
    this.interfaceGraphics = this.add.graphics()
      .fillStyle(0xff0000, 0.75)
      .fillRect(GAME_W / 2 - catchRange / 2, GAME_H / 2 - 88, catchRange, 6);
  }

  private drawFish(fish: Item) {
    const fishPattern = fish.specifics.fishPattern ?? [
      { moveTo: 0, speed: 1000 },
      { moveTo: 0.25, speed: 1000 },
      { moveTo: 0.75, speed: 1000 },
      { moveTo: 1, speed: 1000 },
      { moveTo: 0.75, speed: 1000 },
      { moveTo: 0.25, speed: 1000 },
    ];
    let currentPosition = 0;

    this.fish = this.add.container(TILE_SIZE * 6, GAME_H / 2, [
      this.add.sprite(0, 0, fish.sprite.texture, fish.sprite.frame),
      this.add.graphics()
        .lineStyle(2, 0x00ff00)
        .lineBetween(0, -32, 0, -16),
    ]);

    const moveFish = ({ moveTo, speed }: { moveTo: number, speed: number }, baited: boolean) => {
      this.add.tween({
        targets: this.fish,
        y: {
          from: this.fish.y,
          to: baited ? GAME_H / 2 - 64 : GAME_H / 2,
        },
        duration: 100,
        ease: 'Linear',
        onComplete: () => { },
      });
      this.add.tween({
        targets: this.fish,
        x: {
          from: this.fish.x,
          to: (TILE_SIZE * 6) + (GAME_W - TILE_SIZE * 12) * moveTo,
        },
        duration: speed,
        ease: 'Linear',
        onComplete: () => {
          this.baited = Phaser.Math.Between(0, 100) <= this.baitAttractiveness * 100;
          currentPosition = currentPosition === fishPattern.length - 1 ? 0 : currentPosition + 1;
          moveFish(fishPattern[currentPosition], this.baited);
        },
      });
    };

    moveFish(fishPattern[currentPosition], false);
  }
}
