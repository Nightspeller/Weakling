import { playerInstance } from "../characters/adventurers/player.js";
import { optionsInstance } from "../config/optionsConfig.js";
export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }
    preload() {
        this.player = playerInstance;
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 70,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 25,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            percentText.setText(Math.floor(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
        const tilesetConfig = {
            frameWidth: 32,
            frameHeight: 32,
            margin: 1,
            spacing: 2
        };
        // Tilesets
        this.load.spritesheet('base', 'assets/images-extruded/tilesets/base.png', tilesetConfig);
        this.load.spritesheet('base-addition', 'assets/images-extruded/tilesets/base-addition.png', tilesetConfig);
        this.load.image('dirt1-dirt2', 'assets/images/tilesets/dirt1-dirt2.png');
        this.load.image('grass1', 'assets/images/tilesets/grass1.png');
        this.load.image('grass4', 'assets/images/tilesets/grass4.png');
        this.load.image('dirt1', 'assets/images/tilesets/dirt1.png');
        this.load.image('dirt2', 'assets/images/tilesets/dirt2.png');
        this.load.spritesheet('dirt4', 'assets/images-extruded/tilesets/dirt4.png', tilesetConfig);
        this.load.spritesheet('water2', 'assets/images-extruded/tilesets/water2.png', tilesetConfig);
        this.load.image('grass1-dirt1', 'assets/images/tilesets/grass1-dirt1.png');
        this.load.image('grass1-dirt2', 'assets/images/tilesets/grass1-dirt2.png');
        this.load.image('grass1-dirt4', 'assets/images/tilesets/grass1-dirt4.png');
        this.load.image('wall-up', 'assets/images/tilesets/wall-up.png');
        this.load.image('flowers', 'assets/images/tilesets/flowers.png');
        this.load.spritesheet('castle', 'assets/images-extruded/tilesets/castle.png', tilesetConfig);
        // Interface
        this.load.image('interface', 'assets/images/interface/Interface.png');
        this.load.image('debug-icon', 'assets/images/interface/debug-icon.png');
        this.load.spritesheet("action-points", "assets/images/interface/action-points.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("icons", 'assets/images/interface/icons-with-background.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('doll', 'assets/images/interface/doll.png');
        this.load.image('inventory-slot', 'assets/images/interface/inventory-slot.png');
        this.load.image('main-menu-background', 'assets/images/interface/main-menu-background.jpg');
        // World characters images
        this.load.spritesheet("martha-pink", "assets/images/characters/world-map/party/martha-pink.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("martha-blond", "assets/images/characters/world-map/party/martha-blond.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("martha-green", "assets/images/characters/world-map/party/martha-green.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("jeremy-pink", "assets/images/characters/world-map/party/jeremy-pink.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("jeremy-blond", "assets/images/characters/world-map/party/jeremy-blond.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("jeremy-green", "assets/images-extruded/characters/world-map/party/jeremy-green.png", tilesetConfig);
        this.load.spritesheet('male13-1', 'assets/images-extruded/characters/world-map/neutral/male13-1.png', tilesetConfig);
        this.load.spritesheet('male14-2', 'assets/images-extruded/characters/world-map/neutral/male14-2.png', tilesetConfig);
        this.load.spritesheet("male17-3", "assets/images-extruded/characters/world-map/neutral/male17-3.png", tilesetConfig);
        this.load.spritesheet("male17-4", "assets/images-extruded/characters/world-map/neutral/male17-4.png", tilesetConfig);
        this.load.spritesheet("female19-1", "assets/images-extruded/characters/world-map/neutral/female19-1.png", tilesetConfig);
        this.load.spritesheet("female19-3", "assets/images-extruded/characters/world-map/neutral/female19-3.png", tilesetConfig);
        this.load.spritesheet("male12-1", "assets/images-extruded/characters/world-map/neutral/male12-1.png", tilesetConfig);
        this.load.spritesheet("female20-3", "assets/images-extruded/characters/world-map/neutral/female20-3.png", tilesetConfig);
        // Battle characters images
        this.load.image('weakling', 'assets/images/characters/battle/party/weakling.png');
        this.load.image('elder', 'assets/images/characters/battle/party/elder.png');
        this.load.image('boar-avatar', 'assets/images/characters/battle/enemies/boar.png');
        this.load.image("dead-character", "assets/images/characters/battle/dead-character.png");
        this.load.spritesheet("wizard-idle", "assets/images/characters/battle/enemies/Wizard/Idle.png", {
            frameWidth: 231,
            frameHeight: 190
        });
        // Items
        this.load.image("rope-belt", "assets/images/items/rope-belt.png");
        this.load.image("bag-green", "assets/images/items/bag-green.png");
        this.load.image("spear-weapon", "assets/images/items/spear-weapon.png");
        this.load.image("allpowerful-necklace", "assets/images/items/allpowerful-necklace.png");
        this.load.spritesheet("potion-sheet", "assets/images/items/potion-sheet.png", {
            frameWidth: 64,
            frameHeight: 64,
            spacing: 1,
            margin: 1
        });
        this.load.spritesheet("icon-item-set", "assets/images/items/icon-item-set.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        // Animations
        this.load.spritesheet("light-pillar", "assets/images/animations/light-pillar/light-pillar-yellow.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("light-pillar-back", "assets/images/animations/light-pillar/light-pillar-yellow-back.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("light-pillar-front", "assets/images/animations/light-pillar/light-pillar-yellow-front.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("wizard-attack1", "assets/images/characters/battle/enemies/Wizard/Attack1.png", {
            frameWidth: 231,
            frameHeight: 190
        });
        this.load.spritesheet("wizard-attack2", "assets/images/characters/battle/enemies/Wizard/Attack2.png", {
            frameWidth: 231,
            frameHeight: 190
        });
        this.load.spritesheet("wizard-hit", "assets/images/characters/battle/enemies/Wizard/Hit.png", {
            frameWidth: 231,
            frameHeight: 190
        });
        this.load.spritesheet("wizard-death", "assets/images/characters/battle/enemies/Wizard/Death.png", {
            frameWidth: 231,
            frameHeight: 190
        });
        this.load.spritesheet("doors2-upscaled", "assets/images/tilesets/doors2-upscaled.png", {
            frameWidth: 32,
            frameHeight: 96
        });
        this.load.image("hit", "assets/images/animations/hit.png");
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('caltor', 'assets/tilemaps/caltor.json');
        this.load.tilemapTiledJSON('house', 'assets/tilemaps/house.json');
        this.load.tilemapTiledJSON('tavern', 'assets/tilemaps/tavern.json');
        this.load.tilemapTiledJSON('hermitsTower', 'assets/tilemaps/hermitsTower.json');
        this.load.tilemapTiledJSON('village', 'assets/tilemaps/village.json');
        this.load.tilemapTiledJSON('battle', 'assets/tilemaps/fight.json');
        this.load.tilemapTiledJSON('hargkakhsCave', 'assets/tilemaps/hargkakhsCave.json');
        this.load.tilemapTiledJSON('weaklingsCave', 'assets/tilemaps/weaklingsCave.json');
        this.load.tilemapTiledJSON('eldersCave', 'assets/tilemaps/eldersCave.json');
        this.load.tilemapTiledJSON('dungeon', 'assets/tilemaps/dungeon.json');
        // Audio
        this.load.audio('intro', [
            'assets/audio/intro.ogg',
            'assets/audio/intro.mp3'
        ]);
        this.load.audio('keys-for-success', [
            'assets/audio/keys-for-success.mp3',
            'assets/audio/keys-for-success.ogg'
        ]);
    }
    create() {
        optionsInstance.setSoundManager(this);
        this.createAnimations();
        console.log('Preload done, calling Main Menu');
        //this.scene.start("Battle", {enemies: [{"type": "wildBoar"}, {"type": "wizard"}, {"type": "wizard"}, {"type": "wildBoar"}], prevScene: "Caltor"});
        this.scene.start("MainMenu", { prevScene: this.scene.key });
    }
    createAnimations() {
        this.anims.create({
            key: 'open_door',
            frames: this.anims.generateFrameNames('doors2-upscaled', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNames(this.player.worldImageSpriteParams.texture, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_up',
            frames: [{ key: this.player.worldImageSpriteParams.texture, frame: 10 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_down',
            frames: [{ key: this.player.worldImageSpriteParams.texture, frame: 1 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_left',
            frames: [{ key: this.player.worldImageSpriteParams.texture, frame: 4 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle_right',
            frames: [{ key: this.player.worldImageSpriteParams.texture, frame: 7 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'light_pillar_animation',
            frames: this.anims.generateFrameNames('light-pillar'),
            duration: 500,
            showOnStart: true,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'light_pillar_animation_back',
            frames: this.anims.generateFrameNames('light-pillar-back'),
            duration: 500,
            showOnStart: true,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'light_pillar_animation_front',
            frames: this.anims.generateFrameNames('light-pillar-front'),
            duration: 500,
            showOnStart: true,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'wizard_idle',
            frames: this.anims.generateFrameNames('wizard-idle'),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'wizard_attack1',
            frames: this.anims.generateFrameNames('wizard-attack1'),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'wizard_attack2',
            frames: this.anims.generateFrameNames('wizard-attack2'),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'wizard_hit',
            frames: this.anims.generateFrameNames('wizard-hit'),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'wizard_death',
            frames: this.anims.generateFrameNames('wizard-death'),
            frameRate: 10,
            repeat: 0
        });
    }
}
//# sourceMappingURL=preload.js.map