import React from "react";
import GameDetailsItem from "./GameDetailsItem";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import getByTextContent from "../../../test_utils/getByTextContent";

describe('GameDetailsItem', () => {
    it('should display title and text', () => {
        render(<GameDetailsItem title='Year' text='1999' />);

        expect(getByTextContent('Year: 1999')).toBeInTheDocument();
    });
});