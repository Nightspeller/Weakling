export const weapons: {[key: string]: Weapon} = {
    fist: {
        weaponId: 'fist',
        damage: 10,
        slot: 'anyHand'
    }
};

export const belts: {[key: string]: Belt} = {
    rope: {
        beltId: 'rope',
        additionalCharacteristics: [],
        quickSlots: 2,
        slot: 'belt',
        sprite: {key: 'rope-belt', frame: null}
    }
};