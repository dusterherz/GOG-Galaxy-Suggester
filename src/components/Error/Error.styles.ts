import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    alert: {
        fontSize: '75px',
        marginLeft: '50%',
        transform: 'translate(-50%, 0)',
    },
    message: {
        fontSize: '25px',
        textAlign: 'center',
    },
}));