import { SqlJs } from "sql.js/module";
import initSqlJs from "sql.js";

let db: SqlJs.Database;
initSqlJs()
    .then(SQL => { db = new SQL.Database() })
// .catch(err => this.setState({ err }));

const id = (type: string) => {
    return db.exec(`SELECT id FROM GamePieceTypes WHERE type="${type}"`)[0].values[0][0];
}

export const readGogGames = (file: Blob, onRead: (e: SqlJs.ValueType[][]) => void) => {
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
        var Uints = new Uint8Array(fileReader.result as ArrayBuffer);
        initSqlJs()
            .then(SQL => {

                db = new SQL.Database(Uints);

                let statement1 = db.prepare(`
                            CREATE TEMP VIEW IF NOT EXISTS MasterList AS
                        SELECT GamePieces.releaseKey, GamePieces.gamePieceTypeId, GamePieces.value FROM GameLinks
                        JOIN GamePieces ON GameLinks.releaseKey = GamePieces.releaseKey;

                    `);

                let statement2 = db.prepare(`
                    CREATE TEMP VIEW MasterDB AS SELECT DISTINCT(MasterList.releaseKey) AS releaseKey, MasterList.value AS title, PLATFORMS.value AS platformList
                    FROM MasterList, MasterList AS PLATFORMS
                    WHERE ((MasterList.gamePieceTypeId=${id('originalTitle')}) OR (MasterList.gamePieceTypeId=${id('title')})) AND ((PLATFORMS.releaseKey=MasterList.releaseKey) AND (PLATFORMS.gamePieceTypeId=${id('allGameReleases')}))
                    ORDER BY title
                    ;
                    `);


                statement1.step();
                statement2.step();

                let results = db.exec(`SELECT GROUP_CONCAT(DISTINCT MasterDB.releaseKey), MasterDB.title FROM MasterDB GROUP BY MasterDB.platformList ORDER BY MasterDB.title;`);
                console.log(results);
                onRead(results[0].values);

            })
        // .catch(err => this.setState({ err }));




    }
    fileReader.readAsArrayBuffer(file);

};