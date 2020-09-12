import { makeStyles, Theme } from "@material-ui/core";
import { gameDetailsProps } from "./GameDetails.types";

export default makeStyles(theme => ({
    background: {
        height: '100vh',
        backgroundImage: (props: any) => `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    root: {
        height: '100vh',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 100%);',
    },
    header: {
        textAlign: 'center',
    },
}));

