import * as actions from '../global/actions';
import { move } from '../utils/util';
import _ from 'lodash';
import List from '../models/List';
import Item from '../models/Item';

const initState = {
  listId: null,
  list: null,
  loadingListFetch: false,
  loadingCreateList: false,
  loadingResetList: false,
  loadingDeleteItem: false,
  loadingReorderItem: false
};

export default function(state: any = initState, action: any = {}) {
  let list: List,
    title: string,
    tempId: string,
    index: number,
    itemId: string,
    storeList: List;
  switch (action.type) {
    case actions.LIST_CREATE_REQUEST:
      return {
        ...state,
        loadingCreateList: true
      };
    case actions.LIST_CREATE_SUCCESS:
      ({
        response: { list }
      } = action);
      return {
        ...state,
        listId: list.id,
        list: list,
        loadingCreateList: false
      };
    case actions.LIST_LOAD_REQUEST:
      return {
        ...state,
        loadingListFetch: true
      };
    case actions.LIST_LOAD_SUCCESS:
      ({
        response: { list }
      } = action);
      return {
        ...state,
        listId: list.id,
        list,
        loadingListFetch: false
      };
    case actions.LIST_RESET_REQUEST:
      return {
        ...state,
        loadingResetList: true
      };
    case actions.LIST_RESET_SUCCESS:
      storeList = { ...state.list };
      storeList.items = [];
      return {
        ...state,
        list: storeList,
        loadingResetList: false
      };
    case actions.ITEM_CREATE_REQUEST:
      ({ title, tempId } = action);
      storeList = { ...state.list };
      storeList.items.push(new Item(title, undefined, tempId));
      return {
        ...state,
        list: storeList
      };
    case actions.ITEM_CREATE_SUCCESS:
      storeList = { ...state.list };
      const successItem = storeList.items.find(
        (item: any) => item.tempId === action.tempId
      );
      if (successItem) {
        successItem.tempId = undefined;
        successItem.id = action.response.item.id;
      }
      return {
        ...state,
        list: storeList
      };
    case actions.ITEM_DELETE_REQUEST:
      return {
        ...state,
        loadingDeleteItem: true
      };
    case actions.ITEM_DELETE_SUCCESS:
      storeList = { ...state.list };
      storeList.items = storeList.items.filter(
        (item: any) => item.id !== action.itemId
      );
      return {
        ...state,
        loadingDeleteItem: false,
        list: storeList
      };
    case actions.ITEM_REORDER_REQUEST:
      storeList = { ...state.list };
      ({ itemId, index } = action);
      const item = storeList.items.find((item: any) => item.id === itemId);
      const oldIndex = _.indexOf(storeList.items, item);
      storeList.items = move(storeList.items, oldIndex, index);
      return {
        ...state,
        loadingReorderItem: true
      };
    case actions.ITEM_REORDER_SUCCESS:
      return {
        ...state,
        loadingReorderItem: false
      };
    case actions.CLEAR_CACHE:
      return {
        ...state,
        listId: null,
        list: null,
        loadingListFetch: false,
        loadingCreateList: false,
        loadingResetList: false,
        loadingDeleteItem: false,
        loadingReorderItem: false
      };
    default:
      return state;
  }
}
