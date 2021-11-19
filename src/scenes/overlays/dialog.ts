import * as Phaser from 'phaser';
import { Player, playerInstance } from '../../characters/adventurers/player';
import GeneralOverlayScene from './generalOverlayScene';
import {
  DialogLine, DialogOptions, DialogReplay, DialogTree,
} from '../../types/my-types';
import {
  DIALOG_WINDOW_HEIGHT, DIALOG_WINDOW_WIDTH, DIALOG_WINDOW_X, DIALOG_WINDOW_Y,
} from '../../config/constants';

interface TypewriterSoundParams {
  volume: number,
  soundKeys: { shortSound: string, longSound: string, endSound: string }
}

export default class DialogScene extends GeneralOverlayScene {
  private timedEvent: Phaser.Time.TimerEvent;
  private dialogDisplayGroup: Phaser.GameObjects.Group;
  private closeCallback: Function;
  private updateCallback?: Function;
  private dialogTree: any[];
  private player: Player;
  declare public opts: DialogOptions;
  private speakerName: string;
  private sounds?: TypewriterSoundParams;

  private typewriterLongSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private typewriterShortSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  private typewriterEndSound: Phaser.Sound.BaseSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  constructor() {
    super({ key: 'Dialog' });
  }

  public init({
    dialogTree,
    opts,
    closeCallback,
    updateCallback,
    prevScene,
    speakerName,
    sounds,
  }: { dialogTree: DialogTree, opts?: DialogOptions, closeCallback?: Function, updateCallback?: Function, prevScene: string, speakerName: string, sounds?: TypewriterSoundParams }) {
    this.opts = {
      borderThickness: 3,
      borderColor: 0x907748,
      borderAlpha: 1,

      backgroundColor: 0x303030,
      backgroundAlpha: 1,

      windowX: DIALOG_WINDOW_X,
      windowY: DIALOG_WINDOW_Y,
      windowWidth: DIALOG_WINDOW_WIDTH,
      windowHeight: DIALOG_WINDOW_HEIGHT,

      responseTextColor: '#47340c',
      responseTextHoverColor: 'black',

      // closeButtonColor: 'darkgoldenrod',
      // closeButtonHoverColor: 'red',

      textColor: 'black',
      letterAppearanceDelay: 15,
    };
    this.sounds = sounds;
    this.speakerName = speakerName;
    this.dialogTree = dialogTree;
    this.opts = { ...this.opts, ...opts };
    this.closeCallback = closeCallback;
    this.updateCallback = updateCallback;
    this.player = playerInstance;
    this.parentSceneKey = prevScene;
  }

  public preload() {

  }

  public create() {
    super.create(this.parentSceneKey, this.opts);

    if(!this.sounds) { //if no sound data has been specified for the current dialog
      // default settings
      this.sounds = {
        volume: 0.1,
        soundKeys: {shortSound: "typewriter-short", longSound: "typewriter-long", endSound: "typewriter-end"}
      }
    }

    const soundKeyObject = this.sounds['soundKeys'] 
    
    this.typewriterLongSound = this.sound.add(soundKeyObject.longSound ?? 'typewriter-long');
    this.typewriterShortSound = this.sound.add(soundKeyObject.shortSound ?? 'typewriter-short');
    this.typewriterEndSound = this.sound.add(soundKeyObject.endSound ?? 'typewriter-end');
    
    this.dialogDisplayGroup = this.add.group();
    this._showDialog();
    // @ts-ignore
    this.events.on('wake', (scene, {
      dialogTree,
      opts,
      closeCallback,
      updateCallback,
      prevScene,
      speakerName,
    }: any) => {
      this.parentSceneKey = prevScene;
      this.dialogTree = dialogTree;
      this.speakerName = speakerName;
      this.opts = { ...this.opts, ...opts };
      this.closeCallback = closeCallback;
      this.updateCallback = updateCallback;
      this._showDialog();
    });
  }

