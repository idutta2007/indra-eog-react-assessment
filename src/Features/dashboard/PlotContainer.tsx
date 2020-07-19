import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store';
import { useQuery } from 'urql';
import { query, createQueryVariables } from '../../api/DashboardQuery';
import { LineChart, XAxis,YAxis, Line, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LinearProgress, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { actions } from './reducer';
import { metricDisplayConfig } from './MetricDisplayConfig';

const useStyles = makeStyles({
    root: {
        height: '75vh',
        minHeight: '200px',
    },
});

const storeDataSelector = (state: IState) => {
    return {
        metricOptions: state.dashboard.metricOptions,
    };
};

const createTimeLabel = (ms: number)=>{
    return moment(ms).format('h:mm a')
}

const createPlotData = (data: any)=>{
    const plotData: any[] = []
    data.getMultipleMeasurements.forEach( (metricMeas: any) => {
        metricMeas.measurements.forEach( (meas:any) => {
            const point = plotData.find( x => x.at === meas.at )
            const timeLabel = createTimeLabel(meas.at)
            if ( point ){
                point[metricMeas.metric] = meas.value
                point['timeLabel'] = timeLabel
            }
            else {
                plotData.push({
                    at: meas.at,
                    [metricMeas.metric]: meas.value,
                    timeLabel
                })
            }
        });
    });
    
    // Inset date label
    if ( plotData.length > 0 ){
        const lastPoint = plotData[plotData.length-1]
        lastPoint.timeLabel = moment(lastPoint.at).format('MMM DD, y')
    }
    return plotData
}

const PlotContainer: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { metricOptions } = useSelector(storeDataSelector)

    const [result] = useQuery({
        query,
        variables:createQueryVariables( metricOptions )
    });
    const { fetching, data, error } = result;

    if ( fetching ) return <LinearProgress/>

    if ( error ) {
        dispatch( actions.fectchMetricDataError({error: error.message}))
        return <div></div>
    }

    if ( !data || !data.getMultipleMeasurements || data.getMultipleMeasurements.length === 0 ){
        return <div></div>
    }
    const plotData = createPlotData( data )

    return (
        <div className={classes.root}>
            <ResponsiveContainer width='100%' height="100%">
                <LineChart 
                  margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                  data={plotData}>
                    <Legend />
                    <Tooltip />
                    <XAxis dataKey="timeLabel" interval={465}/>
                    {metricOptions.map( option=>(
                        <YAxis 
                            key={option.value}
                            yAxisId={option.value}
                            dataKey={option.value}
                            label={{ value: option.label, angle: -90, position: 'insideRight', offset: 10 }}
                        />
                    ))}
                    {metricOptions.map( option=>(
                        <Line 
                           key={option.value}
                           yAxisId={option.value}
                           type="monotone" 
                           dataKey={option.value} 
                           stroke={metricDisplayConfig[option.value].color} 
                           dot={false} 
                           activeDot={true}/>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
export default PlotContainer;