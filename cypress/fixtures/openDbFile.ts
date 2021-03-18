export default () => {
    cy.visit('/');

    const dbFile = 'test.db';

    cy.fixture(dbFile, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            cy.get('input[type="file"]').attachFile({ fileContent, filePath: dbFile, encoding: 'utf-8' });
        });
}