import { List, ListItem, Container, Checkbox } from '@material-ui/core';
import { preferencesProps } from './Preferences.types';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Preferences = ({
    preferences,
    onPreferencesChanged,
}: preferencesProps) => {

    const handleExcludePlayedChange = (event: { target: { checked: boolean; }; }) => {
        const newPreferences = { ...preferences };
        newPreferences.filters.excludePlayed = event.target.checked;
        onPreferencesChanged(newPreferences);
    };

    return (
        <Container>
            <List>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={preferences.filters.excludePlayed}
                                onChange={handleExcludePlayedChange} />
                        }
                        label='Only unplayed games'
                    />

                </ListItem>
            </List>
        </Container>
    );
}

export default Preferences;