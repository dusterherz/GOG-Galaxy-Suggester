import { Container, Checkbox, Grid, Typography } from '@material-ui/core';
import { preferencesProps } from './Preferences.types';
import useStyles from './Preferences.styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';

const Preferences = ({
    preferences,
    onPreferencesChanged,
}: preferencesProps) => {

    const classes = useStyles();

    const handleChange = (event: { target: any; }) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const newPreferences = { ...preferences };
        const newFilters: any = { ...preferences.filters };
        newFilters[name] = value;
        newPreferences.filters = newFilters;
        onPreferencesChanged(newPreferences);
    }

    const handleSliderChange = (event: any, newValue: number | number[], name: string) => {
        const newPreferences = { ...preferences };
        const newFilters: any = { ...preferences.filters };
        newFilters[name] = newValue as number[];
        newPreferences.filters = newFilters;
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
                    <FormControlLabel control={
                        <Checkbox
                            name='unplayed'
                            checked={preferences.filters.unplayed}
                            onChange={handleChange} />
                    }
                        label='Unplayed games'
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormControlLabel control={
                        <Checkbox
                            name='played'
                            checked={preferences.filters.played}
                            onChange={handleChange} />
                    }
                        label='Played games'
                    />
                </Grid>
                <Grid item xs={12} ><Typography variant='h6'>Critics Score:</Typography></Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withoutCriticsScore'
                            checked={preferences.filters.withoutCriticsScore}
                            onChange={handleChange} />
                    }
                        label='No critics score'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withCriticsScore'
                            checked={preferences.filters.withCriticsScore}
                            onChange={handleChange} />
                    }
                        label='Critics score'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography id="score-slider" gutterBottom>Score range</Typography>
                    <Slider
                        name='criticsScore'
                        value={preferences.filters.criticsScore}
                        onChange={(event, value) => handleSliderChange(event, value, 'criticsScore')}
                        disabled={!preferences.filters.withCriticsScore}
                        valueLabelDisplay="auto"
                        aria-labelledby="critics-score-range"
                        data-testId="criticsScoreRange"
                    />
                </Grid>
                <Grid item xs={12} ><Typography variant='h6'>Release Date:</Typography></Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withoutReleaseDate'
                            checked={preferences.filters.withoutReleaseDate}
                            onChange={handleChange} />
                    }
                        label='No release date'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withReleaseDate'
                            checked={preferences.filters.withReleaseDate}
                            onChange={handleChange} />
                    }
                        label='Release date'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography gutterBottom>Release year</Typography>
                    <Slider
                        name='releaseYear'
                        min={1980}
                        max={new Date().getFullYear() + 1}
                        value={preferences.filters.releaseYear}
                        onChange={(event, value) => handleSliderChange(event, value, 'releaseYear')}
                        disabled={!preferences.filters.withReleaseDate}
                        valueLabelDisplay="auto"
                        aria-labelledby="release-year-range"
                        data-testId="releaseYearRange"
                        data-name="releaseYear"
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Preferences;