  private _showDialog() {
    this._showLine(this.dialogTree[0]);
  }

  private _showLine(line: DialogLine) {
    this.dialogDisplayGroup.clear(true, true);
    this._showName();
    this.timedEvent?.remove();
    if (line.text.length > 420) console.warn('Dialog line is longer than 420 characters! Might be looking bad!...', line.text);
    this._setText(line.text, this.opts.letterAppearanceDelay > 0)
      .then(() => {
        this._setReplies(line.replies);
      });
  }

  private _setReplies(replies: DialogReplay[]) {
    const keyCodes = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'].forEach((keyCode) => this.input.keyboard.off(`keyup-${keyCode}`));
    let prevLineTopY = this.opts.windowY + this.opts.windowHeight - 5;
    const reversedReplies = JSON.parse(JSON.stringify(replies))
      .reverse();
    reversedReplies.forEach((reply: DialogReplay, index: number) => {
      if (reply.text.length > 200) console.warn('Dialog line is longer than 200 characters! Might be looking bad!...', reply.text);
      const replyX = this.opts.windowX + 25;
      const replyY = prevLineTopY - 5;
      const replyGameObject = this.add.text(replyX, replyY, `${reversedReplies.length - index}. ${reply.text}`, {
        color: this.opts.responseTextColor,
        font: '20px monospace',
        wordWrap: {
          width: this.opts.windowWidth - 50,
        },
      })
        .setScrollFactor(0)
        .setOrigin(0, 1)
        .setInteractive();
      prevLineTopY = replyGameObject.getTopLeft().y;
      replyGameObject.on('pointerover', () => replyGameObject.setColor(this.opts.responseTextHoverColor));
      replyGameObject.on('pointerout', () => replyGameObject.setColor(this.opts.responseTextColor));
      replyGameObject.once('pointerdown', () => {
        this._replaySelected(reply);
      });
      this.input.keyboard.once(`keyup-${keyCodes[reversedReplies.length - index]}`, () => {
        keyCodes.forEach((keyCode) => this.input.keyboard.off(`keyup-${keyCode}`));
        this._replaySelected(reply);
      });
      this.dialogDisplayGroup.add(replyGameObject);
    });
  }

  private _replaySelected(reply: DialogReplay) {
    if (reply.checkCharacteristic !== undefined) {
      // @ts-ignore
      if (this.player.characteristics[reply.checkCharacteristic] >= reply.checkValue) {
        const nextLine = this.dialogTree.find((line) => line.id === reply.successTriggers);
        this._showLine(nextLine);
      } else {
        const nextLine = this.dialogTree.find((line) => line.id === reply.failureTriggers);
        this._showLine(nextLine);
      }
    } else if (reply.checkInventory) {
      let allIsThere = true;
      // @ts-ignore
      reply.checkValue.forEach((requestedItem) => {
        const item = this.player.getInventoryItemById(requestedItem.itemId)?.item;
        if (item === undefined || item.quantity < requestedItem.quantity) {
          allIsThere = false;
        }
      });
      if (allIsThere) {
        if (reply.checkInventory === 'remove') {
          // @ts-ignore
          reply.checkValue.forEach((requestedItem) => {
            const item = this.player.getInventoryItemById(requestedItem.itemId)?.item;
            this.player.removeItemFromInventory(item, requestedItem.quantity);
          });
        }
        const nextLine = this.dialogTree.find((line) => line.id === reply.successTriggers);
        this._showLine(nextLine);
      } else {
        const nextLine = this.dialogTree.find((line) => line.id === reply.failureTriggers);
        this._showLine(nextLine);
      }
    } else if (reply.successTriggers !== undefined) {
      const nextLine = this.dialogTree.find((line) => line.id === reply.successTriggers);
      
      if (this.updateCallback) this.updateCallback()
      
      this._showLine(nextLine);
    } else {
      this.closeScene(reply.callbackParam);
    }
  }

