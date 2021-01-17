import GeneralCharacter from '../generalCharacter';
import Disposition from '../../scenes/battle/disposition';
import Adventurer from '../adventurers/adventurer';
import { ActionData } from '../../types/my-types';
import Action from '../../entities/action';

export default class GeneralEnemy extends GeneralCharacter {
  // eslint-disable-next-line no-unused-vars
  public aiTurn: (disposition: Disposition) => { action: ActionData | 'END TURN', targets: (Adventurer | GeneralEnemy)[] };

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  protected isActionAvailable(action: Action) {
    let result = true;
    if (action.actionCost > this.actionPoints[action.type]) {
      result = false;
    }
    if (action.parametersCost?.manna > this.parameters.manna) {
      result = false;
    }
    if (action.parametersCost?.energy > this.parameters.energy) {
      result = false;
    }
    return result;
  }

  private pickActionTargets(action: Action, disposition: Disposition) {
    if (action.target === 'self') {
      return [this];
    }
    if (action.target === 'enemy') {
      const alivePlayers = disposition.playerCharacters.filter((char) => char.isAlive);
      const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
      return [randomAlivePlayer];
    }
    return [];
  }
}
