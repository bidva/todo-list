import { delay, put, call, takeEvery } from 'redux-saga/effects';
import * as actionType from '../global/actions';
import actions from '../actions/item';
import { apiCalls } from '../global/Api';
import { toast } from 'react-toastify';

/** *************************** Subroutines ************************************/
function* createItem(option: any) {
  const { title, listId, tempId } = option;
  yield put(actions.createItemRequest({ title, tempId }));
  try {
    const { response, error } = yield call(apiCalls.createItem, {
      title,
      listId
    });
    if (response) {
      yield put(actions.createItemSuccess(response, tempId));
      toast.success('Item created successfully!');
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.createItem({ title, listId, tempId }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

function* deleteItem(option: any) {
  const { id: itemId, listId } = option;
  yield put(actions.deleteItemRequest());
  try {
    const { response, error } = yield call(apiCalls.deleteItem, {
      listId,
      itemId
    });
    if (response) {
      yield put(actions.deleteItemSuccess(response, itemId));
      toast.success('Item deleted successfully!');
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.deleteItem({ id: itemId, listId }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

function* reOrderItem(option: any) {
  const { itemId, listId, index } = option;
  yield put(actions.reOrderItemRequest(itemId, index));
  try {
    const { response, error } = yield call(apiCalls.reOrderItem, {
      listId,
      itemId,
      index
    });
    if (response) {
      yield put(actions.reOrderItemSuccess(response));
      toast.success('Item reOrdered successfully!');
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.reOrderItem({ itemId, listId, index }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/
export default function* watchJob() {
  yield takeEvery(actionType.ITEM_CREATE, createItem);
  yield takeEvery(actionType.ITEM_DELETE, deleteItem);
  yield takeEvery(actionType.ITEM_REORDER, reOrderItem);
}
