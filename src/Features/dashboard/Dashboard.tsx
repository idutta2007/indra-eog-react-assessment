import * as React from 'react';
import MetricSelect from './MetricSelect';
import { Grid, Container, LinearProgress } from '@material-ui/core';
import MetricLabelContainer from './MetricLabelContainer';
import PlotContainer from './PlotContainer';
import { Provider, createClient, useQuery, useSubscription } from 'urql';
import { IState } from '../../store'
import { actions, MeasurementOption } from './reducer'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { query, createQueryVariables } from '../../api/DashboardQuery';
import { useEffect, useState } from 'react';
import { newMeasurementSubscription } from '../../api/DashboardSubscription';
  
const handleSubscription = (messages: any[] = [], response: any) => {
    return response
};

const Dashboard = (props: any) => {
    const dispatch = useDispatch();
    
    const [res] = useSubscription({ query: newMeasurementSubscription }, handleSubscription);
    if ( res && res.data ){
        const data: {[key:string]: any} = res.data;
        const meas = data.newMeasurement
        dispatch(actions.latestValueRecived(meas))
    }

    return (
        <div style={{padding:'1em'}}>
            <Grid container>
            <Grid item xs={8}>
                    <MetricLabelContainer/>
                </Grid>
                <Grid item xs={4}>
                    <MetricSelect/>
                </Grid>
                <Grid item xs={12}>
                    <PlotContainer/>
                </Grid>
            </Grid>
        </div>
    )
}
 
export default Dashboard;