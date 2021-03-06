import React from "react";
import { Avatar, Box, Divider, Grid } from '@material-ui/core';

import useStyles from './TutorialPoint.styles'
import { tutorialPointProps } from "./TutorialPoint.types";

export default ({ children, number }: tutorialPointProps) => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root} alignItems='center'>
            <Grid item xs={12} sm={1}>
                <Avatar className={classes.number}>{number}</Avatar>
            </Grid>
            <Grid item xs={12} sm={11}>
                <Box margin={1}>
                    {children}
                </Box>
                <Divider></Divider>
            </Grid>
        </Grid>
    );
}