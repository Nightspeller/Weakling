define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.alchemyStandSlotNames = exports.componentSlotNames = exports.containerSlotNames = exports.playerSlotNames = exports.quickSlotNames = exports.dollSlotNames = exports.backpackSlotNames = void 0;
    exports.backpackSlotNames = [
        'backpack0_0', 'backpack1_0', 'backpack2_0', 'backpack3_0', 'backpack4_0',
        'backpack0_1', 'backpack1_1', 'backpack2_1', 'backpack3_1', 'backpack4_1',
        'backpack0_2', 'backpack1_2', 'backpack2_2', 'backpack3_2', 'backpack4_2',
        'backpack0_3', 'backpack1_3', 'backpack2_3', 'backpack3_3', 'backpack4_3',
        'backpack0_4', 'backpack1_4', 'backpack2_4', 'backpack3_4', 'backpack4_4',
    ];
    exports.dollSlotNames = [
        'rightHand', 'leftHand', 'belt', 'head', 'neck', 'ringLeft', 'ringRight', 'body', 'cape', 'gloves', 'tail', 'pants', 'boots', 'bag',
    ];
    exports.quickSlotNames = [
        'quickSlot0', 'quickSlot1', 'quickSlot2', 'quickSlot3', 'quickSlot4',
    ];
    exports.playerSlotNames = [...exports.backpackSlotNames, ...exports.dollSlotNames, ...exports.quickSlotNames];
    exports.containerSlotNames = [
        'containerSlot0_0', 'containerSlot1_0', 'containerSlot2_0', 'containerSlot3_0', 'containerSlot4_0',
        'containerSlot0_1', 'containerSlot1_1', 'containerSlot2_1', 'containerSlot3_1', 'containerSlot4_1',
        'containerSlot0_2', 'containerSlot1_2', 'containerSlot2_2', 'containerSlot3_2', 'containerSlot4_2',
    ];
    exports.componentSlotNames = [
        'componentSlot0', 'componentSlot1', 'componentSlot2', 'componentSlot3', 'componentSlot4',
    ];
    exports.alchemyStandSlotNames = [
        ...exports.componentSlotNames, 'vesselSlot', 'resultSlot',
    ];
});
//# sourceMappingURL=itemSlots.js.map