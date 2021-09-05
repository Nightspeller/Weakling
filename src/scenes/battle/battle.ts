import * as Phaser from 'phaser';
import { playerInstance } from '../../characters/adventurers/player';
import Disposition from './disposition';
import GeneralCharacter from '../../characters/generalCharacter';
import CharacterDrawer from './characterDrawer';
import Adventurer from '../../characters/adventurers/adventurer';
import GeneralEnemy from '../../characters/enemies/generalEnemy';
import ActionInterfaceDrawer from './actionInterfaceDrawer';
import GeneralOverlayScene from '../overlays/generalOverlayScene';
import Item from '../../entities/item';
import {
  ActionData, EffectData,
} from '../../types/my-types';
import RichBitmapText from '../../helpers/richBitmapText';
import BattleLogDrawer from './battleLogDrawer';
import { animateBuffSequence, animateMeleeSequence, animateRangedSequence } from './battleAnimationsDrawer';
import BackgroundSoundScene from '../backgroundSoundScene';

let GAME_W = 0;
let GAME_H = 0;

export default class BattleScene extends GeneralOverlayScene {
  private disposition: Disposition;
  private turnOrderDisplayContainer: Phaser.GameObjects.Container;
  private enemies: string[];
  public charToDrawerMap: Map<GeneralCharacter, CharacterDrawer>;
  private enemyName: string;
  private actionInterfaceDrawer: ActionInterfaceDrawer;
  public droppedItems: Item[];
  private background: string;
  public battleLog: BattleLogDrawer;

  constructor() {
    super({ key: 'Battle' });
    this.droppedItems = [];
  }

  public init({
    prevScene, enemies, enemyName, background,
  }: { prevScene: string, enemies: { type: string }[], enemyName: string, background: string }) {
    this.opts = {
      backgroundColor: 0xf0d191,
      backgroundAlpha: 0,
      windowX: 0,
      windowY: 0,
      windowWidth: 800,
      windowHeight: 640,
      borderColor: 0x000000,
      borderThickness: 10,
      baseDepth: 0,
    };
    this.parentSceneKey = prevScene;
    this.background = background;
    if (Array.isArray(enemies)) {
      this.enemies = enemies.map((enemy) => enemy.type);
      this.enemyName = enemyName;
    } else {
      throw Error('No enemies were passed for Battle scene!');
    }
  }

  public create() {
    super.create(this.parentSceneKey, this.opts);

    const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
    backgroundSoundScene.playBackgroundMusic('battle');

    // TODO: rework battle scene to work with the new resolution
    GAME_W = this.cameras.main.displayWidth;
    GAME_H = this.cameras.main.displayHeight;

    this.cameras.main.setViewport((GAME_W - 800) / 2, (GAME_H - 640) / 2, 800, 640);

    GAME_W = this.cameras.main.displayWidth;
    GAME_H = this.cameras.main.displayHeight;

    this.turnOrderDisplayContainer = this.add.container(16, 16);

    this.charToDrawerMap = new Map();

    this.battleLog = new BattleLogDrawer(this);

    this.disposition = new Disposition(
      playerInstance.party,
      this.enemies,
      'forrest',
      this,
    );
    this.actionInterfaceDrawer = new ActionInterfaceDrawer(this, this.disposition);
    this.disposition.playerCharacters.forEach((char, index) => {
      this.charToDrawerMap.set(char, new CharacterDrawer(this, char, index));
    });
    this.disposition.enemyCharacters.forEach((char, index) => {
      this.charToDrawerMap.set(char, new CharacterDrawer(this, char, index));
    });

    this.disposition.startRound();

    this.events.on('resume', (scene: BattleScene, data: any) => {
      if (data?.droppedItems) {
        this.droppedItems.push(...data.droppedItems);
      }
    });
  }

  public redrawAllCharacters() {
    this.charToDrawerMap.forEach((charDrawer, char) => {
      charDrawer.drawEverything(this.disposition.currentCharacter === char);
    });
  }

  public requestBattleConfirmation() {
    return new Promise((resolve) => {
      this.redrawAllCharacters();
      const engage = this.add.text(GAME_W / 2, GAME_H * (3 / 4), 'Engage', {
        fixedWidth: 140,
        font: '22px monospace',
        color: '#000000',
        backgroundColor: '#f0d191',
        align: 'center',
      })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .once('pointerdown', () => {
          engage.destroy();
          retreat.destroy();
          resolve(true);
        });
      const retreat = this.add.text(GAME_W / 2, GAME_H * (3 / 4) + 40, 'Retreat', {
        fixedWidth: 140,
        font: '22px monospace',
        color: '#000000',
        backgroundColor: '#f0d191',
        align: 'center',
      })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .once('pointerdown', () => {
          engage.destroy();
          retreat.destroy();
          resolve(false);
        });
    });
  }

  public collectActions(char: Adventurer | GeneralEnemy) {
    this.redrawAllCharacters();
    if (char instanceof Adventurer) {
      return this.actionInterfaceDrawer.drawActionInterface();
    }
    return Promise.resolve(char.aiTurn(this.disposition));
  }

