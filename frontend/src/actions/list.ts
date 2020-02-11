// all actions for list
import * as actions from '../global/actions';
import { action } from './util';

export default {
  loadList: (option: object) => action(actions.LIST_LOAD, option),
  loadListRequest: () => action(actions.LIST_LOAD_REQUEST),
  loadListSuccess: (response: any) =>
    action(actions.LIST_LOAD_SUCCESS, { response }),

  createList: () => action(actions.LIST_CREATE),
  createListRequest: () => action(actions.LIST_CREATE_REQUEST),
  createListSuccess: (response: any) =>
    action(actions.LIST_CREATE_SUCCESS, { response }),

  resetList: (option: object) => action(actions.LIST_RESET, option),
  resetListRequest: () => action(actions.LIST_RESET_REQUEST),
  resetListSuccess: (response: any) =>
    action(actions.LIST_RESET_SUCCESS, { response }),

  clearCache: () => action(actions.CLEAR_CACHE)
};
