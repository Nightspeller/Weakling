import {physicalActions} from "./actions/physicalActions.js";
import {magicalActions} from "./actions/magicalActions.js";
import {miscActions} from "./actions/miscActions.js";

export const actionsData: { [key: string]: ActionData } = {
    ...physicalActions,
    ...magicalActions,
    ...miscActions
};
