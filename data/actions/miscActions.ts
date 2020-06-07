import {generatePotionActions} from "../../helpers/helperFunctions.js";

const healthPotionActions = generatePotionActions('health');
const energyPotionActions = generatePotionActions('energy');
const mannaPotionActions = generatePotionActions('manna');
const strengthPotionActions = generatePotionActions('strength');

export const miscActions: { [key: string]: ActionData } = {
    ...healthPotionActions,
    ...energyPotionActions,
    ...mannaPotionActions,
    ...strengthPotionActions,
    inspectEnemy: {
        actionId: 'inspectEnemy',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Inspect enemy',
        actionDescription: 'Spend some time learning about your enemy to make better decisions later',
        effectsDescriptions: [{
            effectId: 'intelligence',
            strength: 1
        }],
        target: 'enemy',
        actionCost: 0.5,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 167},
        parametersCost: {},
    },
    meditate: {
        actionId: 'meditate',
        phase: ['preparation'],
        type: 'misc',
        actionName: 'Meditate',
        actionDescription: 'Clear your mind, balance and expand your energies',
        effectsDescriptions: [{
            effectId: 'addManna',
            strength: 1
        }, {
            effectId: 'addEnergy',
            strength: 1
        }],
        target: 'self',
        actionCost: 1,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'edited', frame: 'Meditation'},
        parametersCost: {},
    },
    accessInventory: {
        actionId: 'accessInventory',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Access inventory',
        actionDescription: 'Sometimes even in the heat of the battle you absolutely have to do it.\nFree during the Preparation.',
        effectsDescriptions: [],
        target: 'self',
        actionCost: 1,
        noticeable: 0,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 137},
        parametersCost: {},
    },
    retreat: {
        actionId: 'retreat',
        phase: ['preparation', 'battle'],
        type: 'misc',
        actionName: 'Retreat!',
        actionDescription: 'For Kobolds, retreat is just a fancy way to say RUN AWAY!\nFree during the Preparation.',
        effectsDescriptions: [],
        target: 'self',
        actionCost: 3,
        noticeable: 1,
        animation: 'castBuff',
        icon: {texture: 'edited', frame: 'Running'},
        parametersCost: {},
    },
    enrage: {
        actionId: 'enrage',
        phase: ['battle'],
        type: 'misc',
        actionName: 'Enrage',
        actionDescription: 'Character gets really angry, loosing the ability to think straight, but gaining extra strength',
        effectsDescriptions: [{
            effectId: 'addStrength',
            strength: 1
        }, {
            effectId: 'intelligenceDown',
            strength: 1
        }],
        target: 'self',
        actionCost: 0.5,
        noticeable: 1,
        animation: 'castBuff',
        icon: {texture: 'icon-item-set', frame: 59},
        parametersCost: {energy: 3},
    },
};
