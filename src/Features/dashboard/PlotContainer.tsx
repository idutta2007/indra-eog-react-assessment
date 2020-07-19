import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { useQuery } from 'urql';
import { query, createQueryVariables } from '../../api/DashboardQuery';

export interface PlotContainerProps {
}

const getDashboard = (state: IState) => {
    return {
        metricOptions: state.dashboard.metricOptions,
        metricData: state.dashboard.metricData
    };
};

const PlotContainer: React.SFC<PlotContainerProps> = () => {
    const dispatch = useDispatch();
    const { metricOptions, metricData } = useSelector(getDashboard)

    const [result] = useQuery({
        query,
        variables:createQueryVariables( metricOptions )
    });
    const { fetching, data, error } = result;

    return (
        <div>Plot container</div>
    );
}
 
export default PlotContainer;