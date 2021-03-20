import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultilineText from './MultilineText';

describe('MultilineText', () => {
    it('should show set text', () => {
        render(<MultilineText text={'this is a test text.'}></MultilineText>);

        expect(screen.getByText('this is a test text.')).toBeInTheDocument();
    });

    it('should replace new line with <br>', () => {
        render(<MultilineText text={'one\\ntwo'}></MultilineText>);

        expect(screen.getByText('one')).toBeInTheDocument();
        expect(screen.getByText('two')).toBeInTheDocument();
    });
});
