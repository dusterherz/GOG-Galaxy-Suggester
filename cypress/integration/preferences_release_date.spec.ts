import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createMultipleGameData } from "../../test_utils/gameTestData";
import { SliderClicker } from "../../test_utils/sliderClicker";
import { minYear, maxYear } from "../../src/types/preferences"

describe('Preferences on release date', () => {
    before(() => {
        const sqlStatements = createMultipleGameData([
            { title: 'No Release Date Game', releaseDate: null },
            { title: 'Old Game', releaseDate: new Date(minYear + '-01-01') },
            { title: 'New Game', releaseDate: new Date(maxYear + '-01-01') },
        ]);
        writeDbFile('preferences_releasedate.db', sqlStatements);
    });

    beforeEach(() => {
        openDbFile('preferences_releasedate.db');
        cy.findByTitle('Preferences').click();
        cy.findByLabelText('No release date').uncheck();
        cy.findByLabelText('Release date').uncheck();
    });

    it('should filter for games without release date', () => {
        cy.findByLabelText('No release date').check();

        cy.findByTitle('Next Game').click();
        cy.findByText('No Release Date Game').should('exist');
    });

    it('should filter for games with release date', () => {
        cy.findByLabelText('Release date').check();

        cy.findByTitle('Next Game').click();
        cy.findByText(/^(Old Game|New Game)$/).should('exist');
    });

    it('should filter for games newer than 1995', () => {
        cy.findByLabelText('Release date').check();
        cy.findByTestId('releaseYearRange').then(($slider) =>
            SliderClicker.change($slider[0], 1995, minYear, maxYear)
        );

        cy.findByTitle('Next Game').click();
        cy.findByText('New Game').should('exist');
    });

    it('should filter for games older than 2015', () => {
        cy.findByLabelText('Release date').check();
        cy.findByTestId('releaseYearRange').then(($slider) =>
            SliderClicker.change($slider[0], 2015, minYear, maxYear)
        );

        cy.findByTitle('Next Game').click();
        cy.findByText('Old Game').should('exist');
    });
});