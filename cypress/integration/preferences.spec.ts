import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createGameData } from "../../test_utils/gameTestData";
import { SliderClicker } from "../../test_utils/sliderClicker";
import { minYear, maxYear } from "../../src/types/preferences"

describe('Preferences on game time', () => {
    before(() => {
        const unplayed_game = createGameData({ id: 1, releaseKey: 'test_1', title: 'Unplayed Game', gameMinutes: 0 });
        const played_game = createGameData({ id: 2, releaseKey: 'test_2', title: 'Played Game', gameMinutes: 10 });
        writeDbFile('preferences_gametime.db', unplayed_game.concat(played_game));
    });

    beforeEach(() => {
        openDbFile('preferences_gametime.db');
        cy.findByTitle('Preferences').click();
        cy.findByLabelText('Played games').uncheck();
        cy.findByLabelText('Unplayed games').uncheck();
    });

    it('should filter for unplayed games', () => {
        cy.findByLabelText('Unplayed games').check();

        cy.findByTitle('Next Game').click();
        cy.findByText('Unplayed Game').should('exist');
    });

    it('should filter for played games', () => {
        cy.findByLabelText('Played games').check();

        cy.findByTitle('Next Game').click();
        cy.findByText('Played Game').should('exist');
    });
});

describe('Preferences on critics score', () => {
    before(() => {
        const unrated_game = createGameData({ id: 1, releaseKey: 'test_1', title: 'No Critics Score Game', criticsScore: null });
        const high_score_game = createGameData({ id: 2, releaseKey: 'test_2', title: 'Super Good Game', criticsScore: 100 });
        const low_score_game = createGameData({ id: 3, releaseKey: 'test_3', title: 'Bad Game', criticsScore: 0 });
        writeDbFile('preferences_criticsscore.db', unrated_game.concat(high_score_game).concat(low_score_game));
    });

    beforeEach(() => {
        openDbFile('preferences_criticsscore.db');
        cy.findByTitle('Preferences').click();
        cy.findByLabelText('No critics score').uncheck();
        cy.findByLabelText('Critics score').uncheck();
    });

    it('should filter for games without critics score', () => {
        cy.findByLabelText('No critics score').check();

        cy.findByTitle('Next Game').click();
        cy.findByText('No Critics Score Game').should('exist');
    });

    it('should filter for games with critics score', () => {
        cy.findByLabelText('Critics score').check();

        cy.findByTitle('Next Game').click();
        cy.findByText(/^(Super Good Game|Bad Game)$/).should('exist');
    });

    it('should filter for games with critics score above 25', () => {
        cy.findByLabelText('Critics score').check();
        cy.findByTestId('criticsScoreRange').then(($slider) => SliderClicker.change($slider[0], 25));

        cy.findByTitle('Next Game').click();
        cy.findByText('Super Good Game').should('exist');
    });

    it('should filter for games with critics score below 75', () => {
        cy.findByLabelText('Critics score').check();
        cy.findByTestId('criticsScoreRange').then(($slider) => SliderClicker.change($slider[0], 75));

        cy.findByTitle('Next Game').click();
        cy.findByText('Bad Game').should('exist');
    });
});

describe('Preferences on release date', () => {
    before(() => {
        const no_release_date = createGameData({ id: 1, releaseKey: 'test_1', title: 'No Release Date Game', releaseDate: null });
        const old_game = createGameData({ id: 2, releaseKey: 'test_2', title: 'Old Game', releaseDate: new Date(minYear + '-01-01') });
        const new_game = createGameData({ id: 3, releaseKey: 'test_3', title: 'New Game', releaseDate: new Date(maxYear + '-01-01') });
        writeDbFile('preferences_releasedate.db', no_release_date.concat(old_game).concat(new_game));
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
