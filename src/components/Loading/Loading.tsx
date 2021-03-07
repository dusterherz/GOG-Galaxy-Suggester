import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import useStyles from './Loading.styles';

export default () => {
    const classes = useStyles();
    return (
        <Box className={classes.center}>
            <Typography className={classes.center}>Loading</Typography>
            <CircularProgress color="secondary" size='30vh' />
        </Box>
    );
}