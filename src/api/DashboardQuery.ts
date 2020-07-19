import { createClient, useQuery } from "urql";

export const query = `
query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
     metric
     measurements {
       at
       value
       metric
       unit
     }
  }
}
`;

export const createQueryVariables = (metricList: any[]): any => {
    const input: any[] = []

    // Get staring at 8am today
    const date = new Date();
    date.setHours(8)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    const currentTime = date.getTime()
    
    const list = metricList || []
    metricList.forEach( (m:any) => {
        input.push({metricName: m.value, after: currentTime})
    })
    return { input }
}