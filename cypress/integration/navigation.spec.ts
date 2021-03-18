import openDbFile from "../pages/openDbFile";

describe('Navigation', () => {
    beforeEach(() => {
        openDbFile();
    });

    it('should be able to visit open file after loading a game', () => {
        cy.findByText('Prison Architect').should('exist');

        cy.findByTitle('Open').click();

        cy.findByText('Welcome to GOG Galaxy Suggester').should('exist');
    });
})