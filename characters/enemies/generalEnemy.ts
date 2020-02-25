import GeneralCharacter from "../generalCharacter.js";
import {Disposition} from "../../battle/disposition.js";
import {Adventurer} from "../adventurers/adventurer.js";

export default class GeneralEnemy extends GeneralCharacter{
    public aiTurn: (disposition: Disposition) => {action: ActionData, targets: (Adventurer | GeneralEnemy)[]};

    constructor() {
        super();
    }
}
