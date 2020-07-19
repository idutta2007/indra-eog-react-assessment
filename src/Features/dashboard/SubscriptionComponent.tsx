import * as React from 'react';
import { FC } from "react";
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';
import { actions } from './reducer';
import { newMeasurementSubscription } from '../../api/DashboardSubscription';


/**
 * Subscription component is an invisible component that is used to create subscription
 * which prevents unnecessray re-renderng os a large portion of the component tree.
 */
const SubscriptionComponent: FC = () => {
    const dispatch = useDispatch();
    
    const [res] = useSubscription({ query: newMeasurementSubscription }, handleSubscription);
    if ( res && res.data ){
        const data: {[key:string]: any} = res.data;
        const meas = data.newMeasurement
        
        dispatch(actions.latestValueReceived(meas))
    }
    return (<span></span>);
}

const handleSubscription = (messages: any[] = [], response: any) => {
    return response
};
 
export default SubscriptionComponent;