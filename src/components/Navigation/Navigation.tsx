import React from 'react';
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import TuneTwoToneIcon from '@material-ui/icons/TuneTwoTone';
import useStyles from './Navigation.styles'
import { navigationProps } from "./Navigation.types";
import { navigationPage } from '../../types/navigation';

const Navigation = ({
    onNavigationChanged,
    isNextGameDisabled,
}: navigationProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <Tooltip title="Open">
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => { onNavigationChanged(navigationPage.openFile) }}>
                            <FolderOpenTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Next Game">
                        <div>
                            <IconButton color="inherit" aria-label="menu" onClick={() => { onNavigationChanged(navigationPage.gameDetails) }} disabled={isNextGameDisabled} data-testid='nextGameButton'>
                                <RefreshTwoToneIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Preferences">
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => { onNavigationChanged(navigationPage.preferences) }}>
                            <TuneTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </React.Fragment>);
}

export default Navigation;