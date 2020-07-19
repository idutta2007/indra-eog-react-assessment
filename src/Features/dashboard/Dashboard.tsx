import * as React from 'react';
import MetricSelect from './MetricSelect';
import { Grid, Container, LinearProgress } from '@material-ui/core';
import MetricLabelContainer from './MetricLabelContainer';
import PlotContainer from './PlotContainer';
import { Provider, createClient, useQuery } from 'urql';
import { IState } from '../../store'
import { actions, MeasurementOption } from './reducer'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { query, createQueryVariables } from '../../api/DashboardQuery';
import { useEffect, useState } from 'react';

const getDashboard = (state: IState) => {
    const { metricOptions, metricData } = state.dashboard;
    return {
        metricOptions,
        metricData
    };
  };

  
const Dashboard = (props: any) => {

    // const dispatch = useDispatch();
    // const { metricOptions, metricData } = useSelector(getDashboard)

    // const [result] = useQuery({
    //     query,
    //     variables:createQueryVariables( metricOptions )
    // });
    // const { fetching, data, error } = result;

    // useEffect(() => {
    //     if (error) {
    //       dispatch(actions.fectchMetricDataError({ error: error.message }));
    //       return;
    //     }
    //     if ( data ){
    //         console.log( data.getMultipleMeasurements[0] )
    //         dispatch(actions.metricDataReceived(data.getMultipleMeasurements[0]));
    //     }
    // },[dispatch, error, data])

    // if (fetching) return <LinearProgress />;
    // if (error) return <div>error</div>

    // const handleMetricListChange = (ev: any)=>{
    //     dispatch(actions.updateMetricList(ev))
    // }

    return (
        <div style={{padding:'1em'}}>
            <Grid container>
            <Grid item xs={8}>
                    <MetricLabelContainer/>
                </Grid>
                <Grid item xs={4}>
                    <MetricSelect/>
                </Grid>
                <Grid item xs={8}>
                    <PlotContainer/>
                </Grid>
            </Grid>
        </div>
    )
}
 
export default Dashboard;