export const recipes = {
    'small-weak-health-potion': {
        component1: [{id: 'sourgrass', quantity: 1}, {id: 'rocky-rose-flower', quantity: 1}],
        component2: [{id: 'primula-flower', quantity: 1}],
        component3: [],
        process: {id: 'heat', level: 'minor'},
        vessel: 'small-bottle',
        result: {id: 'small-weak-health-potion', quantity: 1}
    },
    'medium-weak-health-potion': {
        component1: [{id: 'sourgrass', quantity: 2}, {id: 'rocky-rose-flower', quantity: 1}],
        component2: [{id: 'primula-flower', quantity: 1}],
        component3: [],
        process: {id: 'heat', level: 'minor'},
        vessel: 'medium-bottle',
        result: {id: 'medium-weak-health-potion', quantity: 1}
    },
    'big-weak-health-potion': {
        component1: [{id: 'sourgrass', quantity: 3}, {id: 'rocky-rose-flower', quantity: 2}],
        component2: [{id: 'primula-flower', quantity: 2}],
        component3: [],
        process: {id: 'heat', level: 'minor'},
        vessel: 'big-bottle',
        result: {id: 'big-weak-health-potion', quantity: 1}
    },
    'giant-weak-health-potion': {
        component1: [{id: 'sourgrass', quantity: 4}, {id: 'rocky-rose-flower', quantity: 2}],
        component2: [{id: 'primula-flower', quantity: 2}],
        component3: [],
        process: {id: 'heat', level: 'minor'},
        vessel: 'giant-bottle',
        result: {id: 'giant-weak-health-potion', quantity: 1}
    },
    'medium-weak-strength-potion': {
        component1: [{id: 'rocky-rose-flower', quantity: 1}],
        component2: [{id: 'carrot', quantity: 2}],
        component3: [],
        process: {id: 'heat', level: 'minor'},
        vessel: 'medium-bottle',
        result: {id: 'medium-weak-strength-potion', quantity: 1}
    },
    'medium-weak-energy-potion': {
        component1: [{id: 'pumpkin-seeds', quantity: 2}],
        component2: [{id: 'carrot', quantity: 2}],
        component3: [],
        process: {id: 'heat', level: 'minor'},
        vessel: 'medium-bottle',
        result: {id: 'medium-weak-energy-potion', quantity: 1}
    },
    'bone-dust': {
        component1: [{id: 'bone', quantity: 1}],
        component2: [],
        component3: [],
        process: {id: 'heat', level: 'minor'},
        vessel: undefined,
        result: {id: 'bone-dust', quantity: 2}
    },
}

const recepies_test = {
    'health-potion': {
        'weak': {
            'small': {
                component1: [{id: 'sourgrass', quantity: 1}, {id: 'rocky-rose-flower', quantity: 1}],
                component2: [{id: 'primula-flower', quantity: 1}],
                component3: [],
                process: {id: 'heat', level: 'minor'},
                vessel: 'small-bottle',
                result: 'small-weak-health-potion'
            },
            'medium': {
                component1: [{id: 'sourgrass', quantity: 2}, {id: 'rocky-rose-flower', quantity: 1}],
                component2: [{id: 'primula-flower', quantity: 1}],
                component3: [],
                process: {id: 'heat', level: 'minor'},
                vessel: 'medium-bottle',
                result: 'medium-weak-health-potion'
            },
            'big': {
                component1: [{id: 'sourgrass', quantity: 3}, {id: 'rocky-rose-flower', quantity: 2}],
                component2: [{id: 'primula-flower', quantity: 2}],
                component3: [],
                process: {id: 'heat', level: 'minor'},
                vessel: 'big-bottle',
                result: 'big-weak-health-potion'
            },
            'giant': {
                component1: [{id: 'sourgrass', quantity: 4}, {id: 'rocky-rose-flower', quantity: 2}],
                component2: [{id: 'primula-flower', quantity: 2}],
                component3: [],
                process: {id: 'heat', level: 'minor'},
                vessel: 'giant-bottle',
                result: 'giant-weak-health-potion'
            }
        },
        'mediocre': {
            'small': {},
            'medium': {},
            'big': {},
            'giant': {}
        },
        'average': {
            'small': {},
            'medium': {},
            'big': {},
            'giant': {}
        },
        'strong': {
            'small': {},
            'medium': {},
            'big': {},
            'giant': {}
        },
        'powerful':{
            'small': {},
            'medium': {},
            'big': {},
            'giant': {}
        },
    }
};
