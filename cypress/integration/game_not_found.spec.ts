import { createGameData } from "../../test_utils/gameTestData";
import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";

describe('Game Not Found', () => {
    before(() => {
        const played_game = createGameData({ id: 2, releaseKey: 'test_2', title: 'Played Game', gameMinutes: 10 });
        writeDbFile('gameNotFound.db', played_game);
    });

    beforeEach(() => {
        openDbFile('gameNotFound.db');

        cy.findByText('Welcome to GOG Galaxy Suggester').should('not.exist');
        cy.findAllByText('Loading').should('not.exist');
    });

    it('should show game not found page when no game matches the filters', () => {
        cy.findByTitle('Preferences').click();
        cy.findByLabelText('Played games').uncheck();

        cy.findByTitle('Next Game').click();
        cy.findByText("We couldn't find any game that matches your given criteria.").should('exist');
    });
});
