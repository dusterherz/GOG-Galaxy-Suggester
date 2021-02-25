import React from "react";
import { Grid, List, ListItem, Typography, Container, Box, Divider, Input, TextField, Button, makeStyles } from '@material-ui/core';
import initSqlJs from "sql.js";
import { SqlJs } from "sql.js/module";
import { DbInputProps } from "./DbInput.types";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));


function DbInput({ onFileChange }: DbInputProps) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField value={'C:\\storage\\galaxy-2.0.db'} ></TextField>
            <input
                accept=".db"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={e => onFileChange(e.target.files === null ? new Blob() : e.target.files[0])}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                    Upload
          </Button>
            </label>
        </div>
    );
}

export default DbInput;