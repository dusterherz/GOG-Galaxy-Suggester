const openDbFile = (dbFile: string) => {
    cy.visit('/');

    cy.fixture('db/' + dbFile, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            cy.get('input[type="file"]').attachFile({ fileContent, filePath: dbFile, encoding: 'utf-8' });
        });

    cy.findByText('Welcome to GOG Galaxy Suggester').should('not.exist');
    cy.findAllByText('Loading').should('not.exist');
}

export default openDbFile;