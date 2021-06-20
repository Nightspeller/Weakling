/* eslint-disable no-unused-vars */
import * as Phaser from 'phaser';
import { sceneEvents } from '../../triggers/eventsCenter';

enum ButterflyState
{
  FLYING,
  LANDING,
  SITTING
}

export const enum Direction {
  IDLE_DOWN,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  NONE
}

export default class Butterfly extends Phaser.Physics.Arcade.Sprite {
    public _butterflyColor: string
    private flyPath: {x: number, y: number}[] = []
    private flyToTarget?: {x: number, y: number}

    private currentFlappingFrequency: number
    private currentButterflySpeed: number

    private flappingEvent: Phaser.Time.TimerEvent;
    private speedEvent: Phaser.Time.TimerEvent;
    private landingTime: Phaser.Time.TimerEvent
    private restEvent: Phaser.Time.TimerEvent;

    private _direction = Direction.NONE;
    private _butterflyState = ButterflyState.FLYING

    get butterflyColor() {
      return this._butterflyColor;
    }

    set butterflyColor(butterflyColor: string) {
      this._butterflyColor = butterflyColor;
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number, butterflyColor?: string) {
      super(scene, x, y, texture, frame);

      this._butterflyColor = (butterflyColor === undefined ? 'blue' : butterflyColor);

      this.currentButterflySpeed = 40;
      this.currentFlappingFrequency = 40;

      scene.physics.world.enable(this);
      this.setCollideWorldBounds(true);

      this.setupEvents();
    }

    private setupEvents() {
      this.flappingEvent = this.scene.time.addEvent({
        delay: Phaser.Math.Between(1000, 3000),
        callback: () => {
          this.currentFlappingFrequency = Phaser.Math.Between(50, 70);
          this.anims.msPerFrame = this.currentFlappingFrequency;
        },
        loop: true,
      });

      this.flappingEvent.paused = false;

      this.speedEvent = this.scene.time.addEvent({
        delay: Phaser.Math.Between(800, 2000),
        callback: () => {
          this.currentButterflySpeed = Phaser.Math.Between(35, 55);
        },
        loop: true,
      });

      this.speedEvent.paused = false;

      this.restEvent = this.scene.time.addEvent({
        delay: Phaser.Math.Between(1000, 4000),
        callback: () => {
          this._butterflyState = ButterflyState.FLYING;
        },
        loop: true,
      });

      this.restEvent.paused = true;

      this.landingTime = this.scene.time.addEvent({
        delay: 2000,
        callback: () => {
          this._butterflyState = ButterflyState.SITTING;
          this.landingTime.paused = true;
        },
        loop: false,
      });

      this.landingTime.paused = true;
    }

    flyAlong(path: {x: number, y: number}[]) {
      if (!path || path.length <= 0) {
        return;
      }

      this.flyPath = path;
      this.flyTo(this.flyPath.shift()!);
    }

    private flyTo(target: {x: number, y: number}) {
      this.flyToTarget = target;
    }

    private fly() {
      if (!this.body) {
        return;
      }

      let dx = 0;
      let dy = 0;

      if (this.flyToTarget) {
        dx = this.flyToTarget.x - this.x;
        dy = this.flyToTarget.y - this.y;

        if (Math.abs(dx) < 1) {
          dx = 0;
        }
        if (Math.abs(dy) < 1) {
          dy = 0;
        }
        if (dx === 0 && dy === 0) {
          if (this.flyPath.length > 0) {
            this.flyTo(this.flyPath.shift()!);
            return;
          }

          this.flyToTarget = undefined;
          this._butterflyState = ButterflyState.LANDING;
        }
      }

      this.mimicKeys(dx, dy);
    }

    mimicKeys(dx: number, dy: number) {
      const flyLeft = dx < 0;
      const flyRight = dx > 0;
      const flyUp = dy < 0;
      const flyDown = dy > 0;

      const speed = this.currentButterflySpeed;
      this.anims.play(`butterfly-${this.butterflyColor}-flying`, true);

      if (flyLeft) {
        this._direction = Direction.LEFT;
        this.setAngle(270);
        this.setVelocity(-speed, 0);
      } else if (flyRight) {
        this._direction = Direction.RIGHT;
        this.setAngle(90);
        this.setVelocity(speed, 0);
      } else if (flyUp) {
        this._direction = Direction.UP;
        this.setAngle(0);
        this.setVelocity(0, -speed);
      } else if (flyDown) {
        this._direction = Direction.DOWN;
        this.setAngle(180);
        this.setVelocity(0, speed);
      } else {
        this.setVelocity(0, 0);
      }
    }

    preUpdate(t: number, dt: number) {
      super.preUpdate(t, dt);
      if (!this.body) {
        return;
      }

      switch (this._butterflyState) {
        case ButterflyState.FLYING:
          this.fly();
          break;
        case ButterflyState.LANDING:
          sceneEvents.emit('butterfly-reached-destination-point', this);
          this._butterflyState = ButterflyState.SITTING;
          break;
        case ButterflyState.SITTING:
          this.restEvent.paused = false;
          break;
        default:
      }
    }
}