  public async animateAction({
    // eslint-disable-next-line no-unused-vars
    succeeded, triggeredTraps, source, targets, action,
  }: {
    succeeded: boolean[];
    triggeredTraps: EffectData[];
    source: Adventurer | GeneralEnemy;
    targets: (Adventurer | GeneralEnemy)[];
    action: ActionData;
  }) {
    this.charToDrawerMap.get(source).drawActionPoints(true);
    if (action.animation === 'meleeAttack' || action.animation === 'meleeCast') {
      await animateMeleeSequence(this, source, targets, succeeded, action.animation);
    }
    if (action.animation === 'rangedAttack' || action.animation === 'rangedCast') {
      await animateRangedSequence(this, source, targets, succeeded, action.projectile, action.animation);
    }
    if (action.animation === 'castBuff' || action.animation === 'physicalBuff') {
      await animateBuffSequence(this, source, targets, succeeded, action.animation);
    }
  }

  public drawTurnOrder(turnOrder: (Adventurer | GeneralEnemy)[]) {
    this.turnOrderDisplayContainer.removeAll(true);
    this.turnOrderDisplayContainer.add(this.add.graphics()
      .fillStyle(0xf0d191, 0.5)
      .fillRect(0, 0, 64 * turnOrder.length, 64 + 16)
      .lineStyle(1, 0x000000)
      .strokeRect(0, 0, 64 * turnOrder.length, 64 + 16));

    turnOrder.forEach((char, i) => {
      const charNameText = new RichBitmapText(
        {
          scene: this,
          x: 64 * i,
          y: 16 + 64,
          font: 'bitmapArial',
          text: char.name,
          size: 16,
          align: undefined,
          border: { color: 0x000000, alpha: 1, width: 1 },
          fill: { color: 0xf0d191, alpha: 0.5 },
        },
      ).setVisible(false);

      const initiativeText = this.add.bitmapText(64 * i + 32, 0, 'bitmapArial', char.characteristics.initiative.toString(), 16)
        .setOrigin(0.5, 0);

      initiativeText
        .setInteractive()
        .on('pointerover', () => charNameText.setText('Initiative').setVisible(true))
        .on('pointerout', () => charNameText.setVisible(false));

      this.turnOrderDisplayContainer.add([charNameText, /* graphics, */ initiativeText]);

      const sprite = this.add.sprite(64 * i + 32, 16 + 32, char.spriteParams.texture, char.spriteParams.frame)
        .setDisplaySize(char.spriteParams.width / 1.5, char.spriteParams.height / 1.5);
      sprite.flipX = char.spriteParams.flip;
      // This whole mess with clickable area is here to make sure that it is 64x64 square centered at the char image no matter how small or big the initial image is
      // When area is applied to the image, Phaser will rescale it using image scale, thus initial clickable area rectangle must be pre-adjusted.
      const clickableArea = new Phaser.Geom.Rectangle(
        (sprite.getCenter().x - sprite.getTopLeft().x - 32) / sprite.scaleX,
        (sprite.getCenter().y - sprite.getTopLeft().y - 32) / sprite.scaleY,
        64 / sprite.scaleX,
        64 / sprite.scaleY,
      );
      sprite
        .setInteractive({ hitArea: clickableArea, hitAreaCallback: Phaser.Geom.Rectangle.Contains })
        .on('pointerover', () => charNameText.setText(char.name).setVisible(true))
        .on('pointerout', () => charNameText.setVisible(false));
      this.turnOrderDisplayContainer.add(sprite);
    });
  }

  protected _drawBackground() {
    this.add.image(this.opts.windowX, this.opts.windowY, this.background)
      .setDisplaySize(this.opts.windowWidth, this.opts.windowHeight)
      .setOrigin(0)
      .setDepth(this.opts.baseDepth);
    if (this.opts.borderThickness !== 0) {
      this.add.graphics()
        .lineStyle(this.opts.borderThickness, this.opts.borderColor)
        .strokeRect(this.opts.windowX, this.opts.windowY, this.opts.windowWidth, this.opts.windowHeight)
        .setScrollFactor(0)
        .setDepth(this.opts.baseDepth);
    }
  }

  protected _drawCloseButton() {
  }

  public exitBattle(isPartyWon: boolean) {
    console.log(`The party has ${isPartyWon ? 'won!' : 'lost...'}. Name of enemy object: ${this.enemyName}`);

    const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
    backgroundSoundScene.playBackgroundMusic('world');
    this.disposition.playerCharacters.forEach((adventurer) => {
      if (adventurer.parameters.health === 0) adventurer.addToParameter('health', 1);
    });
    if (isPartyWon === true) {
      this.closeScene({ defeatedEnemy: this.enemyName, droppedItems: this.droppedItems });
      playerInstance.updateAchievement('Weak, but not useless', undefined, undefined, 1);
    } else {
      this.closeScene({ droppedItems: this.droppedItems });
    }
  }
}
