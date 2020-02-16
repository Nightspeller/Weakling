import GeneralEntity from "./generalEntity.js";
import {Disposition} from "./disposition";
import {Adventurer} from "./adventurer";

export default class EnemyEntity extends GeneralEntity{
    public aiTurn: (disposition: Disposition) => {action: Action, targets: (Adventurer | EnemyEntity)[]};

    constructor() {
        super();
    }
}
