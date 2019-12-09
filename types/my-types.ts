interface CharacteristicsSet {
    defences: {
        dodge: number;
        armor: number;
        fireResistance: number;
        coldResistance: number;
        electricityResistance: number;
        acidResistance: number;
        poisonResistance: number;
        magicResistance: number;
    };
    attributes: {
        strength: number;
        agility: number;
        intelligence: number;
        initiative: number;
    };
    parameters: {
        health: number;
        currentHealth: number;
        manna: number;
        currentManna: number;
        energy: number;
        currentEnergy: number;
    }
}

interface Effect {
    effectId: string;
    name: string;
    description: string;
    type: 'direct' | 'passive' | 'conditional'
    targetCharacteristic: string;
    baseDuration: number;
    levels: object,
    durationLeft: number;
    currentLevel: number;
    modifierValue?: number;
    source: string;
    statusImage: SpriteParameters;
}

interface SpriteParameters {
    texture: string;
    frame: number | string;
}

interface Action {
    phase: ('preparation' | 'battle')[];
    effect: { effectId: string; source: string; level: number }[];
    actionId: string;
    actionCost: number;
    actionDescription: string;
    type: 'physical' | 'magical' | 'misc';
    noticeable: string;
    actionName: string;
    target: 'self' | 'enemy' | 'friend' | 'any' | 'all' | 'allEnemies' | 'allFriends' | 'party';
    special?: string;
    requires?: string;
}

interface Weapon {
    weaponId: string;
    slot: 'any' | 'anyHand' | 'rightHand' | 'leftHand' | 'twoHands' | 'tail';
    damage: number;
}

interface DialogOptions {
    borderThickness?: number;
    borderColor?: number;
    borderAlpha?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
    closeButtonColor?: string;
    closeButtonHoverColor?: string;
    dialogY?: number;
    dialogX?: number;
    dialogHeight?: number;
    dialogWidth?: number;
    textColor?: string;
    letterAppearanceDelay?: number;
}