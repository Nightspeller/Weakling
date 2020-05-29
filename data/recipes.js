export const recipes = {
    'small-weak-healing-potion': {
        component1: [{ id: 'sourgrass', quantity: 1 }, { id: 'rocky-rose-flower', quantity: 1 }],
        component2: [{ id: 'primula-flower', quantity: 1 }],
        component3: [],
        process: { id: 'heat', level: 'minor' },
        vessel: 'small-bottle',
        result: 'small-weak-healing-potion'
    },
    'medium-weak-healing-potion': {
        component1: [{ id: 'sourgrass', quantity: 2 }, { id: 'rocky-rose-flower', quantity: 1 }],
        component2: [{ id: 'primula-flower', quantity: 1 }],
        component3: [],
        process: { id: 'heat', level: 'minor' },
        vessel: 'medium-bottle',
        result: 'medium-weak-healing-potion'
    },
    'big-weak-healing-potion': {
        component1: [{ id: 'sourgrass', quantity: 3 }, { id: 'rocky-rose-flower', quantity: 2 }],
        component2: [{ id: 'primula-flower', quantity: 2 }],
        component3: [],
        process: { id: 'heat', level: 'minor' },
        vessel: 'big-bottle',
        result: 'big-weak-healing-potion'
    },
    'giant-weak-healing-potion': {
        component1: [{ id: 'sourgrass', quantity: 4 }, { id: 'rocky-rose-flower', quantity: 2 }],
        component2: [{ id: 'primula-flower', quantity: 2 }],
        component3: [],
        process: { id: 'heat', level: 'minor' },
        vessel: 'giant-bottle',
        result: 'giant-weak-healing-potion'
    },
    'medium-weak-strength-potion': {
        component1: [{ id: 'rocky-rose-flower', quantity: 1 }],
        component2: [{ id: 'carrot', quantity: 2 }],
        component3: [],
        process: { id: 'heat', level: 'minor' },
        vessel: 'medium-bottle',
        result: 'medium-weak-strength-potion'
    },
};
const recepies_test = {
    'healing-potion': {
        'weak': {
            'small': {
                component1: [{ id: 'sourgrass', quantity: 1 }, { id: 'rocky-rose-flower', quantity: 1 }],
                component2: [{ id: 'primula-flower', quantity: 1 }],
                component3: [],
                process: { id: 'heat', level: 'minor' },
                vessel: 'small-bottle',
                result: 'small-weak-healing-potion'
            },
            'medium': {
                component1: [{ id: 'sourgrass', quantity: 2 }, { id: 'rocky-rose-flower', quantity: 1 }],
                component2: [{ id: 'primula-flower', quantity: 1 }],
                component3: [],
                process: { id: 'heat', level: 'minor' },
                vessel: 'medium-bottle',
                result: 'medium-weak-healing-potion'
            },
            'big': {
                component1: [{ id: 'sourgrass', quantity: 3 }, { id: 'rocky-rose-flower', quantity: 2 }],
                component2: [{ id: 'primula-flower', quantity: 2 }],
                component3: [],
                process: { id: 'heat', level: 'minor' },
                vessel: 'big-bottle',
                result: 'big-weak-healing-potion'
            },
            'giant': {
                component1: [{ id: 'sourgrass', quantity: 4 }, { id: 'rocky-rose-flower', quantity: 2 }],
                component2: [{ id: 'primula-flower', quantity: 2 }],
                component3: [],
                process: { id: 'heat', level: 'minor' },
                vessel: 'giant-bottle',
                result: 'giant-weak-healing-potion'
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
        'powerful': {
            'small': {},
            'medium': {},
            'big': {},
            'giant': {}
        },
    }
};
//# sourceMappingURL=recipes.js.map