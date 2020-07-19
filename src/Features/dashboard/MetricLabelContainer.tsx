import * as React from 'react';

export interface MetricLabelContainerProps {
    selectedOptions?: any
}
 
const MetricLabelContainer: React.SFC<MetricLabelContainerProps> = (props) => {
    const options = props.selectedOptions || []
    return (
        <>
            <div>Label Container</div>
            {options.map( (x:any)=>{
                return <div>{x.label}</div>
            })}
        </>
    );
}
 
export default MetricLabelContainer;