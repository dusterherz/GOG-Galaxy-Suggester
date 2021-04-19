import { Container, Checkbox, Grid, Typography } from '@material-ui/core';
import { preferencesProps } from './Preferences.types';
import useStyles from './Preferences.styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Preferences = ({
    preferences,
    onPreferencesChanged,
}: preferencesProps) => {

    const classes = useStyles();

    const handlePlayedChange = (event: { target: { checked: boolean; }; }) => {
        const newPreferences = { ...preferences };
        newPreferences.filters.played = event.target.checked;
        onPreferencesChanged(newPreferences);
    };

    const handleUnplayedChange = (event: { target: { checked: boolean; }; }) => {
        const newPreferences = { ...preferences };
        newPreferences.filters.unplayed = event.target.checked;
        onPreferencesChanged(newPreferences);
    };

    const handleNoCriticsScoreChange = (event: { target: { checked: boolean; }; }) => {
        const newPreferences = { ...preferences };
        newPreferences.filters.withoutCriticsScore = event.target.checked;
        onPreferencesChanged(newPreferences);
    };

    return (
        <Container>
            <Typography variant='h4' className={classes.header}>Here you can configure the mighty recommendation engine</Typography>

            <Grid container>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant='h5'>Filters</Typography>
                </Grid>
                <Grid item xs={12}><Typography variant='h6'>Game Time:</Typography></Grid>
                <Grid item xs={12} lg={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={preferences.filters.unplayed}
                                onChange={handleUnplayedChange} />
                        }
                        label='Unplayed games'
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={preferences.filters.played}
                                onChange={handlePlayedChange} />
                        }
                        label='Played games'
                    />
                </Grid>
                <Grid item xs={12} ><Typography variant='h6'>Critics Score:</Typography></Grid>
                <Grid item xs={12} lg={6}><FormControlLabel
                    control={
                        <Checkbox
                            checked={preferences.filters.withoutCriticsScore}
                            onChange={handleNoCriticsScoreChange} />
                    }
                    label='No critics score'
                /></Grid>
                <Grid item xs={12} lg={6}></Grid>
            </Grid>



        </Container>
    );
}

export default Preferences;