import { fork } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import dashboardSaga from '../Features/dashboard/saga';

export default function* root() {
  yield fork(weatherSaga)
  yield fork(dashboardSaga)
}
