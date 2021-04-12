import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createGameData } from "../../test_utils/gameTestData";

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
        // const high_score_game = createGameData({ id: 2, releaseKey: 'test_2', title: 'Super Good Game', criticsScore: 100 });
        writeDbFile('preferences_criticsscore.db', unrated_game);
    });

    beforeEach(() => {
        openDbFile('preferences_criticsscore.db');
        cy.findByTitle('Preferences').click();
        cy.findByLabelText('No critics score').uncheck();
    });

    it('should filter for games without critics score', () => {
        cy.findByLabelText('No critics score').check();

        cy.findByTitle('Next Game').click();
        cy.findByText('No Critics Score Game').should('exist');
    });
});
