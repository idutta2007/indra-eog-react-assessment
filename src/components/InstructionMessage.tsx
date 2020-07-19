import React, { SFC } from "react";
import { Grid, Typography } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";

const InstructionMessage: SFC = (props) => {
    return (
        <Grid container style={{height: '75vh', fontSize: '20px'}}
            spacing={1}
            alignItems="center"
            justify="center"
            direction="row">
            <Grid item>
                <InfoOutlined fontSize="large" style={{color: blue[500]}}/>
            </Grid>
            <Grid item>
               <Typography variant="h6" >{props.children}</Typography>
            </Grid>
        </Grid>
    );
}
 
export default InstructionMessage;