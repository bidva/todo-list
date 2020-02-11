import { delay, put, call, takeEvery } from 'redux-saga/effects';
import * as actionType from '../global/actions';
import actions from '../actions/list';
import { apiCalls } from '../global/Api';
import { history } from '../config/store';
import { toast } from 'react-toastify';

/** *************************** Subroutines ************************************/
function* createList() {
  yield put(actions.createListRequest());

  try {
    const { response, error } = yield call(apiCalls.createList, {});
    if (response) {
      yield put(actions.createListSuccess(response));
      const {
        list: { id }
      } = response;
      toast.success('Your list created successfully!');
      history.push(`/${id}`);
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.createList());
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

function* loadList(option: any) {
  yield put(actions.loadListRequest());
  const { listId } = option;
  try {
    const { response, error } = yield call(apiCalls.loadList, { id: listId });
    if (response) {
      yield put(actions.loadListSuccess(response));
    } else {
      if (error.message === 'list not found.') {
        toast.error(`We couldn't find the list! please make a new one.`);
        yield put(actions.clearCache());
        history.push('/');
        return;
      }
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.loadList({ listId }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

function* resetList(option: any) {
  yield put(actions.resetListRequest());
  const { listId } = option;
  try {
    const { response, error } = yield call(apiCalls.resetList, { id: listId });
    if (response) {
      yield put(actions.resetListSuccess(response));
      toast.success('Your list reset successfully!');
    } else {
      toast.error(`we are gonna retry because of ${error.message}`);
      yield delay(5000);
      yield put(actions.resetList({ listId }));
    }
  } catch (error) {
    toast.error(`${error.message}`);
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/
export default function* watchJob() {
  yield takeEvery(actionType.LIST_CREATE, createList);
  yield takeEvery(actionType.LIST_LOAD, loadList);
  yield takeEvery(actionType.LIST_RESET, resetList);
}
