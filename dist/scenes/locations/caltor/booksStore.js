define(["require", "exports", "../generalLocation", "../../../triggers/npcs/booksStore/frettNpc"], function (require, exports, generalLocation_1, frettNpc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BooksStoreScene extends generalLocation_1.default {
        constructor() {
            super({ key: 'BooksStore' });
        }
        preload() {
            super.preload();
        }
        init(data) {
            super.init(data);
        }
        create() {
            super.create('booksStore');
            new frettNpc_1.default({ scene: this });
        }
        update() {
            super.update();
        }
    }
    exports.default = BooksStoreScene;
});
//# sourceMappingURL=booksStore.js.map