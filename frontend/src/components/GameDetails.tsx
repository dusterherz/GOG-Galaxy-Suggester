import React from "react";
import { Grid, Paper } from '@material-ui/core';

function GameDetails() {
    return (
        <Grid container>
            <Grid item xs={12} sm={3}>
                <Paper>Image</Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
                <Paper>EEFGS</Paper>
            </Grid>
        </Grid>

    );
}

export default GameDetails;