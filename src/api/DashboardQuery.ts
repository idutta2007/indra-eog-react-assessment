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

    // Get data from lat hour
    const date = new Date();
    date.setHours(date.getHours() - 1)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    const currentTime = date.getTime()
    
    const list = metricList || []
    list.forEach( (m:any) => {
        input.push({metricName: m.value, after: currentTime})
    })
    return { input }
}