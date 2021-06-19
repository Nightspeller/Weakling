import GeneralLocation from '../generalLocation';
import EvelynNpc from '../../../triggers/npcs/greatPlains/evelynNpc';

export default class GreatPlainsScene extends GeneralLocation {
  protected updateNpcPath: boolean;
  protected evelyn: EvelynNpc

  constructor() {
    super({ key: 'GreatPlains' });
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
    this.updateNpcPath = false;
  }

  public update() {
    super.update();

    if (this.updateNpcPath) {
      this.evelyn.moveCharacter(this.map, this.playerImage.x, this.playerImage.y);
    }
  }

  protected async performSpecificCutsceneActions(cutsceneId: string) {
    console.log(cutsceneId);
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });
  }

  protected startMovingNPC(toPosX: number | 'playerPosX', toPosY: number | 'playerPosY') {
    this.evelyn.walkEvent.paused = false;
    if (toPosX === 'playerPosX' && toPosY === 'playerPosY') {
      this.evelyn.moveCharacter(this.map, this.playerImage.x, this.playerImage.y);
    } else if (typeof toPosX === 'number' && typeof toPosY === 'number') {
      this.evelyn.moveCharacter(this.map, toPosX, toPosY);
    }
  }

  protected setUpdateNpcPath(isTrue: boolean) {
    this.updateNpcPath = isTrue;
  }
}
