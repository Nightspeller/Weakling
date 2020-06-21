import {GeneralLocation} from "./generalLocation.js";
import {FrettNpc} from "../npcs/booksStore/frettNpc.js";

export class BooksStoreScene extends GeneralLocation {
    constructor() {
        super({key: 'BooksStore'});
    }

    public preload() {
        super.preload()
    }

    public init(data) {
        super.init(data)
    }

    public create() {
        super.create('booksStore');
        const frett = new FrettNpc({scene: this});
    }

    public update() {
        super.update();
    }
}
