// all actions for items
import * as actions from '../global/actions';
import { action } from './util';

export default {
  createItem: (option: object) => action(actions.ITEM_CREATE, option),
  createItemRequest: (option: object) =>
    action(actions.ITEM_CREATE_REQUEST, option),
  createItemSuccess: (response: any, tempId: string) =>
    action(actions.ITEM_CREATE_SUCCESS, { response, tempId }),

  deleteItem: (option: object) => action(actions.ITEM_DELETE, option),
  deleteItemRequest: () => action(actions.ITEM_DELETE_REQUEST),
  deleteItemSuccess: (response: any, itemId: string) =>
    action(actions.ITEM_DELETE_SUCCESS, { response, itemId }),

  reOrderItem: (option: object) => action(actions.ITEM_REORDER, option),
  reOrderItemRequest: (itemId: string, index: number) =>
    action(actions.ITEM_REORDER_REQUEST, { itemId, index }),
  reOrderItemSuccess: (response: any) =>
    action(actions.ITEM_REORDER_SUCCESS, { response })
};
