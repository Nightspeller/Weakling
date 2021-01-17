define(["require", "exports", "../generalCharacter"], function (require, exports, generalCharacter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GeneralEnemy extends generalCharacter_1.default {
        // eslint-disable-next-line no-useless-constructor
        constructor() {
            super();
        }
        isActionAvailable(action) {
            let result = true;
            if (action.actionCost > this.actionPoints[action.type]) {
                result = false;
            }
            if (action.parametersCost?.manna > this.parameters.manna) {
                result = false;
            }
            if (action.parametersCost?.energy > this.parameters.energy) {
                result = false;
            }
            return result;
        }
        pickActionTargets(action, disposition) {
            if (action.target === 'self') {
                return [this];
            }
            if (action.target === 'enemy') {
                const alivePlayers = disposition.playerCharacters.filter((char) => char.isAlive);
                const randomAlivePlayer = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
                return [randomAlivePlayer];
            }
            return [];
        }
    }
    exports.default = GeneralEnemy;
});
//# sourceMappingURL=generalEnemy.js.map