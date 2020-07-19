import * as React from 'react';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { MeasurementOption, actions } from './reducer';
import { IState } from '../../store';

const options: MeasurementOption[]  = [
    { value: 'flareTemp', label: 'Flare Temp', color: "red" },
    { value: 'waterTemp', label: 'Water Temp', color: "blue" },
    { value: 'casingPressure', label: 'Casing Pressure', color: "olive" },
    { value: 'oilTemp', label: 'Oil Temp', color: "purple" },
    { value: 'tubingPressure', label: 'Tubing Pressure', color: "green" },
    { value: 'injValveOpen', label: 'Inj Valve Open', color: "black" },
  ]
  
  const MetricSelect = (props: any) => {
    const dispatch = useDispatch();

    const handleMetricListChange = (ev: any)=>{
      dispatch(actions.updateMetricList(ev))
    }

    return (
    <Select 
       aria-label="Select a metric"
       isMulti
       options={options}
       onChange={handleMetricListChange}
    />
  )}

  export default MetricSelect;

