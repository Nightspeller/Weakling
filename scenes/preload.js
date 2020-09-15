import { playerInstance } from "../characters/adventurers/player.js";
import { optionsInstance } from "../config/optionsConfig.js";
import { DEBUG } from "../config/constants.js";
import { createAnimations, preloadAnimationsSpriteSheets } from "./animations.js";
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
        this.load.spritesheet('houses', 'assets/images-extruded/tilesets/houses.png', tilesetConfig);
        this.load.spritesheet('dirt1-dirt2', 'assets/images-extruded/tilesets/dirt1-dirt2.png', tilesetConfig);
        this.load.spritesheet('grass1', 'assets/images-extruded/tilesets/grass1.png', tilesetConfig);
        this.load.spritesheet('grass2', 'assets/images-extruded/tilesets/grass2.png', tilesetConfig);
        this.load.spritesheet('grass3', 'assets/images-extruded/tilesets/grass3.png', tilesetConfig);
        this.load.spritesheet('grass4', 'assets/images-extruded/tilesets/grass4.png', tilesetConfig);
        this.load.spritesheet('long-grass', 'assets/images-extruded/tilesets/long-grass.png', tilesetConfig);
        this.load.spritesheet('dirt1', 'assets/images-extruded/tilesets/dirt1.png', tilesetConfig);
        this.load.spritesheet('dirt2', 'assets/images-extruded/tilesets/dirt2.png', tilesetConfig);
        this.load.spritesheet('dirt4', 'assets/images-extruded/tilesets/dirt4.png', tilesetConfig);
        this.load.spritesheet('water2', 'assets/images-extruded/tilesets/water2.png', tilesetConfig);
        this.load.spritesheet('grass1-dirt1', 'assets/images-extruded/tilesets/grass1-dirt1.png', tilesetConfig);
        this.load.spritesheet('grass1-dirt2', 'assets/images-extruded/tilesets/grass1-dirt2.png', tilesetConfig);
        this.load.spritesheet('grass1-dirt4', 'assets/images-extruded/tilesets/grass1-dirt4.png', tilesetConfig);
        this.load.spritesheet('wall-up', 'assets/images-extruded/tilesets/wall-up.png', tilesetConfig);
        this.load.spritesheet('flowers', 'assets/images-extruded/tilesets/flowers.png', tilesetConfig);
        this.load.spritesheet('castle', 'assets/images-extruded/tilesets/castle.png', tilesetConfig);
        this.load.spritesheet('grassland', 'assets/images-extruded/tilesets/grassland.png', tilesetConfig);
        this.load.spritesheet('caves', 'assets/images-extruded/tilesets/caves.png', tilesetConfig);
        this.load.spritesheet('caves-grassland-entrance', 'assets/images-extruded/tilesets/caves-grassland-entrance.png', tilesetConfig);
        this.load.spritesheet('caves-decoration-animated-b', 'assets/images-extruded/tilesets/caves-decoration-animated-b.png', tilesetConfig);
        // Interface
        this.load.image('interface', 'assets/images/interface/Interface.png');
        this.load.image('interface-24x19', 'assets/images-extruded/interface/interface-24x19.png');
        this.load.image('cave-background', 'assets/images/interface/cave-background.png');
        this.load.image('field-background', 'assets/images/interface/field-background.png');
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
        this.load.spritesheet("martha-pink", "assets/images-extruded/characters/world-map/party/martha-pink.png", tilesetConfig);
        this.load.spritesheet("martha-blond", "assets/images-extruded/characters/world-map/party/martha-blond.png", tilesetConfig);
        this.load.spritesheet("martha-green", "assets/images-extruded/characters/world-map/party/martha-green.png", tilesetConfig);
        this.load.spritesheet("jeremy-pink", "assets/images-extruded/characters/world-map/party/jeremy-pink.png", tilesetConfig);
        this.load.spritesheet("jeremy-blond", "assets/images-extruded/characters/world-map/party/jeremy-blond.png", tilesetConfig);
        this.load.spritesheet("jeremy-green", "assets/images-extruded/characters/world-map/party/jeremy-green.png", tilesetConfig);
        this.load.spritesheet('male3-1', 'assets/images-extruded/characters/world-map/neutral/male3-1.png', tilesetConfig);
        this.load.spritesheet('male10-1', 'assets/images-extruded/characters/world-map/neutral/male10-1.png', tilesetConfig);
        this.load.spritesheet("male12-1", "assets/images-extruded/characters/world-map/neutral/male12-1.png", tilesetConfig);
        this.load.spritesheet('male13-1', 'assets/images-extruded/characters/world-map/neutral/male13-1.png', tilesetConfig);
        this.load.spritesheet('male14-2', 'assets/images-extruded/characters/world-map/neutral/male14-2.png', tilesetConfig);
        this.load.spritesheet("male17-3", "assets/images-extruded/characters/world-map/neutral/male17-3.png", tilesetConfig);
        this.load.spritesheet("male17-4", "assets/images-extruded/characters/world-map/neutral/male17-4.png", tilesetConfig);
        this.load.spritesheet("female05-4", "assets/images-extruded/characters/world-map/neutral/female05-4.png", tilesetConfig);
        this.load.spritesheet("female17-1", "assets/images-extruded/characters/world-map/neutral/female17-1.png", tilesetConfig);
        this.load.spritesheet("female19-1", "assets/images-extruded/characters/world-map/neutral/female19-1.png", tilesetConfig);
        this.load.spritesheet("female19-3", "assets/images-extruded/characters/world-map/neutral/female19-3.png", tilesetConfig);
        this.load.spritesheet("female20-3", "assets/images-extruded/characters/world-map/neutral/female20-3.png", tilesetConfig);
        this.load.spritesheet("female20-3", "assets/images-extruded/characters/world-map/neutral/female20-3.png", tilesetConfig);
        this.load.spritesheet("cat-1", "assets/images-extruded/characters/world-map/neutral/cat-1.png", tilesetConfig);
        this.load.spritesheet("cat-2", "assets/images-extruded/characters/world-map/neutral/cat-2.png", tilesetConfig);
        this.load.spritesheet("cat-3", "assets/images-extruded/characters/world-map/neutral/cat-3.png", tilesetConfig);
        this.load.spritesheet("dog-1", "assets/images-extruded/characters/world-map/neutral/dog-1.png", tilesetConfig);
        this.load.spritesheet("dog-2", "assets/images-extruded/characters/world-map/neutral/dog-2.png", tilesetConfig);
        this.load.spritesheet("dog-3", "assets/images-extruded/characters/world-map/neutral/dog-3.png", tilesetConfig);
        this.load.spritesheet("shadow-1", "assets/images-extruded/characters/world-map/shadows/shadow-1.png", tilesetConfig);
        this.load.spritesheet("fire", "assets/images-extruded/animations/fire.png", tilesetConfig);
        // Battle characters images
        this.load.image('weakling', 'assets/images/characters/battle/party/weakling.png');
        this.load.image('elder', 'assets/images/characters/battle/party/elder.png');
        this.load.image('boar-avatar', 'assets/images/characters/battle/enemies/boar.png');
        this.load.image("dead-character", "assets/images/characters/battle/dead-character.png");
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
        this.load.spritesheet("icon-item-set", "assets/images-extruded/items/icon-item-set.png", tilesetConfig);
        // Animations
        preloadAnimationsSpriteSheets(this);
        this.load.image("hit", "assets/images/animations/hit.png");
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('caltor', 'assets/exported-maps/caltor.json');
        this.load.tilemapTiledJSON('crypt', 'assets/exported-maps/crypt.json');
        this.load.tilemapTiledJSON('house', 'assets/exported-maps/house.json');
        this.load.tilemapTiledJSON('tavern', 'assets/exported-maps/tavern.json');
        this.load.tilemapTiledJSON('booksStore', 'assets/exported-maps/booksStore.json');
        this.load.tilemapTiledJSON('hermitsTower', 'assets/exported-maps/hermitsTower.json');
        this.load.tilemapTiledJSON('honeywood', 'assets/exported-maps/honeywood.json');
        this.load.tilemapTiledJSON('village', 'assets/exported-maps/village.json');
        this.load.tilemapTiledJSON('battle', 'assets/exported-maps/fight.json');
        this.load.tilemapTiledJSON('hargkakhsCave', 'assets/exported-maps/hargkakhsCave.json');
        this.load.tilemapTiledJSON('weaklingsCave', 'assets/exported-maps/weaklingsCave.json');
        this.load.tilemapTiledJSON('eldersCave', 'assets/exported-maps/eldersCave.json');
        this.load.tilemapTiledJSON('nahkhasCave', 'assets/exported-maps/nahkhasCave.json');
        this.load.tilemapTiledJSON('dungeon', 'assets/exported-maps/dungeon.json');
        this.load.tilemapTiledJSON('betweenVillageAndDungeon', 'assets/exported-maps/betweenVillageAndDungeon.json');
        this.load.tilemapTiledJSON('betweenVillageAndCaltor', 'assets/exported-maps/betweenVillageAndCaltor.json');
        this.load.tilemapTiledJSON('backCave', 'assets/exported-maps/backCave.json');
        this.load.tilemapTiledJSON('greatPlains', 'assets/exported-maps/greatPlains.json');
        this.load.tilemapTiledJSON('dungeonLevel1', 'assets/exported-maps/dungeonLevel1.json');
        // Audio
        this.load.audio('intro', ['assets/audio/intro.ogg', 'assets/audio/intro.mp3']);
        this.load.audio('keys-for-success', ['assets/audio/keys-for-success.mp3', 'assets/audio/keys-for-success.ogg']);
        // Atlases
        this.load.atlas('icons-additional', 'assets/images-extruded/interface/icons-additional.png', 'assets/images-extruded/interface/icons-additional.json');
        this.load.atlas('edited', 'assets/images-extruded/interface/edited.png', 'assets/images-extruded/interface/edited.json');
        this.load.atlas('potions', 'assets/images-extruded/items/potions.png', 'assets/images-extruded/items/potions.json');
        this.load.atlas('eggs', 'assets/images-extruded/items/eggs.png', 'assets/images-extruded/items/eggs.json');
    }
    create() {
        optionsInstance.setSoundManager(this);
        if (DEBUG)
            optionsInstance.toggleMusic();
        // @ts-ignore
        createAnimations(this);
        console.log('Preload done, calling Main Menu');
        if (DEBUG) {
            //this.scene.start("Battle", {enemies: [{"type": "ghost-knight"}, {"type": "skeleton"}, {"type": "wizard"}, {"type": "wildBoar"}], background: 'cave-background', prevScene: "Caltor"});
            this.scene.start("Honeywood", { prevScene: this.scene.key });
        }
        else {
            this.scene.start("MainMenu", { prevScene: this.scene.key });
        }
    }
}
//# sourceMappingURL=preload.js.map