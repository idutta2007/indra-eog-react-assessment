import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as dashboardReducer } from '../Features/Dashboard/reducer';
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  weather: weatherReducer,
  dashboard: dashboardReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
