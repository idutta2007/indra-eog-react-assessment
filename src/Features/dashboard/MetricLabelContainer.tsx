import * as React from 'react';
import { IState } from '../../store';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { MeasurementOption, actions } from './reducer';
import { useSubscription } from 'urql';
import { newMeasurementSubscription } from '../../api/DashboardSubscription';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
    metricItem: {
        height: '5em',
        width: 'auto',
        padding: '1ex',
    }
});

const MetricLabelContainer: React.FC = () => {
    const classes = useStyles();

    let { metricOptions, latestValues } = useSelector(storeDataSelector)
    const options = metricOptions || []

    return (
        <Grid container spacing={1}>
            {metricOptions.map(option=>(
                <Grid item key={option.value}>
                    <div className={classes.metricItem} style={getStyleForMetric(option)}>
                        {option.label}
                        {latestValues[option.value]}
                    </div>
                </Grid>
            ))}
        </Grid>
    );
}

const storeDataSelector = (state: IState) => {
    return {
        metricOptions: state.dashboard.metricOptions,
        latestValues: state.dashboard.latestValues,
    };
};

const getStyleForMetric = (option:MeasurementOption) => {
    return {
        border: `2px solid ${option.color}`
    }
};

const handleSubscription = (messages: any[] = [], response: any) => {
    return response
};
 
export default MetricLabelContainer;