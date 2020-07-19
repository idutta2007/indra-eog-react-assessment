import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MeasurementOption = {
    value: string;
    label: string;
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
    fetchingData: false,
    metricOptions: [] as MeasurementOption[],
    metricData: {} as any
};

const slice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateMetricList: (state, action: PayloadAction<MeasurementOption[]>) =>{
            state.metricOptions = action.payload
            console.log( "updateMetricList")
        },

        metricDataReceived: (state, action: PayloadAction<Measurement[]>) =>{
        },

        fectchMetricDataError: (state, action:PayloadAction<MeasurementApiError>) =>{
        }
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;