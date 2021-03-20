import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HumanTime from './HumanTime';

describe('HumanTime', () => {
    function createHumanTime(minutes: number) {
        render(<HumanTime minutes={minutes}></HumanTime>);
    }

    it('should return 30 minutes, when 30 minutes given', () => {
        createHumanTime(30);

        expect(screen.getByText('30 minutes')).toBeInTheDocument();
    });

    it('should return 31 minute, when 31 minute given', () => {
        createHumanTime(31);

        expect(screen.getByText('31 minute')).toBeInTheDocument();
    });

    it('should return 11 minutes, when 11 minutes given', () => {
        createHumanTime(11);

        expect(screen.getByText('11 minutes')).toBeInTheDocument();
    });

    it('should return 1 hour, when 60 minutes given', () => {
        createHumanTime(60);

        expect(screen.getByText('1 hour')).toBeInTheDocument();
    });

    it('should return 2 hours, when 120 minutes given', () => {
        createHumanTime(120);

        expect(screen.getByText('2 hours')).toBeInTheDocument();
    });

    it('should return 11 hours, when 11 hours given', () => {
        createHumanTime(11 * 60);

        expect(screen.getByText('11 hours')).toBeInTheDocument();
    });

    it('should return 1 hour 5 minutes, when 65 minutes given', () => {
        createHumanTime(65);

        expect(screen.getByText('1 hour 5 minutes')).toBeInTheDocument();
    });

    it('should return 2 hours 21 minute, when 141 minute given', () => {
        createHumanTime(141);

        expect(screen.getByText('2 hours 21 minute')).toBeInTheDocument();
    });

    it('should return 111 hours, when 111 hours given', () => {
        createHumanTime(111 * 60);

        expect(screen.getByText('111 hours')).toBeInTheDocument();
    });

    it('should return 0 minutes, when 0 minutes given', () => {
        createHumanTime(0);

        expect(screen.getByText('0 minutes')).toBeInTheDocument();
    });
});


