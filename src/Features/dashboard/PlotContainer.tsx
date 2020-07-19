import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { useQuery } from 'urql';
import { query, createQueryVariables } from '../../api/DashboardQuery';
import { LineChart, XAxis,YAxis, CartesianGrid, Line, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LinearProgress } from '@material-ui/core';
import moment from 'moment';

export interface PlotContainerProps {
}

const getDashboard = (state: IState) => {
    return {
        metricOptions: state.dashboard.metricOptions,
        metricData: state.dashboard.metricData
    };
};

const createPlotData = (data: any)=>{
    const plotData: any[] = []
    data.getMultipleMeasurements.forEach( (metricMeas: any) => {
        metricMeas.measurements.forEach( (meas:any) => {
            const point = plotData.find( x => x.at == meas.at )
            const timeLabel = moment(meas.at).format('hh:mm a')
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
    return plotData
}

const PlotContainer: React.SFC<PlotContainerProps> = () => {
    const dispatch = useDispatch();
    const { metricOptions, metricData } = useSelector(getDashboard)

    const [result] = useQuery({
        query,
        variables:createQueryVariables( metricOptions )
    });
    const { fetching, data, error } = result;

    if ( fetching ) return <LinearProgress/>
    if ( error ) return <div>Error</div>
    if ( !data || !data.getMultipleMeasurements || data.getMultipleMeasurements.length == 0 ){
        return <div>No data received</div>
    }
    const plotData = createPlotData( data )
    console.log(plotData)

    return (
        <div style={{height:'500px'}}>
            <ResponsiveContainer width='100%' height="100%">
                <LineChart 
                  margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                  data={plotData}>
                    <Legend />
                    <Tooltip />
                    <XAxis dataKey="timeLabel" interval={500}/>
                    {metricOptions.map( option=>(
                        <YAxis key={option.value} dataKey={option.value}/>
                    ))}
                    {metricOptions.map( option=>(
                        <Line 
                           key={option.value} 
                           type="monotone" 
                           dataKey={option.value} 
                           stroke={option.color} 
                           dot={false} 
                           activeDot={true}/>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
export default PlotContainer;