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
    latestValues: {} as {[key:string]: any},
    metricOptions: [] as MeasurementOption[],
};

const slice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateMetricList: (state, action: PayloadAction<MeasurementOption[]>) =>{
            state.metricOptions = action.payload
        },

        latestValueReceived: (state, action: PayloadAction<Measurement>) =>{
            state.latestValues[action.payload.metric] = {
                value: action.payload.value,
                unit: action.payload.unit
            }
        },

        fectchMetricDataError: (state, action:PayloadAction<MeasurementApiError>) =>{
            return state
        }
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;