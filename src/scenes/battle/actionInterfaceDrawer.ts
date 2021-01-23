/* eslint-disable */
// @ts-nocheck
import * as Phaser from 'phaser';
import Disposition from './disposition';
import BattleScene from './battle';
import Adventurer from '../../characters/adventurers/adventurer';
import GeneralEnemy from '../../characters/enemies/generalEnemy';
import { GAME_W } from '../../config/constants';
import Action from '../../entities/action';
import { ActionData } from '../../types/my-types';
import RichBitmapText from '../../helpers/richBitmapText';

const { Rectangle } = Phaser.Geom;

export default class ActionInterfaceDrawer {
  private readonly disposition: Disposition;
  private readonly scene: BattleScene;
  private readonly displayContainer: Phaser.GameObjects.Container;
  private actionDescriptionContainer: Phaser.GameObjects.Container;

  constructor(scene: BattleScene, disposition: Disposition) {
    this.disposition = disposition;
    this.scene = scene;
    this.displayContainer = this.scene.add.container(16, 500)
      .setDepth(2);
  }

  public drawActionInterface() {
    return new Promise((resolve) => {
      this.displayContainer.removeAll(true);
      const { disposition } = this;
      this.drawEndTurnButton(resolve);
      const self = this;
      const { scene } = this;
      const { currentCharacter } = disposition;
      const availableActions = currentCharacter.getAvailableActions();
      const actionsOfType = [0, 0, 0];
      let buttonX: number;
      let buttonY: number;
      availableActions.forEach((actionId) => {
        const action = new Action(actionId, currentCharacter);
        if (disposition.currentPhase === 'preparation' && (action.actionId === 'retreat' || action.actionId === 'accessInventory')) {
          action.actionCost = 0;
        }

        if (action.phase.includes(disposition.currentPhase)) {
          if (action.type === 'physical') {
            buttonX = (actionsOfType[0] % 3) * 81;
            buttonY = 32 * Math.floor(actionsOfType[0] / 3);
            actionsOfType[0] += 1;
          }
          if (action.type === 'magical') {
            buttonX = GAME_W / 2 - 81 - 40 - 16 + (actionsOfType[1] % 3) * 81;
            buttonY = 32 * Math.floor(actionsOfType[1] / 3);
            actionsOfType[1] += 1;
          }
          if (action.type === 'misc') {
            buttonX = GAME_W - 32 - 3 * 81 + (actionsOfType[2] % 3) * 81;
            buttonY = 32 * Math.floor(actionsOfType[2] / 3);
            actionsOfType[2] += 1;
          }

          let isEnoughResource = true;
          if (action.parametersCost?.energy) {
            isEnoughResource = currentCharacter.parameters.energy >= action.parametersCost?.energy;
          }
          if (action.parametersCost?.manna) {
            isEnoughResource = currentCharacter.parameters.manna >= action.parametersCost?.manna;
          }
          const isAvailable = isEnoughResource && currentCharacter.actionPoints[action.type] >= action.actionCost;

          const button = this.drawActionInterfaceButton(action, buttonX, buttonY, isAvailable);
          button.bx = buttonX;
          button.by = buttonY;
          if (!isAvailable) return;
          button.on('pointerdown', function () {
            if (action.target === 'self') {
              self.displayContainer.removeAll(true);
              resolve({ action, targets: [currentCharacter] });
            }
            if (action.target === 'allEnemies') {
              self.displayContainer.removeAll(true);
              resolve({
                action,
                targets: disposition.enemyCharacters.filter((char) => char.isAlive),
              });
            }
            if (['enemy', 'friend', 'any', 'party'].includes(action.target)) {
              console.log(`starting ${action.target} target selection`);
              this.lineStyle(1, 0xff0000, 1)
                .strokeRect(this.bx, this.by, 32 + 3 * 16, 32);
              const potentialTargets = self.getPossibleTargets(action.target, currentCharacter);

              const overlay = scene.add.graphics()
                .fillStyle(0x000000, 0.25)
                .fillRect(0, 0, 800, 640)
                .setDepth(3);
              const zone = scene.add.zone(0, 0, 800, 640)
                .setOrigin(0, 0)
                .setDepth(3)
                .setInteractive()
                .once('pointerdown', () => removeOverlay());
              const removeOverlay = () => {
                overlay.destroy();
                zone.destroy();
                potentialTargets.forEach((potentialTarget) => {
                  potentialTarget.image.setDepth(0);
                  potentialTarget.zone.destroy();
                });
                this.lineStyle(1, 0x000000, 1)
                  .strokeRect(this.bx, this.by, 32 + 3 * 16, 32);
              };

              potentialTargets.forEach((potentialTarget) => {
                if (potentialTarget.character.isAlive) {
                  potentialTarget.image.setDepth(4);
                  potentialTarget.zone.once('pointerdown', () => {
                    removeOverlay();
                    self.displayContainer.removeAll(true);
                    resolve({ action, targets: [potentialTarget.character] });
                  });
                }
              });
            }
          });
        }
      });
    });
  }

