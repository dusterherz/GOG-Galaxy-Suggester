import openDbFile from "../fixtures/openDbFile";

describe('Navigation', () => {
    beforeEach(() => {
        openDbFile('twoGames.db');
    });

    it('should be able to visit open file after loading a game', () => {
        cy.findByText(/^(Prison Architect|Rocket League)$/).should('exist');

        cy.findByTitle('Open').click();

        cy.findByText('Welcome to GOG Galaxy Suggester').should('exist');
    });

    it('should be able to get next game', () => {
        cy.findByText(/^(Prison Architect|Rocket League)$/).should('exist');

        cy.findByTitle('Next Game').click();

        cy.findByText(/^(Prison Architect|Rocket League)$/).should('exist');
    });
})