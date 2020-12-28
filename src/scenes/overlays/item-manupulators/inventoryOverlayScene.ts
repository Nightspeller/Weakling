import * as Phaser from 'phaser';
import GeneralItemManipulatorScene from './generalItemManipulator';
import { backpackSlotNames, dollSlotNames, playerSlotNames } from '../../../data/items/itemSlots';
import { Slots } from '../../../types/my-types';

export default class InventoryOverlayScene extends GeneralItemManipulatorScene {
  private numberOfQuickSlots: number;

  private characteristicsText: Phaser.GameObjects.Text;

  constructor(initObject = { key: 'Inventory' }) {
    super(initObject);
  }

  public preload() {

  }

  public create(withCharacteristics = true) {
    super.create();
    this.numberOfQuickSlots = this.player.getItemInSlot('belt')?.specifics.quickSlots || 1;
    this._showInventory(withCharacteristics);
    if (withCharacteristics) {
      this.input.keyboard.on('keyup-I', () => this.closeScene());
    }
  }

  private _showInventory(withCharacteristics: boolean) {
    this._drawDoll();
    this._drawQuickSlots();
    this._drawBackpack();
    this._createDropSlot(16, this.opts.windowHeight - 64 - 32 - 64);
    this._createItemsMap(this.player.getAllItems(), () => {
      this.updatePlayerInventory(withCharacteristics);
    });
    if (withCharacteristics) this._drawCharacteristics();
    this._enableDragAndDrop();
  }

  private _drawDoll() {
    this.add.sprite(this.opts.windowX + 16, this.opts.windowY + 20, 'doll')
      .setOrigin(0, 0).setScale(0.75).setScrollFactor(0)
      .setDepth(this.opts.baseDepth);
    const dollZoneCoords = {
      rightHand: { x: 16, y: 78 },
      leftHand: { x: 281, y: 246 },
      belt: { x: 202, y: 246 },
      head: { x: 202, y: 20 },
      neck: { x: 202, y: 92 },
      bag: { x: 357, y: 20 },
      ringLeft: { x: 357, y: 246 },
      ringRight: { x: 86, y: 78 },
      body: { x: 202, y: 246 - 77 },
      cape: { x: 287, y: 246 + 82 },
      gloves: { x: 16, y: 78 + 80 },
      tail: { x: 94, y: 246 + 86 },
      pants: { x: 208, y: 246 + 82 },
      boots: { x: 210, y: 246 + 162 },
    };
    Object.entries(dollZoneCoords).forEach(([name, coords]) => {
      this._createSlot(name, coords.x, coords.y, true);
      /* this.add.graphics()
                .fillStyle(0xff0000, 1)
                .fillRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height); */
    });
  }

  private _drawQuickSlots() {
    for (let i = 0; i < this.numberOfQuickSlots; i += 1) {
      this._createSlot(`quickSlot${i}`, 16 + 64 * i, this.opts.windowHeight - 64 - 16);
    }
  }

  private _drawBackpack() {
    for (let i = 0; i < 5; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        const slotX = this.opts.windowWidth - 20 - 64 * 5 + 64 * i;
        const slotY = 20 + 64 * j;
        this._createSlot(`backpack${i}_${j}`, slotX, slotY);
      }
    }
  }

  private _adjustQuickSlots() {
    const oldQuickSlotsNumber = this.numberOfQuickSlots;
    const newQuickSlotsNumber = this.itemsMap.get('belt')?.item.specifics.quickSlots || 1;
    console.log(`Adjusting quickSlots from ${oldQuickSlotsNumber} to ${newQuickSlotsNumber}`);
    this.numberOfQuickSlots = newQuickSlotsNumber;
    if (newQuickSlotsNumber < oldQuickSlotsNumber) {
      for (let i = oldQuickSlotsNumber - 1; i > newQuickSlotsNumber - 1; i -= 1) {
        const itemToBeMoved = this.itemsMap.get(`quickSlot${i}` as Slots);
        if (itemToBeMoved) {
          this._moveItemFromSlotToFirstPossible(`quickSlot${i}` as Slots, backpackSlotNames, undefined, true);
        }
        this.slotsDisplayGroup.getChildren()
          .find((obj) => obj.name === `quickSlot${i}`)
          .destroy();
      }
    }
    if (newQuickSlotsNumber > oldQuickSlotsNumber) {
      for (let i = oldQuickSlotsNumber; i < newQuickSlotsNumber; i += 1) {
        this._createSlot(`quickSlot${i}`, 16 + 64 * i, this.opts.windowHeight - 64 - 16);
      }
    }
  }

  private _drawCharacteristics() {
    console.log('Re-drawing characteristics');
    const textX = this.opts.windowX + this.opts.windowWidth - 20 - 64 * 5;
    const textY = this.opts.windowY + 20 + 64 * 5 + 20;
    const text = `${this.player.name}, level ${this.player.level}, ${this.player.xp}xp / ${this.player.experienceTable[this.player.level]}xp
HP: ${this.player.parameters.health}/${this.player.characteristics.health}
MP: ${this.player.parameters.manna}/${this.player.characteristics.manna}
EN: ${this.player.parameters.energy}/${this.player.characteristics.energy}
Strength: ${this.player.characteristics.strength}
Agility: ${this.player.characteristics.agility}
Intelligence: ${this.player.characteristics.intelligence}
Armor: ${this.player.characteristics.armor}
Dodge: ${this.player.characteristics.dodge}
Resistance: 🔥${this.player.characteristics.fireResistance}❄${this.player.characteristics.coldResistance}⚡${this.player.characteristics.electricityResistance}☣${this.player.characteristics.acidResistance}☠${this.player.characteristics.poisonResistance}✨${this.player.characteristics.magicResistance}
Initiative: ${this.player.characteristics.initiative}
Damage: ${this.player.getAttackDamage()}

Actions: ${this.player.getAvailableActions()
    .join(', ')}`;

    if (this.characteristicsText) this.characteristicsText.destroy();
    this.characteristicsText = this.add.text(textX, textY, text, {
      font: '14px monospace',
      color: '#000000',
      wordWrap: {
        width: 32 * 10,
      },
    })
      .setScrollFactor(0)
      .setDepth(this.opts.baseDepth)
      .setName('characteristicsText');
  }

  private updatePlayerInventory(withCharacteristics: boolean) {
    const newPlayerInventory = new Map();
    this.itemsMap.forEach((itemR, slot) => {
      if (playerSlotNames.includes(slot)) {
        newPlayerInventory.set(slot, itemR.item);
      }
    });
    this.player.updateInventory(newPlayerInventory);
    this._adjustQuickSlots();
    if (withCharacteristics) this._drawCharacteristics();

    let shouldGetAchievement = true;
    dollSlotNames.forEach((slot) => {
      if (this.itemsMap.get(slot) === undefined) shouldGetAchievement = false;
    });
    if (shouldGetAchievement) this.player.updateAchievement('Fully prepared', undefined, true);
  }
}
