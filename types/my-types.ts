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
    width?: number;
    height?: number;
    flip?: boolean;
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
    sprite: { key: string; frame: number };
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

interface ItemParams {
    itemId: string;
    displayName: string;
    description: string;
    slot: string[];
    sprite: { key: string; frame: number };
    stackable: boolean;
    modified: boolean;
    currentSlot: string;
    quantity?: number;
    specifics?: any;
    sellPrice: number;
    buyPrice: number;
}

interface OverlaySceneOptions {
    backgroundColor?: number;
    backgroundAlpha?: number;
    windowX?: number;
    windowY?: number;
    windowWidth?: number;
    windowHeight?: number;
    borderThickness?: number;
    borderColor?: number;
    borderAlpha?: number;
    baseDepth?: number;
    closeButtonColor?: string;
    closeButtonHoverColor?: string;
    textColor?: string;
}

interface DialogOptions extends OverlaySceneOptions {
    responseTextColor?: string;
    responseTextHoverColor?: string;
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

interface TriggerParams {
    objectLayer?: string,
    objectName: string;
    callback?: Function;
    texture?: string;
    frame?: number;
    interaction?: 'collide' | 'overlap' | 'activate' | 'activateOverlap';
    offsetX?: number;
    offsetY?: number;
}

interface NpcOptions {
    scene: any;
    mapObjectName: string;
    mapObjectLayer?: string;
    name?: string;
    texture?: string;
    frame?: number;
    initDialog?: DialogTree;
    interactionCallback?: Function;
    items?: any[];
}

type Modifier = EffectModifier | ValueModifier;

interface DialogReplay {
    text: string;
    checkCharacteristic?: string;
    checkInventory?: 'keep' | 'remove';
    checkValue?: number | { itemId: string, quantity: number }[];
    successTriggers?: string;
    failureTriggers?: string;
    callbackParam?: string;
}

interface DialogLine {
    id: string;
    text: string;
    replies: DialogReplay[];
}

type DialogTree = DialogLine[];
