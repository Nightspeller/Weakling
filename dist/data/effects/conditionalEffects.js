/* eslint-disable */
// @ts-nocheck
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const conditionalEffects = {
        trapped: {
            effectId: 'trapped',
            name: 'Trap prepared',
            description: 'Trap is set on the character\'s path',
            type: 'conditional',
            baseDuration: -1,
            durationLeft: null,
            strength: null,
            source: null,
            statusImage: { texture: 'icons', frame: 'icons/traps/trap-1' },
            applicationCheck: (source, target, action) => true,
            setModifier(source, target, action) {
                this.modifier = {
                    type: 'effect',
                    value: ['subtractHealth'],
                };
            },
        },
        cursedSoil: {
            effectId: 'cursedSoil',
            name: 'Cursed soil',
            description: 'The soil is cursed on the character\'s path',
            type: 'conditional',
            baseDuration: -1,
            durationLeft: null,
            strength: null,
            source: null,
            statusImage: { texture: 'icons', frame: 'icons/traps/cursed-soil' },
            applicationCheck: (source, target, action) => true,
            setModifier(source, target, action) {
                this.modifier = {
                    type: 'effect',
                    value: ['subtractHealth', 'agilityDown'],
                };
            },
        },
    };
    exports.default = conditionalEffects;
});
//# sourceMappingURL=conditionalEffects.js.map