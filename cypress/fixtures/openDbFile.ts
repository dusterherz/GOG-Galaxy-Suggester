const openDbFile = (dbFile: string) => {
    cy.visit('/');

    cy.fixture(dbFile, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            cy.get('input[type="file"]').attachFile({ fileContent, filePath: dbFile, encoding: 'utf-8' });
        });
}

export default openDbFile;