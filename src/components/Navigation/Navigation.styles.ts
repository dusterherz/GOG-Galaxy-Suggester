import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.grey[900],
        // position: 'fixed',
        // width: '100vw',
        // zIndex: 999,
        // background: 'rgba(0,0,0,0.5)',
        // borderBottom: '5px ridge rgba(255,255,255,0.4)',

    },
    offset: theme.mixins.toolbar,
}));