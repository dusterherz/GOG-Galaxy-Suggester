import { Box } from "@material-ui/core";
import React from "react";
import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import useStyles from './Background.styles'
import { backgroundProps } from "./Background.types";

export default ({ children, backgroundImage }: backgroundProps) => {
    const backgroundLimiterId = 'backgroundLimiter';
    const classes = useStyles();

    return (
        <Box className={classes.root} >
            <AnimatedBackground backgroundImage={backgroundImage} containerId={backgroundLimiterId}></AnimatedBackground>
            <Box className={classes.gradient} id={backgroundLimiterId} >
                {children}
            </Box>
        </Box >)
};