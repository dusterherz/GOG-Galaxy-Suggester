import { Grid, Typography, Radio } from '@material-ui/core';
import { biasProps } from './Bias.types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { bias } from '../../../types/preferences';
import { Divider } from '@material-ui/core';


const Bias = ({
    headerText,
    name,
    biasValue,
    preferences,
    onPreferencesChanged,
}: biasProps) => {

    const handleBiasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPreferences = { ...preferences };
        const newBiases: { [key: string]: bias } = {};
        const newBias: bias = parseInt(event.target.value) as bias;
        const biasName: string = event.target.name.split('-')[0];
        newBiases[biasName] = newBias;
        newPreferences.biases = { ...preferences.biases, ...newBiases }
        onPreferencesChanged(newPreferences);
    };

    return (
        <>
            <Grid item xs={12} ><Typography variant='h6'>{headerText}</Typography></Grid>
            <Grid item xs={4} >
                <FormControlLabel control={
                    <Radio
                        checked={biasValue === bias.ignore}
                        onChange={handleBiasChange}
                        value={bias.ignore}
                        name={`${name}-ignore`}
                        inputProps={{ 'aria-label': 'Ignore' }}
                    />
                }
                    label='Ignore'
                />
            </Grid>
            <Grid item xs={4} >
                <FormControlLabel control={
                    <Radio
                        checked={biasValue === bias.similar}
                        onChange={handleBiasChange}
                        value={bias.similar}
                        name={`${name}-similar`}
                        inputProps={{ 'aria-label': 'Similar' }}
                    />
                }
                    label='Similar'
                />
            </Grid>
            <Grid item xs={4} >
                <FormControlLabel control={
                    <Radio
                        checked={biasValue === bias.different}
                        onChange={handleBiasChange}
                        value={bias.different}
                        name={`${name}-different`}
                        inputProps={{ 'aria-label': 'Different' }}
                    />
                }
                    label='Different'
                />
            </Grid>
            <Grid item xs={12} >
                <Divider></Divider>
            </Grid>
        </>
    );
}

export default Bias;