import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { createGameData } from "../../test_utils/gameTestData";

describe('Preferences', () => {
    before(() => {
        const unplayed_game = createGameData({ id: 1, releaseKey: 'test_1', title: 'Unplayed Game', gameMinutes: 0 });
        const played_game = createGameData({ id: 2, releaseKey: 'test_2', title: 'Played Game', gameMinutes: 10 });
        writeDbFile('preferences.db', unplayed_game.concat(played_game));
    });

    beforeEach(() => {
        openDbFile('preferences.db');

        cy.findByText('Welcome to GOG Galaxy Suggester').should('not.exist');
        cy.findAllByText('Loading').should('not.exist');
    });

    it('should filter for unplayed games', () => {
        cy.findByTitle('Preferences').click();
        cy.findByLabelText('Only unplayed games').check();

        cy.findByTitle('Next Game').click();
        cy.findByText('Unplayed Game').should('exist');
    });
});