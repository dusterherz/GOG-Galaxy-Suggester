import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlatformDisplay from './PlatformDisplay';

describe('PlatformDisplay', () => {
    it('should display an icon when one platform given', () => {
        render(<PlatformDisplay releaseKeys={['steam_123']}></PlatformDisplay>)
        expect(screen.queryAllByRole('img')).toHaveLength(1);
    })

    it('should display three icons when three platforms given', () => {
        render(<PlatformDisplay releaseKeys={['steam_123', 'humble_game', 'ps2_9494949']}></PlatformDisplay>)
        expect(screen.queryAllByRole('img')).toHaveLength(3);
    })
})