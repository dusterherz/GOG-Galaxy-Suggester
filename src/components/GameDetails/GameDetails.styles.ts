import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
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
