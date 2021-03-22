import { SqlJs } from "sql.js/module";
import createTestDb, { runSql } from "../../test_utils/createTestDb";

const writeDbFile = (dbFile: string, insertStatements: string[]) => {
    cy.wrap(new Cypress.Promise((resolve, reject) => {
        createTestDb().then(db => {
            resolve(db);
        });
    })).then((db: SqlJs.Database) => {
        insertStatements.forEach(x => runSql(db, x));

        let data = db.export();
        cy.writeFile(`./cypress/fixtures/db/${dbFile}`, Cypress.Blob.arrayBufferToBinaryString(data), {
            encoding: 'binary',
            flag: 'w',
        });
    });
}

export default writeDbFile;