import openDbFile from '../fixtures/openDbFile';
import writeDbFile from '../fixtures/writeDbFile';
import { prisonArchitect } from '../../test_utils/gameTestData';

describe('Game details', () => {
    before(() => {
        writeDbFile('gameDetails.db', prisonArchitect);
    });

    beforeEach(() => {
        openDbFile('gameDetails.db');
    });

    it('all game data visible after loading', () => {
        cy.findByRole('heading', { level: 3 }).should('have.text', 'Prison Architect');
        cy.findAllByRole('heading').contains('Time played').should('have.text', 'Time played: 18 hours 36 minutes');

        cy.findByText(/player takes control of building and running a prison/).should('exist');

        cy.findAllByRole('listitem').contains('Release date: Tue Oct 06 2015').should('exist');
        cy.findAllByRole('listitem').contains('Critics score: 81.0769').should('exist');
        cy.findAllByRole('listitem').contains('Developer: Introversion Software, Double Eleven').should('exist');
        cy.findAllByRole('listitem').contains('Publisher: Introversion Software').should('exist');
        cy.findAllByRole('listitem').contains('Genres: Strategy, Indie, Simulator').should('exist');
        cy.findAllByRole('listitem').contains('Themes: Non-fiction, Sandbox, Business').should('exist');
    });
})