  public closeScene(param = 'fastEnd') {
    this.input.keyboard.off('keydown-SPACE');
    ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'].forEach((keyCode) => this.input.keyboard.off(`keyup-${keyCode}`));
    this.timedEvent?.remove();
    this.dialogDisplayGroup.clear(true, true);
    super.closeScene();
    if (this.closeCallback) {
      this.closeCallback(param);
    }
  }

  private _setText(text: string, animate: boolean) {
    return new Promise<void>((resolve) => {
      text += '\n——————————————————————————————————————————————————————————————————————';
      const textX = this.opts.windowX + 25;
      const textY = this.opts.windowY + 10;
      const textGameObject = this.add.text(textX, textY, '', {
        color: this.opts.textColor,
        font: '20px monospace',
        wordWrap: {
          width: this.opts.windowWidth - 50,
        },
      })
        .setScrollFactor(0);
      this.dialogDisplayGroup.add(textGameObject);

      if (animate) {
        let shownLettersCounter = 0;
        if (this.timedEvent) this.timedEvent.remove();
        const zone = this.add.zone(this.opts.windowX, this.opts.windowY, this.opts.windowWidth, this.opts.windowHeight)
          .setOrigin(0, 0)
          .setScrollFactor(0)
          .setInteractive();

        this.timedEvent = this.time.addEvent({
          delay: this.opts.letterAppearanceDelay,
          callback: () => {
            textGameObject.setText(text.slice(0, shownLettersCounter));
            this.playTypewriterSound(shownLettersCounter, text[shownLettersCounter]);
            if (text.length === shownLettersCounter) {
              this.playTypewriterSound();
              this.timedEvent.remove();
              zone.destroy();
              this.input.keyboard.off('keydown-SPACE');
              resolve();
            } else {
              shownLettersCounter += 1;
            }
          },
          loop: true,
        });

        zone.once('pointerdown', () => {
          this.typewriterEndSound.play({
            volume: 0.5,
          });
          zone.destroy();
          this.input.keyboard.off('keydown-SPACE');
          this.timedEvent.remove();
          textGameObject.setText(text);
          resolve();
        });
        this.input.keyboard.once('keydown-SPACE', () => {
          zone.destroy();
          this.timedEvent.remove();
          textGameObject.setText(text);
          resolve();
        });
        this.dialogDisplayGroup.add(zone);
      } else {
        textGameObject.setText(text);
        resolve();
      }
    });
  }

  private playTypewriterSound(letterCounter?: number, currentLetter?: string ) {
    if (currentLetter === '—') return;

    if (letterCounter === undefined) {
      this.typewriterEndSound.play({
        volume: this.sounds.volume ?? 0.5,
      });
      return;
    }

    if (letterCounter % 7 === 0) {
      if (Phaser.Math.Between(0, 1) === 1) {
        this.typewriterLongSound.play({
          volume: this.sounds.volume ?? 0.5,
        });
      } else {
        this.typewriterShortSound.play({
          volume: this.sounds.volume ?? 0.5,
        });
      }
    }
  }

  private _showName() {
    if (this.speakerName) {
      const name = this.add.text(this.opts.windowX + 5, this.opts.windowY - 26, this.speakerName, { font: '20px monospace' })
        .setDepth(this.opts.baseDepth + 1);
      const nameBackground = this.add.graphics()
        .fillStyle(this.opts.backgroundColor, this.opts.backgroundAlpha)
        .fillRect(this.opts.windowX, this.opts.windowY - 25, name.width + 10, name.height + 2)
        .lineStyle(this.opts.borderThickness, this.opts.borderColor)
        .strokeRect(this.opts.windowX, this.opts.windowY - 25, name.width + 10, name.height + 2)
        .setScrollFactor(0)
        .setDepth(this.opts.baseDepth);
      this.dialogDisplayGroup.addMultiple([name, nameBackground]);
    }
  }
}
