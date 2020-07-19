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
  
const Dashboard = (props: any) => {
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