import GeneralCharacter from '../generalCharacter';
import Disposition from '../../scenes/battle/disposition';
import Adventurer from '../adventurers/adventurer';
import { ActionData } from '../../types/my-types';

export default class GeneralEnemy extends GeneralCharacter {
    // eslint-disable-next-line no-unused-vars
    public aiTurn: (disposition: Disposition) => {action: ActionData, targets: (Adventurer | GeneralEnemy)[]};

    // eslint-disable-next-line no-useless-constructor
    constructor() {
      super();
    }
}
