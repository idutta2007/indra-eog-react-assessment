import * as React from 'react';
import MetricSelect from './MetricSelect';
import { Grid } from '@material-ui/core';
import MetricLabelContainer from './MetricLabelContainer';
import PlotContainer from './PlotContainer';
import SubscriptionComponent from './SubscriptionComponent';
  
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
            <SubscriptionComponent/>
        </div>
    )
}
 
export default Dashboard;