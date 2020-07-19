import React, { SFC } from "react";
import { Grid, Typography } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

const ErrorMesssage: SFC = (props) => {
    return (
        <Grid container style={{height: '75vh', fontSize: '20px'}}
            spacing={1}
            alignItems="center"
            justify="center"
            direction="row">
            <Grid item>
                <ErrorOutline fontSize="large" style={{color: red[500]}}/>
            </Grid>
            <Grid item>
               <Typography variant="h6" >{props.children}</Typography>
            </Grid>
        </Grid>
    );
}
 
export default ErrorMesssage;