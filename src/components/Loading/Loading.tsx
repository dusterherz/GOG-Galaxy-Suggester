import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import useStyles from './Loading.styles';

export default () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <CircularProgress color="secondary" size='30vh' />
        </Box>
    );
}