import * as React from 'react';
import Select from 'react-select'
import { useDispatch } from 'react-redux';
import { MeasurementOption, actions } from './reducer';

const options: MeasurementOption[]  = [
    { value: 'flareTemp', label: 'Flare Temp' },
    { value: 'waterTemp', label: 'Water Temp' },
    { value: 'casingPressure', label: 'Casing Pressure'},
    { value: 'oilTemp', label: 'Oil Temp' },
    { value: 'tubingPressure', label: 'Tubing Pressure'},
    { value: 'injValveOpen', label: 'Inj Valve Open' },
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

