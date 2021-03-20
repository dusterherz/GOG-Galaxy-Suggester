import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import useStyles from './Loading.styles';

const Loading = () => {
    const classes = useStyles();
    return (
        <Box className={classes.center}>
            <Typography className={classes.center}>Loading</Typography>
            <CircularProgress color="secondary" size='30vh' />
        </Box>
    );
}

export default Loading;