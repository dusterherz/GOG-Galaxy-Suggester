import classes from "*.module.css";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import React from "react";
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import useStyles from './Navigation.styles'
import { navigationProps } from "./Navigation.types";

export default ({
    onUploadDbClicked,
    onNextGameClicked,
    isNextGameDisabled,
}: navigationProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={onUploadDbClicked}>
                        <FolderOpenTwoToneIcon />
                    </IconButton>
                    <IconButton color="inherit" aria-label="menu" onClick={onNextGameClicked} disabled={isNextGameDisabled}>
                        <RefreshTwoToneIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </React.Fragment>);
}