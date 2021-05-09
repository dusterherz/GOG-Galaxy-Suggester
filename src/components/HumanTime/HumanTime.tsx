import { humanTimeProps } from "./HumanTime.types";
import useStyles from './HumanTime.styles';
import { minutesToHumanTime } from '../../utils/humanTime';

function HumanTime({ minutes }: humanTimeProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {minutesToHumanTime(minutes)}
        </div>);
}

export default HumanTime;