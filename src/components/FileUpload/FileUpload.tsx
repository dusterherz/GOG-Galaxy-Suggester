import React from "react";
import { TextField, Button, makeStyles } from '@material-ui/core';
import { FileUploadProps } from "./FileUpload.types";

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


function FileUpload({ onFileChange }: FileUploadProps) {

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

export default FileUpload;