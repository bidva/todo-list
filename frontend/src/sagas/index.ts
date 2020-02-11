import { all, fork } from 'redux-saga/effects';

import list from './list';
import item from './item';

export default function* root() {
  yield all([fork(list), fork(item)]);
}
