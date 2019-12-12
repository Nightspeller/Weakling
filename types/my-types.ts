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
    targetCharacteristic?: string;
    baseDuration: number;
    durationLeft: number;
    currentLevel: number;
    modifierValue?: number;
    modifier?: Modifier;
    source: string;
    statusImage: SpriteParameters;
    applicationCheck: Function;
    setModifier: Function;
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
    noticeable: number;
    actionName: string;
    target: 'self' | 'enemy' | 'friend' | 'any' | 'all' | 'allEnemies' | 'allFriends' | 'party';
    special?: string;
    requires?: string;
    triggers?: { conditionId: string, probability: number, conditionDisplayName: string }[];
}

interface Weapon {
    weaponId: string;
    slot: 'any' | 'anyHand' | 'rightHand' | 'leftHand' | 'twoHands' | 'tail';
    damage: number;
    size: string[];
}

interface Belt {
    beltId: string;
    slot: 'belt';
    additionalCharacteristics: any[];
    quickSlots: number;
    sprite: { key: string; frame: number };
    size: string[];
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

interface EffectModifier {
    type: 'effect';
    value: string[];
}

interface ValueModifier {
    type: 'percent' | 'value';
    value: number;
}

type Modifier = EffectModifier | ValueModifier;