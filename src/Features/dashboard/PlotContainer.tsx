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
import { useEffect } from 'react';
import ErrorMessage from "../../components/ErrorMessage"
import InstructionMessage from '../../components/InstructionMessage';

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
    
    useEffect(() => {
        if ( error ) {
            dispatch( actions.fectchMetricDataError({error: error.message}))
        }
    });

    // Display a message if nothing is selected
    if ( !metricOptions || metricOptions.length === 0 ){
        return <InstructionMessage>Please select one or more options from the list above</InstructionMessage>
    }

    // If fetching show a progress bar
    if ( fetching ) return <LinearProgress/>

    // Show an error in case query returned an error
    if ( error ){
        return (
             <ErrorMessage>
                There was an error connecting to network. Please check your network connection and refresh this page.
            </ErrorMessage>
        )
    }

    // If no data was returned display a message
    if ( !data || !data.getMultipleMeasurements || data.getMultipleMeasurements.length === 0 ){
        return <div>No data was returned from server</div>
    }

    // Otherwise plot the data
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