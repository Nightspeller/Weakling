import { GeneralLocation } from "./generalLocation.js";
import { FrettNpc } from "../npcs/booksStore/frettNpc.js";
export class BooksStoreScene extends GeneralLocation {
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
        const frett = new FrettNpc({ scene: this });
    }
    update() {
        super.update();
    }
}
//# sourceMappingURL=booksStore.js.map