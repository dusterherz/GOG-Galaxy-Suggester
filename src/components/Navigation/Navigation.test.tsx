import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from './Navigation';
import { navigationPage } from '../../types/navigation';

describe('Navigation', () => {
    function createNavigation(onNavigationChanged: (navigation: navigationPage) => void, isNextGameDisabled: any) {
        render(<Navigation onNavigationChanged={onNavigationChanged} isNextGameDisabled={isNextGameDisabled ?? false} />);
    }

    it('should change navigation to Open File when Open button is clicked', () => {
        const onNavigationChanged = jest.fn()
        createNavigation(onNavigationChanged, null);

        fireEvent.click(screen.getByTitle('Open'));

        expect(onNavigationChanged).toHaveBeenCalledWith(navigationPage.openFile);
    });

    it('should change navigation to Game Details when Next Game button is clicked', () => {
        const onNavigationChanged = jest.fn();
        createNavigation(onNavigationChanged, null);

        const nextGameButton = screen.getByTestId('nextGameButton');
        fireEvent.click(nextGameButton);

        expect(onNavigationChanged).toHaveBeenCalledWith(navigationPage.gameDetails);
    });

    it('should not change navigation when Next Game button is clicked and disabled', () => {
        const onNavigationChanged = jest.fn();
        createNavigation(onNavigationChanged, true);

        const nextGameButton = screen.getByTestId('nextGameButton');
        fireEvent.click(nextGameButton);

        expect(nextGameButton).toBeDisabled();
        expect(onNavigationChanged).toHaveBeenCalledTimes(0);
    });
});