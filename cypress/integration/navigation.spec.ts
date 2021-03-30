import openDbFile from "../fixtures/openDbFile";
import writeDbFile from "../fixtures/writeDbFile";
import { prisonArchitect, rocketLeague } from "../../test_utils/gameTestData";

describe('Navigation', () => {
    before(() => {
        writeDbFile('navigation.db', prisonArchitect.concat(rocketLeague));
    });

    beforeEach(() => {
        openDbFile('navigation.db');
    });

    it('should be able to visit open file after loading a game', () => {
        cy.findByText(/^(Prison Architect|Rocket League)$/).should('exist');

        cy.findByTitle('Open').click();

        cy.findByText('Welcome to GOG Galaxy Suggester').should('exist');
    });

    it('should be able to get next game', () => {
        cy.findByText(/^(Prison Architect|Rocket League)$/).then($title1 => {
            const title1 = $title1.text();

            cy.findByTitle('Next Game').click();

            cy.findByText(/^(Prison Architect|Rocket League)$/).then($title2 => {

                expect($title2.text()).not.to.eq(title1);
            });
        });
    });
});