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
    let startTime = date.getTime() - (1 * 65 * 60 * 1000);
    const fiveMinDuration = 1000 * 60 * 5;
    startTime = new Date(Math.round(startTime / fiveMinDuration) * fiveMinDuration).getTime();

    const list = metricList || []
    list.forEach( (m:any) => {
        input.push({metricName: m.value, after: startTime})
    })
    return { input }
}