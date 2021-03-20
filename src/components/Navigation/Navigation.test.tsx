import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from './Navigation';

describe('Navigation', () => {
    function createNavigation(onUploadDbClicked: any, onNextGameClicked: any, isNextGameDisabled: any) {
        render(<Navigation onUploadDbClicked={onUploadDbClicked} onNextGameClicked={onNextGameClicked} isNextGameDisabled={isNextGameDisabled ?? false} />);
    }

    it('should invoke onUploadDbClicked() when Open button is clicked', () => {
        const onUploadDbClicked = jest.fn()
        createNavigation(onUploadDbClicked, null, null);

        fireEvent.click(screen.getByTitle('Open'));

        expect(onUploadDbClicked).toHaveBeenCalled();
    });

    it('should invoke onNextGameClicked() when Next Game button is clicked', () => {
        const onNextGameClicked = jest.fn()
        createNavigation(null, onNextGameClicked, null);

        const nextGameButton = screen.getByTestId('nextGameButton');
        fireEvent.click(nextGameButton);

        expect(onNextGameClicked).toHaveBeenCalled();
    });

    it('should not invoke onNextGameClicked() when Next Game button is clicked and disabled', () => {
        const onNextGameClicked = jest.fn()
        createNavigation(null, onNextGameClicked, true);

        const nextGameButton = screen.getByTestId('nextGameButton');
        fireEvent.click(nextGameButton);

        expect(nextGameButton).toBeDisabled();
        expect(onNextGameClicked).toHaveBeenCalledTimes(0);
    });
});