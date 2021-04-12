import { List, ListItem, Container, Checkbox, Typography } from '@material-ui/core';
import { preferencesProps } from './Preferences.types';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Preferences = ({
    preferences,
    onPreferencesChanged,
}: preferencesProps) => {

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
            <Typography variant='h4'>Here you can configure the mighty recommendation engine</Typography>
            <List>
                <Typography variant='h5'>Show:</Typography>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={preferences.filters.played}
                                onChange={handlePlayedChange} />
                        }
                        label='Played games'
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={preferences.filters.unplayed}
                                onChange={handleUnplayedChange} />
                        }
                        label='Unplayed games'
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={preferences.filters.withoutCriticsScore}
                                onChange={handleNoCriticsScoreChange} />
                        }
                        label='No critics score'
                    />
                </ListItem>
            </List>
        </Container>
    );
}

export default Preferences;