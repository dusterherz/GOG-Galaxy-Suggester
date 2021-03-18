describe('Open file page', () => {
    const gogDbLocation = 'C:\\ProgramData\\GOG.com\\Galaxy\\storage\\galaxy-2.0.db';

    it('should contain information fields', () => {
        cy.visit('/');
        cy.findByRole('heading', { level: 4 }).should('have.text', 'Welcome to GOG Galaxy Suggester');

        cy.findAllByRole('heading').contains('GOG Galaxy Suggester is here to help!').should('exist');
        cy.findAllByRole('heading').contains('First you will need to have GOG Galaxy installed with all desired integration plugins connected.').should('exist');
    });

    it('should copy text to clipboard', () => {
        cy.visit('/');

        const gogDbTextBox = cy.findByRole('textbox');
        gogDbTextBox.should('have.value', gogDbLocation);
        gogDbTextBox.click();
        cy.findByRole('tooltip').should('have.text', 'Copied!');

        // TODO: test pasting, cannot get it to work
        // const promise = new Cypress.Promise(resolve => {
        //     navigator.clipboard.readText().then(x => {
        //         resolve(x);
        //     });
        // });


        // cy.wrap(promise).should('eq', gogDbLocation);
    });
});