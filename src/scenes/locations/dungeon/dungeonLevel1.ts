import GeneralLocation from '../generalLocation';
import BackgroundSoundScene from '../../backgroundSoundScene';

export default class DungeonLevel1Scene extends GeneralLocation {
  constructor() {
    super({ key: 'DungeonLevel1' });
  }

  public preload() {
    super.preload();
  }

  public init(data: any) {
    super.init(data);
  }

  public create() {
    super.create('dungeonLevel1');

    // This is where my current solution for background sound seems to fail - better handling needed...
    const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
    backgroundSoundScene.playBackgroundMusic('caves');

    this.events.on('resume', () => {
      backgroundSoundScene.playBackgroundMusic('caves');
    });

    this.events.on('wake', () => {
      backgroundSoundScene.playBackgroundMusic('caves');
    });
  }

  public update() {
    super.update();
  }

  public switchToScene(...args: any[]) {
    const backgroundSoundScene = this.scene.get('BackgroundSound') as BackgroundSoundScene;
    backgroundSoundScene.playBackgroundMusic('world');
    // @ts-ignore
    super.switchToScene(...args);
  }
}
