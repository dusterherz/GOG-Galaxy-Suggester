import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    title: {
        display: 'inline',
        textShadow: '3px 3px 2px' + theme.palette.primary.light,
    },
}));