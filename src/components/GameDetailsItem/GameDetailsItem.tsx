import { gameDetailsItemProps } from "./GameDetailsItem.types";
import React from "react";
import Box from "@material-ui/core/Box";
import createStyles from './GameDetailsItem.styles'
import { Typography } from "@material-ui/core";

function GameDetailsItem({ title, text }: gameDetailsItemProps) {
    const classes = createStyles();
    return (
        <Box><Typography className={classes.title} component='div'>{title}:</Typography> {text}</Box>
    );
}

export default GameDetailsItem;

