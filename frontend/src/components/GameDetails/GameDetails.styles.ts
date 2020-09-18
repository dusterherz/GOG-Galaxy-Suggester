import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.dark,
        backgroundImage: (props: any) => `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    gradient: {
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.9) 100%);',
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

