import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Preferences from './Preferences';
import { preferences, allowAllFilter } from '../../types/preferences';
import { SliderClicker } from '../../../test_utils/sliderClicker';

describe('Preferences', () => {
    const createInitialPreferences = (): preferences => {
        return {
            filters: {
                ...allowAllFilter
            }
        };
    }

    const createExpectedPreferences = (initialPreferences: preferences): preferences => {
        let expectedPreferences: preferences = { ...initialPreferences };
        expectedPreferences.filters = { ...initialPreferences.filters };
        return expectedPreferences;
    }

    it('should change played games to false when played games is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
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

    it('should change unplayed games to false when unplayed games is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.unplayed = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Unplayed games'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should change without critics score to false when games without critics score is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withoutCriticsScore = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('No critics score'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should change with critics score to false when games with critics score is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withCriticsScore = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Critics score'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should minimum critics score to 25 when minimum score range slider is set to 25', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.criticsScore = [25, 100];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('criticsScoreRange'), 25)

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should maximum critics score to 75 when maximum score range slider is set to 75', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.criticsScore = [0, 75];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('criticsScoreRange'), 75)

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });




    it('should change without release date to false when games without release date is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withoutReleaseDate = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('No release date'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should change with release date to false when games with release date is unchecked', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.withReleaseDate = false;
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        fireEvent.click(screen.getByLabelText('Release date'));

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should set minimum release year to 1990 when minimum release year range slider is set to 1990', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.releaseYear = [1990, initialPreferences.filters.releaseYear[1]];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('releaseYearRange'), 1990, initialPreferences.filters.releaseYear[0], initialPreferences.filters.releaseYear[1])

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });

    it('should maximum release year to 2010 when maximum release year range slider is set to 2010', () => {
        const initialPreferences: preferences = createInitialPreferences();
        let expectedPreferences: preferences = createExpectedPreferences(initialPreferences);
        expectedPreferences.filters.releaseYear = [initialPreferences.filters.releaseYear[0], 2010];
        const onPreferencesChanged = jest.fn();
        const preferencesProps = {
            preferences: initialPreferences,
            onPreferencesChanged: onPreferencesChanged,
        }
        render(<Preferences {...preferencesProps} />);

        SliderClicker.change(screen.getByTestId('releaseYearRange'), 2010, initialPreferences.filters.releaseYear[0], initialPreferences.filters.releaseYear[1])

        expect(onPreferencesChanged).toHaveBeenLastCalledWith(expectedPreferences);
    });
});
