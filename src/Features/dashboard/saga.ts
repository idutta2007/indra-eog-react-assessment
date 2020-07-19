import { actions, MeasurementApiError } from './reducer';
import { toast } from 'react-toastify';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call } from 'redux-saga/effects';

function* apiErrorReceived(action: PayloadAction<MeasurementApiError>) {
    yield call(toast.error, `Failed to retrive measurement data: ${action.payload.error}`);
}
  
export default function* watchDashBoardActions() {
    yield takeEvery(actions.fectchMetricDataError.type, apiErrorReceived);
}