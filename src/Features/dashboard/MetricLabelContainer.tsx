import * as React from 'react';
import { IState } from '../../store';
import { Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { metricDisplayConfig } from './MetricDisplayConfig';

const useStyles = makeStyles({
    root: {
        marginBottom: '1rem'
    },
    metricItem: {
        height: '5em',
        width: 'auto',
        padding: '1ex',
    },
});

const MetricLabelContainer: React.FC = () => {
    const classes = useStyles();

    let { metricOptions, latestValues } = useSelector(storeDataSelector)
    const options = metricOptions || []

    return (
        <Grid container spacing={1} className={classes.root}>
            {options.map(option=>(
                <Grid item key={option.value}>
                    <div className={classes.metricItem} style={getStyleForMetricBox(option.value)}>
                        <div style={getStyleForMetricLabel(option.value)}>{option.label}</div>
                        <div style={getStyleForMetricValue(option.value)}>
                            {latestValues[option.value] ? latestValues[option.value].value: ''}
                            {latestValues[option.value] ? latestValues[option.value].unit: ''}
                        </div>
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

const getStyleForMetricBox = (metricName: string) => {
    return {
        border: `4px solid ${metricDisplayConfig[metricName].color}`
    }
};

const getStyleForMetricLabel = (metricName: string) => {
    return {
        color: metricDisplayConfig[metricName].color
    }
};

const getStyleForMetricValue = (metricName: string) => {
    return {
        fontSize: '20px',
        color: metricDisplayConfig[metricName].color
    }
};
 
export default MetricLabelContainer;