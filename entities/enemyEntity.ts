import GeneralEntity from "./generalEntity.js";
import {Disposition} from "./disposition";

export default class EnemyEntity extends GeneralEntity{

    constructor() {
        super();
    }

    public async aiTurn(disposition: Disposition) {};
}
