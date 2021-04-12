import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Preferences from './Preferences';
import { preferences } from '../../types/preferences';

describe('Preferences', () => {

    it('should change exclude played to true when only unplayed games is checked', () => {
        const initialPreferences: preferences = {
            filters: {
                played: true,
            }
        };
        let expectedPreferences: preferences = { ...initialPreferences };
        expectedPreferences.filters = { ...initialPreferences.filters };
        expectedPreferences.filters.played = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Played games'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });
});