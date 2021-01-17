define(["require", "exports", "./actions/physicalActions", "./actions/magicalActions", "./actions/miscActions"], function (require, exports, physicalActions_1, magicalActions_1, miscActions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const actionsData = {
        ...physicalActions_1.default,
        ...magicalActions_1.default,
        ...miscActions_1.default,
    };
    exports.default = actionsData;
});
//# sourceMappingURL=actionsData.js.map