import React from "react";
import { TextField, Button, Typography, Container, ClickAwayListener, Tooltip, withStyles } from '@material-ui/core';
import { FileUploadProps } from "./FileUpload.types";
import TutorialPoint from "../TutorialPoint/TutorialPoint";
import pasteAndOpen from './pasteAndOpen.jpg';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import useStyles from './FileUpload.styles'

const galaxyDbPath = 'C:\\ProgramData\\GOG.com\\Galaxy\\storage\\galaxy-2.0.db';

function FileUpload({ onFileChange }: FileUploadProps) {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const classes = useStyles();

    const SecondaryColorTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            fontWeight: "bold",
        },
    }))(Tooltip);

    return (
        <Container maxWidth={'md'} className={classes.root}>
            <Typography variant='h4'>Welcome to GOG Galaxy Suggester</Typography>
            <Typography variant='subtitle1'>If you ever had the difficulty picking your next to play game, don't fret, GOG Galaxy Suggester is here to help! It will pick a random game from your library for you, so you don't have to decide.</Typography>
            <Typography variant='subtitle1'>First you will need to have GOG Galaxy installed with all desired integration plugins connected. Then follow these steps below.</Typography>
            <TutorialPoint number={1}>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <SecondaryColorTooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={open}
                            placement="right"
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copied!"
                        >
                            <TextField value={galaxyDbPath} onClick={() => { navigator.clipboard.writeText(galaxyDbPath); handleTooltipOpen() }} className={classes.gogDbTextField}></TextField>
                        </SecondaryColorTooltip>
                    </div>
                </ClickAwayListener>
                <ArrowUpwardIcon className={classes.arrow} />
                <Typography className={classes.step1Text}>Click to copy to clipboard (default location).
                </Typography>
            </TutorialPoint>
            <TutorialPoint number={2}>
                <Typography>You'll have to paste the copied path to the File name field and click open.</Typography>
                <img className={classes.image} src={pasteAndOpen} alt="Paste and open" />
            </TutorialPoint>
            <TutorialPoint number={3}>
                <input
                    accept=".db"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={e => onFileChange(e.target.files === null ? new Blob() : e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.openButton}>
                        Open
                    </Button>
                </label>
                <Typography>Now click the button and open the file.</Typography>
            </TutorialPoint>



        </Container >
    );
}

export default FileUpload;