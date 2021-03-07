import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
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
                    <Tooltip title="Open">
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onUploadDbClicked}>
                            <FolderOpenTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Next Game">
                        <div>
                            <IconButton color="inherit" aria-label="menu" onClick={onNextGameClicked} disabled={isNextGameDisabled}>
                                <RefreshTwoToneIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </React.Fragment>);
}