import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';

import useStyles from './Error.styles';
import { errorProps } from "./Error.types";

export default ({ message }: errorProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.root} maxWidth={'md'}>
            <Box border={5} borderColor='error.main'>
                <Grid container alignItems='center'>
                    <Grid item xs={12} sm={6}>
                        <WarningTwoToneIcon className={classes.alert} fontSize="inherit"></WarningTwoToneIcon>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Typography className={classes.message}>{message}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}