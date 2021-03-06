import makeStyles from "@material-ui/core/styles/makeStyles";
import { purple } from "@material-ui/core/colors";

export default makeStyles(theme => ({
    root: {
        minHeight: theme.spacing(15),
    },
    number: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        [theme.breakpoints.down('xs')]: {
            margin: 'auto',
            marginTop: theme.spacing(1),
        },
    },
}));