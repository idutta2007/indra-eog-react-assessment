import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { assertInputObjectType } from 'graphql';

export type MeasurementOption = {
    value: string;
    label: string;
    color: string
};

export type Measurement = {
    at: number;
    value: number;
    metric: string;
    unit: string;
};

export type MeasurementApiError = {
   error: string;
};

const initialState = {
    latestValues: {} as {[key:string]: number},
    metricOptions: [] as MeasurementOption[],
    metricData: {} as any
};

const slice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateMetricList: (state, action: PayloadAction<MeasurementOption[]>) =>{
            state.metricOptions = action.payload
        },

        latestValueRecived: (state, action: PayloadAction<Measurement>) =>{
            state.latestValues[action.payload.metric] = action.payload.value
        },

        fectchMetricDataError: (state, action:PayloadAction<MeasurementApiError>) =>{
        }
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;