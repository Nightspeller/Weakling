import {Player} from "../characters/adventurers/player.js";

export function preloadAnimationsSpriteSheets(scene: Phaser.Scene) {
    scene.load.spritesheet("light-pillar", "assets/images/animations/light-pillar/light-pillar-yellow.png", {
        frameWidth: 192,
        frameHeight: 192
    });
    scene.load.spritesheet("light-pillar-back", "assets/images/animations/light-pillar/light-pillar-yellow-back.png", {
        frameWidth: 192,
        frameHeight: 192
    });
    scene.load.spritesheet("light-pillar-front", "assets/images/animations/light-pillar/light-pillar-yellow-front.png", {
        frameWidth: 192,
        frameHeight: 192
    });
    // Eyeball
    scene.load.spritesheet("eyeball-idle", "assets/images/characters/battle/party/eyeball/Flight.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("eyeball-attack", "assets/images/characters/battle/party/eyeball/Attack.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("eyeball-hit", "assets/images/characters/battle/party/eyeball/Hit.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("eyeball-death", "assets/images/characters/battle/party/eyeball/Death.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    // Skeleton
    scene.load.spritesheet("skeleton-idle", "assets/images/characters/battle/enemies/skeleton/Idle.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("skeleton-move", "assets/images/characters/battle/enemies/skeleton/Walk.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("skeleton-attack", "assets/images/characters/battle/enemies/skeleton/Attack.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("skeleton-shield", "assets/images/characters/battle/enemies/skeleton/Shield.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("skeleton-hit", "assets/images/characters/battle/enemies/skeleton/Take Hit.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    scene.load.spritesheet("skeleton-death", "assets/images/characters/battle/enemies/skeleton/Death.png", {
        frameWidth: 150,
        frameHeight: 150
    });
    // Wizard
    scene.load.spritesheet("wizard-idle", "assets/images/characters/battle/enemies/Wizard/Idle.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-move", "assets/images/characters/battle/enemies/Wizard/Run.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-attack1", "assets/images/characters/battle/enemies/Wizard/Attack1.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-attack2", "assets/images/characters/battle/enemies/Wizard/Attack2.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-hit", "assets/images/characters/battle/enemies/Wizard/Hit.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    scene.load.spritesheet("wizard-death", "assets/images/characters/battle/enemies/Wizard/Death.png", {
        frameWidth: 231,
        frameHeight: 190
    });
    // Ghost Knight
    scene.load.spritesheet("ghost-knight-idle", "assets/images/characters/battle/enemies/ghost-knight/Idle.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-move", "assets/images/characters/battle/enemies/ghost-knight/Run.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-attack1", "assets/images/characters/battle/enemies/ghost-knight/Attack1.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-attack2", "assets/images/characters/battle/enemies/ghost-knight/Attack2.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-hit", "assets/images/characters/battle/enemies/ghost-knight/Hit.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    scene.load.spritesheet("ghost-knight-death", "assets/images/characters/battle/enemies/ghost-knight/Death.png", {
        frameWidth: 180,
        frameHeight: 180
    });
    // Doors
    scene.load.spritesheet("doors2-upscaled", "assets/images/tilesets/doors2-upscaled.png", {
        frameWidth: 32,
        frameHeight: 96
    });
}

export function createAnimations(scene: Phaser.Scene & {player: Player}) {
    scene.anims.create({
        key: 'open_door',
        frames: scene.anims.generateFrameNames('doors2-upscaled', {start: 6, end: 8}),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'walk_down',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 0, end: 2}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_up',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 18, end: 20}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_right',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 6, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'walk_left',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 12, end: 14}),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'attack_down',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 3, end: 5}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'attack_up',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 21, end: 23}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'attack_right',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 9, end: 11}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'attack_left',
        frames: scene.anims.generateFrameNames(scene.player.worldImageSpriteParams.texture, {start: 15, end: 17}),
        frameRate: 5
    });
    scene.anims.create({
        key: 'idle_up',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 19}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'idle_down',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 1}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'idle_left',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 13}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'idle_right',
        frames: [{key: scene.player.worldImageSpriteParams.texture, frame: 7}],
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'light_pillar_animation',
        frames: scene.anims.generateFrameNames('light-pillar'),
        duration: 500,
        showOnStart: true,
        hideOnComplete: true
    });
    scene.anims.create({
        key: 'light_pillar_animation_back',
        frames: scene.anims.generateFrameNames('light-pillar-back'),
        duration: 500,
        showOnStart: true,
        hideOnComplete: true
    });
    scene.anims.create({
        key: 'light_pillar_animation_front',
        frames: scene.anims.generateFrameNames('light-pillar-front'),
        duration: 500,
        showOnStart: true,
        hideOnComplete: true
    });
    scene.anims.create({
        key: 'wizard_idle',
        frames: scene.anims.generateFrameNames('wizard-idle'),
        frameRate: 5,
        repeat: -1
    });
    scene.anims.create({
        key: 'wizard_move',
        frames: scene.anims.generateFrameNames('wizard-move'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'wizard_attack1',
        frames: scene.anims.generateFrameNames('wizard-attack1'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'wizard_attack2',
        frames: scene.anims.generateFrameNames('wizard-attack2'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'wizard_hit',
        frames: scene.anims.generateFrameNames('wizard-hit'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'wizard_death',
        frames: scene.anims.generateFrameNames('wizard-death'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_idle',
        frames: scene.anims.generateFrameNames('ghost-knight-idle'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'ghost-knight_move',
        frames: scene.anims.generateFrameNames('ghost-knight-move'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'ghost-knight_attack1',
        frames: scene.anims.generateFrameNames('ghost-knight-attack1'),
        frameRate: 5,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_attack2',
        frames: scene.anims.generateFrameNames('ghost-knight-attack2'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_hit',
        frames: scene.anims.generateFrameNames('ghost-knight-hit'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'ghost-knight_death',
        frames: scene.anims.generateFrameNames('ghost-knight-death'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_idle',
        frames: scene.anims.generateFrameNames('eyeball-idle'),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: 'eyeball_attack1',
        frames: scene.anims.generateFrameNames('eyeball-attack'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_buff',
        frames: scene.anims.generateFrameNames('eyeball-attack').reverse(),
        frameRate: 5,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_hit',
        frames: scene.anims.generateFrameNames('eyeball-hit'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'eyeball_death',
        frames: scene.anims.generateFrameNames('eyeball-death'),
        frameRate: 10,
        repeat: 0
    });
    createSkeletonAnimations(scene);
}

function createSkeletonAnimations(scene: Phaser.Scene) {
    scene.anims.create({
        key: 'skeleton_idle',
        frames: scene.anims.generateFrameNames('skeleton-idle'),
        frameRate: 3,
        repeat: -1
    });
    scene.anims.create({
        key: 'skeleton_move',
        frames: scene.anims.generateFrameNames('skeleton-move'),
        frameRate: 15,
        repeat: -1
    });
    scene.anims.create({
        key: 'skeleton_attack1',
        frames: scene.anims.generateFrameNames('skeleton-attack'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'skeleton_attack2',
        frames: scene.anims.generateFrameNames('skeleton-shield'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'skeleton_buff',
        frames: scene.anims.generateFrameNames('skeleton-attack').reverse(),
        frameRate: 5,
        repeat: 0
    });
    scene.anims.create({
        key: 'skeleton_hit',
        frames: scene.anims.generateFrameNames('skeleton-hit'),
        frameRate: 10,
        repeat: 0
    });
    scene.anims.create({
        key: 'skeleton_death',
        frames: scene.anims.generateFrameNames('skeleton-death'),
        frameRate: 10,
        repeat: 0
    });


    //Texture keys
    const cat1TextureKey = 'cat-1'
    const cat2TextureKey = 'cat-2'
    const cat3TextureKey = 'cat-3'

    const dog1TextureKey = 'dog-1'
    const dog2TextureKey = 'dog-2'
    const dog3TextureKey = 'dog-3'

    const female1 = 'female05-4'
    const female2 = 'female17-1'
    const female3 = 'female18-4'
    const female4 = 'female19-1'
    const female5 = 'female19-3'
    const female6 = 'female20-3'

    const male1 = 'male3-1'
    const male2 = 'male10-1'
    const male3 = 'male12-1'
    const male4 = 'male13-1'
    const male5 = 'male14-2'
    const male6 = 'male17-3'
    const male7 = 'male17-4'

    //const farmerKeithTextureKey = 'male14-2'

    //cat 1
    scene.anims.create({
        key: cat1TextureKey + '-idle-up',
        frames: [{ key: cat1TextureKey, frame: 10 }]
    })

    scene.anims.create({
        key: cat1TextureKey + '-idle-down',
        frames: [{ key: cat1TextureKey, frame: 1 }]
    })

    scene.anims.create({
        key: cat1TextureKey + '-idle-left',
        frames: [{ key: cat1TextureKey, frame: 4 }]
    })

    scene.anims.create({
        key: cat1TextureKey + '-idle-right',
        frames: [{ key: cat1TextureKey, frame: 7 }]
    })


    //cat 2
    scene.anims.create({
        key: cat2TextureKey + '-idle-up',
        frames: [{ key: cat2TextureKey, frame: 10 }]
    })

    scene.anims.create({
        key: cat1TextureKey + '-idle-down',
        frames: [{ key: cat2TextureKey, frame: 1 }]
    })

    scene.anims.create({
        key: cat2TextureKey + '-idle-left',
        frames: [{ key: cat2TextureKey, frame: 4 }]
    })

    scene.anims.create({
        key: cat2TextureKey + '-idle-right',
        frames: [{ key: cat2TextureKey, frame: 7 }]
    })

    
    //cat 3
    scene.anims.create({
        key: cat3TextureKey + '-idle-up',
        frames: [{ key: cat3TextureKey, frame: 10 }]
    })

    scene.anims.create({
        key: cat3TextureKey + '-idle-down',
        frames: [{ key: cat3TextureKey, frame: 1 }]
    })

    scene.anims.create({
        key: cat3TextureKey + '-idle-left',
        frames: [{ key: cat3TextureKey, frame: 4 }]
    })

    scene.anims.create({
        key: cat3TextureKey + '-idle-right',
        frames: [{ key: cat3TextureKey, frame: 7 }]
    })

    //dog 1
    scene.anims.create({
        key: dog1TextureKey + '-idle-up',
        frames: [{ key: dog1TextureKey, frame: 10 }]
    })

    scene.anims.create({
        key: dog1TextureKey + '-idle-down',
        frames: [{ key: dog1TextureKey, frame: 1 }]
    })

    scene.anims.create({
        key: dog1TextureKey + '-idle-left',
        frames: [{ key: dog1TextureKey, frame: 4 }]
    })

    scene.anims.create({
        key: dog1TextureKey + '-idle-right',
        frames: [{ key: dog1TextureKey, frame: 7 }]
    })

    
    // dog 2
    scene.anims.create({
        key: dog2TextureKey + '-idle-up',
        frames: [{ key: dog2TextureKey, frame: 10 }]
    })

    scene.anims.create({
        key: dog2TextureKey + '-idle-down',
        frames: [{ key: dog2TextureKey, frame: 1 }]
    })

    scene.anims.create({
        key: dog2TextureKey + '-idle-left',
        frames: [{ key: dog2TextureKey, frame: 4 }]
    })

    scene.anims.create({
        key: dog2TextureKey + '-idle-right',
        frames: [{ key: dog2TextureKey, frame: 7 }]
    })



    // dog 3 
    scene.anims.create({
        key: dog3TextureKey + '-idle-up',
        frames: [{ key: dog3TextureKey, frame: 10 }]
    })

    scene.anims.create({
        key: dog3TextureKey + '-idle-down',
        frames: [{ key: dog3TextureKey, frame: 1 }]
    })

    scene.anims.create({
        key: dog3TextureKey + '-idle-left',
        frames: [{ key: dog3TextureKey, frame: 4 }]
    })

    scene.anims.create({
        key: dog3TextureKey + '-idle-right',
        frames: [{ key: dog3TextureKey, frame: 7 }]
    })

    // female 1
    scene.anims.create({
        key: female1 + '-idle-up',
        frames: [{ key: female1, frame: 10 }]
    })

    scene.anims.create({
        key: female1 + '-idle-down',
        frames: [{ key: female1, frame: 1 }]
    })

    scene.anims.create({
        key: female1 + '-idle-left',
        frames: [{ key: female1, frame: 4 }]
    })

    scene.anims.create({
        key: female1 + '-idle-right',
        frames: [{ key: female1, frame: 7 }]
    })

    // female 2
    scene.anims.create({
        key: female2 + '-idle-up',
        frames: [{ key: female2, frame: 10 }]
    })

    scene.anims.create({
        key: female2 + '-idle-down',
        frames: [{ key: female2, frame: 1 }]
    })

    scene.anims.create({
        key: female2 + '-idle-left',
        frames: [{ key: female2, frame: 4 }]
    })

    scene.anims.create({
        key: female2 + '-idle-right',
        frames: [{ key: female2, frame: 7 }]
    })
    
    // female 3
    scene.anims.create({
        key: female3 + '-idle-up',
        frames: [{ key: female3, frame: 10 }]
    })

    scene.anims.create({
        key: female3 + '-idle-down',
        frames: [{ key: female3, frame: 1 }]
    })

    scene.anims.create({
        key: female3 + '-idle-left',
        frames: [{ key: female3, frame: 4 }]
    })

    scene.anims.create({
        key: female3 + '-idle-right',
        frames: [{ key: female3, frame: 7 }]
    })
    
   
    // female 4
    scene.anims.create({
        key: female4 + '-idle-up',
        frames: [{ key: female4, frame: 10 }]
    })

    scene.anims.create({
        key: female4 + '-idle-down',
        frames: [{ key: female4, frame: 1 }]
    })

    scene.anims.create({
        key: female4 + '-idle-left',
        frames: [{ key: female4, frame: 4 }]
    })

    scene.anims.create({
        key: female4 + '-idle-right',
        frames: [{ key: female4, frame: 7 }]
    })

    //female 5
    scene.anims.create({
        key: female5 + '-idle-up',
        frames: [{ key: female5, frame: 10 }]
    })

    scene.anims.create({
        key: female5 + '-idle-down',
        frames: [{ key: female5, frame: 1 }]
    })

    scene.anims.create({
        key: female5 + '-idle-left',
        frames: [{ key: female5, frame: 4 }]
    })

    scene.anims.create({
        key: female5 + '-idle-right',
        frames: [{ key: female5, frame: 7 }]
    })

    //female 6
    scene.anims.create({
        key: female6 + '-idle-up',
        frames: [{ key: female6, frame: 10 }]
    })

    scene.anims.create({
        key: female6 + '-idle-down',
        frames: [{ key: female6, frame: 1 }]
    })

    scene.anims.create({
        key: female6 + '-idle-left',
        frames: [{ key: female6, frame: 4 }]
    })

    scene.anims.create({
        key: female6 + '-idle-right',
        frames: [{ key: female6, frame: 7 }]
    })

    //male 1
    scene.anims.create({
        key: male1 + '-idle-up',
        frames: [{ key: male1, frame: 10 }]
    })

    scene.anims.create({
        key: male1 + '-idle-down',
        frames: [{ key: male1, frame: 1 }]
    })

    scene.anims.create({
        key: male1 + '-idle-left',
        frames: [{ key: male1, frame: 4 }]
    })

    scene.anims.create({
        key: male1 + '-idle-right',
        frames: [{ key: male1, frame: 7 }]
    })

    //male 2
    scene.anims.create({
        key: male2 + '-idle-up',
        frames: [{ key: male2, frame: 10 }]
    })

    scene.anims.create({
        key: male2 + '-idle-down',
        frames: [{ key: male2, frame: 1 }]
    })

    scene.anims.create({
        key: male2 + '-idle-left',
        frames: [{ key: male2, frame: 4 }]
    })

    scene.anims.create({
        key: male2 + '-idle-right',
        frames: [{ key: male2, frame: 7 }]
    })

    //male 3
    scene.anims.create({
        key: male3 + '-idle-up',
        frames: [{ key: male3, frame: 10 }]
    })

    scene.anims.create({
        key: male3 + '-idle-down',
        frames: [{ key: male3, frame: 1 }]
    })

    scene.anims.create({
        key: male3 + '-idle-left',
        frames: [{ key: male3, frame: 4 }]
    })

    scene.anims.create({
        key: male3 + '-idle-right',
        frames: [{ key: male3, frame: 7 }]
    })

    //male 4
    scene.anims.create({
        key: male4 + '-idle-up',
        frames: [{ key: male4, frame: 10 }]
    })

    scene.anims.create({
        key: male4 + '-idle-down',
        frames: [{ key: male4, frame: 1 }]
    })

    scene.anims.create({
        key: male4 + '-idle-left',
        frames: [{ key: male4, frame: 4 }]
    })

    scene.anims.create({
        key: male4 + '-idle-right',
        frames: [{ key: male4, frame: 7 }]
    })

    //male 5
    scene.anims.create({
        key: male5 + '-idle-up',
        frames: [{ key: male5, frame: 10 }]
    })

    scene.anims.create({
        key: male5 + '-idle-down',
        frames: [{ key: male5, frame: 1 }]
    })

    scene.anims.create({
        key: male5 + '-idle-left',
        frames: [{ key: male5, frame: 4 }]
    })

    scene.anims.create({
        key: male5 + '-idle-right',
        frames: [{ key: male5, frame: 7 }]
    })
    
    //male 6
    scene.anims.create({
        key: male6 + '-idle-up',
        frames: [{ key: male6, frame: 10 }]
    })

    scene.anims.create({
        key: male6 + '-idle-down',
        frames: [{ key: male6, frame: 1 }]
    })

    scene.anims.create({
        key: male6 + '-idle-left',
        frames: [{ key: male6, frame: 4 }]
    })

    scene.anims.create({
        key: male6 + '-idle-right',
        frames: [{ key: male6, frame: 7 }]
    })
    
    //male 7
    scene.anims.create({
        key: male7 + '-idle-up',
        frames: [{ key: male7, frame: 10 }]
    })

    scene.anims.create({
        key: male7 + '-idle-down',
        frames: [{ key: male7, frame: 1 }]
    })

    scene.anims.create({
        key: male7 + '-idle-left',
        frames: [{ key: male7, frame: 4 }]
    })

    scene.anims.create({
        key: male7 + '-idle-right',
        frames: [{ key: male7, frame: 7 }]
    })
}
