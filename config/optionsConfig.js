export class OptionsConfig {
    constructor() {
        this.isMusicOn = true;
        this.isEffectsOn = true;
    }
    toggleMusic() {
        this.isMusicOn = !this.isMusicOn;
        if (this.isMusicOn) {
            this.sound.mute = false;
        }
        else {
            this.sound.mute = true;
        }
        /*this.sound['sounds'].forEach(sound => {
            if (sound.soundType === 'music') {
                this.isMusicOn ? sound.resume() : sound.pause();
            }
        });*/
    }
    toggleEffects() {
        this.isEffectsOn = !this.isEffectsOn;
        this.sound['sounds'].forEach(sound => {
            if (sound.soundType === 'effect') {
                this.isEffectsOn ? sound.resume() : sound.pause();
            }
        });
    }
    setSoundManager(scene) {
        this.sound = scene.sound;
    }
}
export const optionsInstance = new OptionsConfig();
//# sourceMappingURL=optionsConfig.js.map