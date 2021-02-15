// @ts-ignore
import { TextArea } from 'phaser3-rex-plugins/templates/ui/ui-components';
import BattleScene from './battle';
import { GAME_H, GAME_W } from '../../config/constants';

export default class BattleLogDrawer {
  private scene: BattleScene;
  private logs: string[];
  private readonly textArea: any;

  constructor(battleScene: any) {
    this.scene = battleScene;
    this.logs = [];

    this.textArea = new TextArea(this.scene, {
      x: GAME_W / 2,
      y: GAME_H - 24,
      width: GAME_W - 16 - 16,
      height: 32,
      background: this.scene.add.rectangle(0, 0, GAME_W - 16 - 16, 32, 0xf0d191),
      // @ts-ignore
      text: this.scene.add.text().setColor('#000000'),
      scroller: {
        threshold: 10,
        slidingDeceleration: 5000,
        backDeceleration: 2000,
      },
    }).layout().setDepth(100);
    this.scene.add.existing(this.textArea);

    this._setupLogToggle();
  }

  public addLogEntry(entry: string) {
    this.logs.push(entry);
    this.textArea.setText(this.logs.join('\n')).scrollToBottom();
  }

  private _setupLogToggle() {
    let collapsed = true;

    this.scene.add.sprite(GAME_W - 32, GAME_H - 24, 'icons', 'icons/books-and-scrolls/scroll-opened')
      .setDepth(101)
      .setInteractive()
      .on('pointerdown', () => {
        if (collapsed) {
          this.textArea
            .setPosition(GAME_W / 2, GAME_H - 32 * 4 - 8)
            .setMinSize(GAME_W - 16 - 16, 32 * 8)
            .layout()
            .scrollToBottom();
          collapsed = false;
        } else {
          this.textArea
            .setPosition(GAME_W / 2, GAME_H - 24)
            .setMinSize(GAME_W - 16 - 16, 32)
            .layout()
            .scrollToBottom();
          collapsed = true;
        }
      });
  }
}
