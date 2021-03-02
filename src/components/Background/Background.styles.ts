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
}));
