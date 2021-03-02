import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        background: 'rgba(0,0,0,0.5)',
        borderBottom: `outset ${theme.palette.grey[600]}`,

    },
    offset: theme.mixins.toolbar,
}));