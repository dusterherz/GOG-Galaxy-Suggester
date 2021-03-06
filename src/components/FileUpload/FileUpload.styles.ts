import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    gogDbTextField: {
        minWidth: '420px',
    },
    openButton: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.action.active,
    },
    arrow: {
        marginTop: theme.spacing(1),
        display: 'inline',
    },
    step1Text: {
        display: 'inline',
        verticalAlign: 'text-bottom',
    },
    image: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));
