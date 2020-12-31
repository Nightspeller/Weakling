import Trigger from './trigger';
import GeneralLocation from '../scenes/locations/generalLocation';
import { SpriteParameters } from '../types/my-types';

interface EnemyTriggerParams {
  scene: GeneralLocation,
  name: string,
  triggerX: number,
  triggerY: number,
  triggerW: number,
  triggerH: number,
  spriteParameters: SpriteParameters,
  background: string,
  drop: { 'itemId': string, 'quantity': number, 'chance': number }[],
  enemies: { 'type': string }[],
  xpReward: number
}

export default class EnemyTrigger extends Trigger {
  public drop: { itemId: string; quantity: number; chance: number }[];
  public xpReward: number;

  constructor({
    scene,
    name,
    triggerX,
    triggerY,
    triggerW,
    triggerH,
    spriteParameters,
    background,
    drop,
    enemies,
    xpReward,
  }: EnemyTriggerParams) {
    super({
      scene,
      name,
      triggerX,
      triggerY,
      triggerW,
      triggerH,
      texture: spriteParameters.texture,
      frame: spriteParameters.frame,
      interaction: 'activate',
      callback: () => {
        scene.switchToScene('Battle', {
          enemies,
          enemyName: name,
          background,
        }, false);
      },
    });
    this.drop = drop;
    this.xpReward = xpReward;
  }
}
