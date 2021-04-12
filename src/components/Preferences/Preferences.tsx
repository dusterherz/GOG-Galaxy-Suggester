import { List, ListItem, Container, Checkbox, Typography } from '@material-ui/core';
import { preferencesProps } from './Preferences.types';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Preferences = ({
    preferences,
    onPreferencesChanged,
}: preferencesProps) => {

    const handleExcludePlayedChange = (event: { target: { checked: boolean; }; }) => {
        const newPreferences = { ...preferences };
        newPreferences.filters.played = event.target.checked;
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
                                onChange={handleExcludePlayedChange} />
                        }
                        label='Played games'
                    />
                </ListItem>
            </List>
        </Container>
    );
}

export default Preferences;