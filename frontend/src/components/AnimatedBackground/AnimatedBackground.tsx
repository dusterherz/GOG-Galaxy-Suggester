import Box from '@material-ui/core/Box';
import React, { useEffect, useState } from 'react';
import { animatedBackgroundProps } from './AnimatedBackground.types';
import { zoomanimation } from './AnimatedBackground.styles';
import useStyles from './AnimatedBackground.styles';

function AnimatedBackground({ backgroundImage, containerId }: animatedBackgroundProps) {
    const [backgroundHeight, setBackgroundHeight] = useState(document.documentElement.scrollHeight);
    useEffect(() => {
        function handleResize() {
            const height = document.getElementById(containerId)?.clientHeight ?? 0;
            setBackgroundHeight(height);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    });

    const classes = useStyles({ backgroundImage, backgroundHeight });
    return (
        <Box className={classes.root}>
            <Box className={classes.backgroundContainer}>
                <Box className={classes.background}></Box>
                <style>{zoomanimation}</style>
            </Box>
        </Box>
    );
}

export default AnimatedBackground;