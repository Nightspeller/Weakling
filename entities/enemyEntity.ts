import GeneralEntity from "./generalEntity.js";
import {Disposition} from "./disposition";
import {Adventurer} from "./adventurer";

export default class EnemyEntity extends GeneralEntity{
    public aiTurn: (disposition: Disposition) => {action: Action, target: Adventurer | EnemyEntity};

    constructor() {
        super();
    }
}
