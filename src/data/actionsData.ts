import physicalActions from './actions/physicalActions';
import magicalActions from './actions/magicalActions';
import miscActions from './actions/miscActions';
import { ActionData } from '../types/my-types';

const actionsData: { [key: string]: ActionData } = {
  ...physicalActions,
  ...magicalActions,
  ...miscActions,
};

export default actionsData;
