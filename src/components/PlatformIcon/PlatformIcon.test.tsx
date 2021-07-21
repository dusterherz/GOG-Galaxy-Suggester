import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PlatformIcon from './PlatformIcon';

describe('PlatformIcon should', () => {
    it('show Battle.net icon when platform is Battle.net', () => {
        render(<PlatformIcon releaseKey={'battlenet_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Battle.net')).toBeInTheDocument();
    });

    it('show Bethesda.net icon when platform is Bethesda.net', () => {
        render(<PlatformIcon releaseKey={'bethesda_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Bethesda.net')).toBeInTheDocument();
    });

    it('show Epic icon when platform is Epic Games Store', () => {
        render(<PlatformIcon releaseKey={'epic_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Epic Games Store')).toBeInTheDocument();
    });

    it('show gog icon when platform is GOG', () => {
        render(<PlatformIcon releaseKey={'gog_123'}></PlatformIcon>);
        expect(screen.queryByTitle('GOG')).toBeInTheDocument();
    });

    it('show Humble Bundle icon when platform is Humble Bundle', () => {
        render(<PlatformIcon releaseKey={'humble_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Humble Bundle')).toBeInTheDocument();
    });

    it('show Origin icon when platform is Origin', () => {
        render(<PlatformIcon releaseKey={'origin_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Origin')).toBeInTheDocument();
    });

    it('show Paradox icon when platform is Paradox Plaza', () => {
        render(<PlatformIcon releaseKey={'paradox_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Paradox Plaza')).toBeInTheDocument();
    });

    it('show PlayStation icon when platform is PlayStation Network', () => {
        render(<PlatformIcon releaseKey={'psn_123'}></PlatformIcon>);
        expect(screen.queryByTitle('PlayStation Network')).toBeInTheDocument();
    });

    it('show Steam icon when platform is Steam', () => {
        render(<PlatformIcon releaseKey={'steam_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Steam')).toBeInTheDocument();
    });

    it('show Ubisoft icon when platform is uplay', () => {
        render(<PlatformIcon releaseKey={'uplay_213'}></PlatformIcon>);
        expect(screen.queryByTitle('Ubisoft Connect')).toBeInTheDocument();
    });

    it('show Xbox icon when platform is Xbox Live', () => {
        render(<PlatformIcon releaseKey={'xboxone_123'}></PlatformIcon>);
        expect(screen.queryByTitle('Xbox Live')).toBeInTheDocument();
    });

    it('show default gog galaxy icon when platform is unknown', () => {
        render(<PlatformIcon releaseKey={'somerandomtestplatform_123'}></PlatformIcon>);
        expect(screen.queryByTitle('somerandomtestplatform')).toBeInTheDocument();
    });

});