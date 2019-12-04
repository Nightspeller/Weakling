interface CharacteristicsSet {
    defences: {
        dodge: number;
        armor: number;
        resistance: {
            fire: number;
            cold: number;
            electricity: number;
            acid: number;
            poison: number;
            magic: number;
        }
    };
    attributes: {
        strength: number;
        agility: number;
        intelligence: number;
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
    actionCost: string;
    actionDescription: string;
    type: 'physical' | 'magic'| 'misc';
    noticeable: string;
    actionName: string;
    target: 'self' | 'enemy' | 'friend' | 'any' | 'all' | 'allEnemies' | 'allFriends' | 'party';
    special?: string;
    requires? :string;
}

interface Weapon {
    weaponId: string;
    slot: 'any'| 'anyHand' | 'rightHand' | 'leftHand' | 'twoHands' | 'tail';
    damage: number;
}