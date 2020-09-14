interface CharacteristicsSet {
        dodge: number;
        armor: number;
        fireResistance: number;
        coldResistance: number;
        electricityResistance: number;
        acidResistance: number;
        poisonResistance: number;
        magicResistance: number;
        strength: number;
        agility: number;
        intelligence: number;
        initiative: number;
        health: number;
        manna: number;
        energy: number;
}

type Modifier = EffectModifier | ValueModifier;

interface EffectModifier {
    type: 'effect';
    value: string[];
}

interface ValueModifier {
    type: 'percent' | 'value';
    value: number;
}

interface EffectData {
    effectId: string;
    name: string;
    description: string;
    type: 'direct' | 'passive' | 'conditional';
    targetCharacteristic?: string;
    baseDuration: number;
    durationLeft: number;
    strength: 1 | 2 | 3 | 4 | 5;
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
    animation?: string;
}

interface ActionData {
    phase: ('preparation' | 'battle')[];
    effectsDescriptions: { effectId: string; strength: 1 | 2 | 3 | 4 | 5 }[];
    effects?: EffectData[];
    actionId: string;
    actionCost: number;
    actionDescription: string;
    type: 'physical' | 'magical' | 'misc';
    noticeable: number;
    actionName: string;
    target: 'self' | 'enemy' | 'friend' | 'any' | 'all' | 'allEnemies' | 'allFriends' | 'party';
    special?: string;
    consumes?: string;
    triggers?: { conditionId: string, probability: number, conditionDisplayName: string }[];
    animation: 'meleeAttack' | 'castAttack' | 'castBuff';
    icon?: SpriteParameters;
    parametersCost?: {energy?: number, manna?: number};
}

interface Belt {
    beltId: string;
    slot: 'belt';
    additionalCharacteristics: any[];
    quickSlots: number;
    sprite: SpriteParameters;
    size: string[];
}

interface ItemData {
    itemId: string;
    displayName: string;
    description: string;
    possibleSlots: Slots[];
    sprite: SpriteParameters;
    stackable: boolean;
    modified: boolean;
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

type Slots = 'rightHand' | 'leftHand' | 'belt' | 'head' | 'neck' | 'ringLeft' | 'ringRight' | 'body' | 'cape' | 'gloves' | 'tail' | 'pants' | 'boots' | 'bag' |
                'quickSlot' | `quickSlot0` | `quickSlot1` | `quickSlot2` | `quickSlot3` | `quickSlot4` |
                'backpack0_0' | 'backpack1_0' | 'backpack2_0' | 'backpack3_0' | 'backpack4_0' |
                'backpack0_1' | 'backpack1_1' | 'backpack2_1' | 'backpack3_1' | 'backpack4_1' |
                'backpack0_2' | 'backpack1_2' | 'backpack2_2' | 'backpack3_2' | 'backpack4_2' |
                'backpack0_3' | 'backpack1_3' | 'backpack2_3' | 'backpack3_3' | 'backpack4_3' |
                'backpack0_4' | 'backpack1_4' | 'backpack2_4' | 'backpack3_4' | 'backpack4_4' |
                'containerSlot0_0' | 'containerSlot1_0' | 'containerSlot2_0' | 'containerSlot3_0' | 'containerSlot4_0' |
                'containerSlot0_1' | 'containerSlot1_1' | 'containerSlot2_1' | 'containerSlot3_1' | 'containerSlot4_1' |
                'containerSlot0_2' | 'containerSlot1_2' | 'containerSlot2_2' | 'containerSlot3_2' | 'containerSlot4_2' |
                'componentSlot0' | 'componentSlot1' | 'componentSlot2' | 'componentSlot3' | 'componentSlot4' | 'vesselSlot' | 'resultSlot' |
                'dropSlot';

interface Quest {
    questId: string;
    questName: string;
    questReward: { items: {itemId: string; quantity: number}[], xp: number, text?: string }
    availableStates: {[key: string]: string}
    currentStates: string[];
}

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
