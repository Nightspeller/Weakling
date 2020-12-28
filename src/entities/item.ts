import itemsData from '../data/itemsData';
import { ItemData, Slots, SpriteParameters } from '../types/my-types';

export default class Item implements ItemData {
  public itemId: string;

  public displayName: string;

  public description: string;

  public possibleSlots: Slots[];

  public sprite: SpriteParameters;

  public stackable: boolean;

  public modified: boolean;

  public quantity: number;

  public specifics: any;

  public sellPrice: number;

  public buyPrice: number;

  constructor(itemId: string, quantity = 1, options = {}) {
    let itemParams = {} as ItemData;
    if (itemId) {
      if (itemsData[itemId]) {
        itemParams = JSON.parse(JSON.stringify(itemsData[itemId]));
      } else {
        throw new Error(`Can't create "${itemId}" because there is no data for it.`);
      }
    }
    if (itemParams.stackable === false && quantity > 1) {
      throw new Error(`Trying to create unstackable item "${itemId}" with quantity of ${quantity}.`);
    }
    itemParams = {
      ...itemParams,
      ...options,
      quantity,
    };
    Object.entries(itemParams)
      .forEach(([key, value]) => {
        // @ts-ignore
        this[key] = value;
      });
  }
}
