import GeneralLocation from '../generalLocation';
import Trigger from '../../../triggers/trigger';
import StrangerNpc from '../../../triggers/npcs/caltor/strangerNpc';
import BodgerNpc from '../../../triggers/npcs/caltor/bodgerNpc';
import BaelinNpc from '../../../triggers/npcs/caltor/baelinNpc';
import AnnouncementsDeskNpc from '../../../triggers/npcs/caltor/announcementsDeskNpc';
import KasimaNpc from '../../../triggers/npcs/caltor/kasimaNpc';
import FountainNpc from '../../../triggers/npcs/caltor/fountainNpc';
import FionaNpc from '../../../triggers/npcs/caltor/fionaNpc';

export default class CaltorScene extends GeneralLocation {
  constructor() {
    super({ key: 'Caltor' });
  }

  public preload() {
    super.preload();
  }

  public init(data: { toCoordinates: { x: number; y: number; }; }) {
    super.init(data);
  }

  public create() {
    super.create('caltor');

    let layer4visible = true;
    const barracksMapObject = this.getMapObject('Barracks');
    new Trigger({
      scene: this,
      name: barracksMapObject.name,
      triggerX: barracksMapObject.x,
      triggerY: barracksMapObject.y,
      triggerW: barracksMapObject.width,
      triggerH: barracksMapObject.height,
      interaction: 'overlap',
      callback: () => {
        if (layer4visible) {
          this.layers.find((layer) => layer.layer.name === 'Barracks Roof').setVisible(false);
          layer4visible = false;
        }
      },
    });

    new StrangerNpc({ scene: this });

    new BodgerNpc({ scene: this });

    new BaelinNpc({ scene: this });

    new AnnouncementsDeskNpc({ scene: this });

    new KasimaNpc({ scene: this });

    new FionaNpc({ scene: this });

    new FountainNpc({ scene: this });

    this.events.on('resume', (/* scene, data */) => {
      if (this.player.defeatedEnemies.includes('caltor/Boars 1') && this.player.defeatedEnemies.includes('caltor/Boars 2')) {
        this.player.updateQuest('boarsAtTheFields', 'boarsKilled');
      }
    });
  }

  public update() {
    super.update();
  }
}
