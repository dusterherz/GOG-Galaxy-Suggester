import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
    root: {
        minHeight: '100vh',
    },
    gradient: {
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.9) 100%);',
        position: 'relative',
        overflowX: 'hidden',
    },
    header: {
        textAlign: 'center',
        padding: theme.spacing(2),
    },
    summary: {
        padding: theme.spacing(2),
    },
    divider: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));