  private getPossibleTargets(target: 'enemy' | 'any' | 'party' | 'friend', self):
    { image: Phaser.GameObjects.Sprite, character: Adventurer | GeneralEnemy, zone?: Phaser.GameObjects.Zone }[] {
    const targetList: { image: Phaser.GameObjects.Sprite, character: Adventurer | GeneralEnemy, zone?: Phaser.GameObjects.Zone }[] = [];
    if (target === 'enemy' || target === 'any') {
      this.disposition.enemyCharacters.forEach((char) => {
        const charImage = this.scene.charToDrawerMap.get(char).mainImage;
        const zone = this.scene.add.zone(charImage.x, charImage.y, 96, 96)
          .setDepth(4)
          .setInteractive({ useHandCursor: true });
        targetList.push({ image: charImage, character: char, zone });
      });
    }
    if (target === 'party' || target === 'any') {
      this.disposition.playerCharacters.forEach((char) => {
        const charImage = this.scene.charToDrawerMap.get(char).mainImage;
        const zone = this.scene.add.zone(charImage.x, charImage.y, 96, 96)
          .setDepth(4)
          .setInteractive({ useHandCursor: true });
        targetList.push({ image: charImage, character: char, zone });
      });
    }
    if (target === 'friend') {
      this.disposition.playerCharacters.forEach((char) => {
        if (char !== self) {
          const charImage = this.scene.charToDrawerMap.get(char).mainImage;
          const zone = this.scene.add.zone(charImage.x, charImage.y, 96, 96)
            .setDepth(4)
            .setInteractive({ useHandCursor: true });
          targetList.push({ image: charImage, character: char, zone });
        }
      });
    }
    return targetList;
  }

  private drawActionInterfaceButton(action: ActionData, buttonX: number, buttonY: number, isAvailable: boolean) {
    const border = this.scene.add.graphics();
    this.displayContainer.add(border);
    const actionIcon = this.scene.add.sprite(buttonX, buttonY, action.icon.texture, action.icon.frame)
      .setOrigin(0, 0);

    this.displayContainer.add(actionIcon);

    let pointsDrawn = 0;
    const frames = { physical: 0, magical: 1, misc: 2 };

    for (let i = 0; i < Math.trunc(action.actionCost); i += 1) {
      this.displayContainer.add(this.scene.add.sprite(buttonX + 32 + pointsDrawn * 16, buttonY, 'action-points', frames[action.type])
        .setOrigin(0, 0));
      pointsDrawn += 1;
    }
    if (action.actionCost % 1 === 0.5) {
      this.displayContainer.add(this.scene.add.sprite(buttonX + 32 + pointsDrawn * 16, buttonY, 'action-points', frames[action.type] + 3)
        .setOrigin(0, 0));
      pointsDrawn += 1;
    }
    if (action.parametersCost?.energy) {
      this.displayContainer.add(this.scene.add.text(buttonX + 32, buttonY + 16, `EN:${action.parametersCost?.energy.toString()}`, { color: 'green' })
        .setOrigin(0, 0));
    }
    if (action.parametersCost?.manna) {
      this.displayContainer.add(this.scene.add.text(buttonX + 32, buttonY + 16, `MP:${action.parametersCost?.manna.toString()}`, { color: 'blue' })
        .setOrigin(0, 0));
    }

    border.lineStyle(1, 0x000000, 1)
      .fillStyle(isAvailable ? 0xf0d191 : 0x8e8e8e)
      .fillRect(buttonX, buttonY, 32 + 3 * 16, 32)
      .strokeRect(buttonX, buttonY, 32 + 3 * 16, 32)
      .setInteractive({
        useHandCursor: true,
        hitArea: new Rectangle(buttonX, buttonY, 32 + 3 * 16, 32),
        hitAreaCallback: Rectangle.Contains,
      })
      .on('pointerover', () => this._drawActionDescription(action, true, buttonX, buttonY))
      .on('pointerout', () => this._drawActionDescription(action, false));

    return border;
  }

