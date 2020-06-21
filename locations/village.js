import { GeneralLocation } from "./generalLocation.js";
import { introVillageDialog } from "../data/dialogs/introDialog.js";
import { DEBUG } from "../config/constants.js";
import { MoorshNpc } from "../npcs/village/moorshNpc.js";
import { NahkhaNpc } from "../npcs/village/nahkhaNpc.js";
import { ElderNpc } from "../npcs/village/elderNpc.js";
import { MitikhhaNpc } from "../npcs/village/mitikhhaNpc.js";
import { WhiskersNpc } from "../npcs/village/whiskersNpc.js";
import { TarethNpc } from "../npcs/village/tarethNpc.js";
import { KeithNpc } from "../npcs/village/keithNpc.js";
import { HargkakhNpc } from "../npcs/village/hargkakhNpc.js";
export class VillageScene extends GeneralLocation {
    constructor() {
        super({ key: 'Village' });
    }
    preload() {
        super.preload();
    }
    init(data) {
        super.init(data);
    }
    create() {
        super.create('village');
        if (!DEBUG) {
            this.switchToScene('Dialog', {
                dialogTree: introVillageDialog,
                closeCallback: (param) => {
                }
            }, false);
        }
        const elder = new ElderNpc({ scene: this });
        const mitikhha = new MitikhhaNpc({ scene: this });
        const whiskers = new WhiskersNpc({ scene: this });
        const tareth = new TarethNpc({ scene: this });
        const keith = new KeithNpc({ scene: this });
        const nahkha = new NahkhaNpc({ scene: this });
        const moorsh = new MoorshNpc({ scene: this });
        const hargkakh = new HargkakhNpc({ scene: this });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=village.js.map