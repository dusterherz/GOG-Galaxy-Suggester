import createTestDb, { runSql } from '../../test_utils/createTestDb';
import { prisonArchitect } from '../../test_utils/gameTestData';

describe('My First Test', () => {
    beforeEach(async () => {
        // let db = await createTestDb();
        // prisonArchitect.forEach(x => runSql(db, x));

        // let data = db.export();
        // let blob = new Blob([data]);
        // let file = new File([blob], "test.db");

        // cy.writeFile('test.db', file, 'binary')
    });

    it('Test main flow', async () => {


        cy.visit('/');





        const dbFile = 'test.db';

        cy.fixture(dbFile, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then(fileContent => {
                cy.get('input[type="file"]').attachFile({ fileContent, filePath: dbFile, encoding: 'utf-8' });
            });

        // cy.get('input[type="file"]')
        //     .attachFile({ filePath: 'galaxy-2.0.db', encoding: 'utf-8' });

        // cy.fixture('galaxy-2.0.db').then(fileContent => {
        //     cy.get('input[type="file"]').attachFile({
        //         fileContent: fileContent.toString(),
        //         fileName: 'galaxy-2.0.db',
        //         mimeType: 'application/x-sqlite3',
        //     });
        // });
    });
})