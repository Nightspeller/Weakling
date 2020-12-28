import { introVillageDialog } from '../../../data/dialogs/introDialog';
import { DEBUG } from '../../../config/constants';
import MoorshNpc from '../../../triggers/npcs/village/moorshNpc';
import NahkhaNpc from '../../../triggers/npcs/village/nahkhaNpc';
import ElderNpc from '../../../triggers/npcs/village/elderNpc';
import MitikhhaNpc from '../../../triggers/npcs/village/mitikhhaNpc';
import WhiskersNpc from '../../../triggers/npcs/village/whiskersNpc';
import TarethNpc from '../../../triggers/npcs/village/tarethNpc';
import KeithNpc from '../../../triggers/npcs/village/keithNpc';
import HargkakhNpc from '../../../triggers/npcs/village/hargkakhNpc';
import GeneralLocation from '../generalLocation';

export default class VillageScene extends GeneralLocation {
  constructor() {
    super({ key: 'Village' });
  }

  public preload() {
    super.preload();
  }

  public init(data: any) {
    super.init(data);
  }

  public create() {
    super.create('village');

    if (!DEBUG) {
      this.switchToScene('Dialog', {
        dialogTree: introVillageDialog,
        closeCallback: () => {
        },
      }, false);
    }

    new ElderNpc({ scene: this });

    new MitikhhaNpc({ scene: this });

    new WhiskersNpc({ scene: this });

    new TarethNpc({ scene: this });

    new KeithNpc({ scene: this });

    new NahkhaNpc({ scene: this });

    new MoorshNpc({ scene: this });

    new HargkakhNpc({ scene: this });
  }

  public update() {
    super.update();
  }
}