  private _drawActionDescription(action: ActionData, show: boolean, x?: number, y?: number) {
    if (this.actionDescriptionContainer) {
      this.actionDescriptionContainer.removeAll(true);
    }
    this.actionDescriptionContainer = this.scene.add.container(0, 0);

    if (show) {
      if (x + 240 > GAME_W) x -= 160;
      let lastTextY = y - 5;
      const background = this.scene.add.graphics();
      this.actionDescriptionContainer.add(background);

      const actionNoticableText = this.scene.add.text(
        x,
        lastTextY,
        `Chance of being noticed: ${action.noticeable * 100}%`,
        {
          font: '12px monospace',
          wordWrap: { width: 245 },
          align: 'left',
          color: 'black',
          padding: {
            left: 5,
            right: 5,
          },
        },
      )
        .setOrigin(0, 1);
      this.actionDescriptionContainer.add(actionNoticableText);
      lastTextY = lastTextY - actionNoticableText.height - 5;

      const actionEffectsText = this.scene.add.text(
        x,
        lastTextY,
        `Effects: ${action.effects.map((effect) => effect.effectId)
          .join(', ')}`,
        {
          font: '12px monospace',
          wordWrap: { width: 245 },
          align: 'left',
          color: 'black',
          padding: {
            left: 5,
            right: 5,
          },
        },
      )
        .setOrigin(0, 1);
      this.actionDescriptionContainer.add(actionEffectsText);
      lastTextY = lastTextY - actionEffectsText.height - 5;

      const actionTargetText = this.scene.add.text(
        x,
        lastTextY,
        `Target: ${action.target}`,
        {
          font: '12px monospace',
          wordWrap: { width: 245 },
          align: 'left',
          color: 'black',
          padding: {
            left: 5,
            right: 5,
          },
        },
      )
        .setOrigin(0, 1);
      this.actionDescriptionContainer.add(actionTargetText);
      lastTextY = lastTextY - actionTargetText.height - 5;

      const actionPhaseText = this.scene.add.text(
        x,
        lastTextY,
        `Can be used during ${action.phase.join(' and ')} phase.`,
        {
          font: '12px monospace',
          wordWrap: { width: 245 },
          align: 'left',
          color: 'black',
          padding: {
            left: 5,
            right: 5,
          },
        },
      )
        .setOrigin(0, 1);
      this.actionDescriptionContainer.add(actionPhaseText);
      lastTextY = lastTextY - actionPhaseText.height - 5;

      const actionPointsCostText = this.scene.add.text(
        x,
        lastTextY,
        `Uses ${action.actionCost} ${action.type} action point(s).`,
        {
          font: '12px monospace',
          wordWrap: { width: 245 },
          align: 'left',
          color: 'black',
          padding: {
            left: 5,
            right: 5,
          },
        },
      )
        .setOrigin(0, 1);
      this.actionDescriptionContainer.add(actionPointsCostText);
      lastTextY = lastTextY - actionPointsCostText.height - 5;

      if (action.parametersCost.energy || action.parametersCost.manna) {
        const actionParametersCostText = this.scene.add.text(
          x,
          lastTextY,
          `Requires ${action.parametersCost.energy || action.parametersCost.manna} ${action.parametersCost.energy ? 'energy' : 'manna'}.`,
          {
            font: '12px monospace',
            wordWrap: { width: 245 },
            align: 'left',
            color: 'black',
            padding: {
              left: 5,
              right: 5,
            },
          },
        )
          .setOrigin(0, 1);
        this.actionDescriptionContainer.add(actionParametersCostText);
        lastTextY = lastTextY - actionParametersCostText.height - 5;
      }

      const actionDescriptionText = this.scene.add.text(
        x,
        lastTextY,
        action.actionDescription,
        {
          font: '12px monospace',
          wordWrap: { width: 245 },
          align: 'left',
          color: 'black',
          padding: {
            left: 5,
            right: 5,
          },
        },
      )
        .setOrigin(0, 1);
      this.actionDescriptionContainer.add(actionDescriptionText);
      lastTextY = lastTextY - actionDescriptionText.height - 5;

      const actionNameText = this.scene.add.text(
        x,
        lastTextY,
        action.actionName,
        {
          font: 'bold 12px monospace',
          wordWrap: { width: 245 },
          align: 'left',
          color: 'black',
          padding: {
            left: 5,
            right: 5,
          },
        },
      )
        .setOrigin(0, 1);
      this.actionDescriptionContainer.add(actionNameText);
      lastTextY -= actionNameText.height;

      background.lineStyle(1, 0x000000, 1)
        .fillStyle(0xf0d191)
        .fillRect(x, y, 245, -(y - lastTextY + 5))
        .strokeRect(x, y, 245, -(y - lastTextY + 5));

      this.displayContainer.add(this.actionDescriptionContainer);
    }
  }

  // TODO: replace with Bitmap text or something else for performance...
/*  const endTurnText = new RichBitmapText(
    {
      scene: this.scene,
      x: 800 / 2,
      y: -40,
      font: 'bitmapArial',
      text: 'End Turn',
      size: 22,
      border: { color: 0x000000, alpha: 1, width: 1 },
      fill: { color: 0x8ef000 }
    }
  ).setSize(100, 22).setInteractive({ useHandCursor: true });*/

  private drawEndTurnButton(resolve: Function) {
    const endTurnText = this.scene.add.text(
      800 / 2,
      -40,
      'End Turn',
      {
        fixedWidth: 140,
        font: '22px monospace',
        color: '#000000',
        backgroundColor: '#8ef000',
        align: 'center',
      },
    )
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    this.displayContainer.add(endTurnText);

    const border = this.scene.add.graphics()
      .lineStyle(1, 0x000000, 1)
      .strokeRect(endTurnText.getTopLeft().x, endTurnText.getTopLeft().y, endTurnText.width, endTurnText.height);
    this.displayContainer.add(border);

    endTurnText.once('pointerdown', () => {
      this.displayContainer.removeAll(true);
      resolve({ action: 'END TURN', targets: null });
    });
  }
}
