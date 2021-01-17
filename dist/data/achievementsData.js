define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const achievementsData = [{
            name: 'Fully prepared',
            description: 'Equip items at every slot',
            icon: { texture: 'icons', frame: 'icons/bags/leather-bag-with-pockets' },
            achieved: false,
        }, {
            name: 'My little hobby',
            description: 'Make 10 potions or mixtures',
            icon: { texture: 'icons', frame: 'icons/alchemy/mortar-and-pestle' },
            progress: [0, 10],
            achieved: false,
        }, {
            name: 'Let it go',
            description: 'Drop an item - it might be more useful than it seems!',
            icon: { texture: 'icons', frame: 'icons/misc/drop-coins' },
            achieved: false,
        }, {
            name: 'Welcome to the Farmville',
            description: 'Grow 6 plants',
            icon: { texture: 'icons', frame: 'icons/plants/plant-in-pot-fully-grown' },
            progress: [0, 6],
            achieved: false,
        }, {
            name: 'Did you just assume?..',
            description: 'Change your gender',
            icon: { texture: 'icons', frame: 'icons/fishing/clown-fish' },
            achieved: false,
        }, {
            name: 'Spirit them away',
            description: 'Obtain the Spirit Sword',
            icon: { texture: 'icons', frame: 'icons/weapons/melee/sword-steel' },
            achieved: false,
        }, {
            name: 'See battle, Boo? Run, Boo, run!',
            description: 'Run away from the battle before it begins',
            icon: { texture: 'icons', frame: 'icons/misc/running' },
            achieved: false,
        }, {
            name: 'Weak, but not useless',
            description: 'Defeat 5 enemy groups',
            icon: { texture: 'icons', frame: 'icons/misc/bleeding-edge' },
            progress: [0, 5],
            achieved: false,
        }, {
            name: 'Checked, checked aaaand checked!',
            description: 'Complete all the quests',
            icon: { texture: 'icons', frame: 'icons/books-and-scrolls/book-with-bookmark' },
            achieved: false,
        }, {
            name: 'It is done',
            description: 'Finish the game by collecting all achievements',
            icon: { texture: 'icons', frame: 'icons/coins/large-coin-with-crown' },
            achieved: false,
        }];
    exports.default = achievementsData;
});
//# sourceMappingURL=achievementsData.js.map