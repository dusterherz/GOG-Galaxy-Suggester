import { SqlJs } from "sql.js/module";
import initSqlJs from "sql.js";
import { readGogGames } from "./gogDb";
import each from 'jest-each';
import { cyberpunkGoodies_dlc, galaxyBeta_notVisibleInLibrary, prisonArchitect } from "./gogDb.integration.test.data";

let db: SqlJs.Database;

const runSql = (sql: string) => {
  let statement = db.prepare(sql);
  statement.step();
  statement.free();
}

const createGameLinks = () => {
  let createTable = `
    -- Script Date: 2021-03-03 23:22  - ErikEJ.SqlCeScripting version 3.5.2.86
    CREATE TABLE [GameLinks] (
      [releaseKey] text NOT NULL
    , [userId] int64 NOT NULL
    , [gameId] text NULL
    );
    CREATE UNIQUE INDEX [GameLinks_sqlite_autoindex_GameLinks_1] ON [GameLinks] ([releaseKey] ASC,[userId] ASC);
  `;
  runSql(createTable);
}

const createGamePieceTypes = () => {
  let createTable = `
    -- Script Date: 2021-03-03 23:27  - ErikEJ.SqlCeScripting version 3.5.2.86
    CREATE TABLE [GamePieceTypes] (
      [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
    , [type] text NOT NULL
    );
    CREATE UNIQUE INDEX [GamePieceTypes_sqlite_autoindex_GamePieceTypes_1] ON [GamePieceTypes] ([type] ASC);
  `;
  runSql(createTable);

  let addData = [`
    -- Script Date: 2021-03-04 17:46  - ErikEJ.SqlCeScripting version 3.5.2.86
    INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    1,'myRating');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    30,'allGameReleases');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    31,'dlcs');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    32,'media');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    33,'originalImages');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    34,'originalMeta');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    35,'originalTitle');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    36,'osCompatibility');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    72,'myAchievementsCount');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    101,'meta');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    102,'summary');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    103,'title');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    475,'changelog');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    476,'goodies');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    477,'isPreorder');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    478,'productLinks');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    8631,'friendsOwning');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    8632,'myFriendsActivity');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    14676,'originalSortingTitle');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    14687,'sortingTitle');
    `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
    22367,'parent');
  `];
  addData.forEach(runSql);
}

const createGamePieces = () => {
  let createTable = `
    -- Script Date: 2021-03-03 23:24  - ErikEJ.SqlCeScripting version 3.5.2.86
    CREATE TABLE [GamePieces] (
      [releaseKey] text NOT NULL
    , [gamePieceTypeId] bigint NOT NULL
    , [userId] int64 NULL
    , [value] text NOT NULL
    );
    CREATE UNIQUE INDEX [GamePieces_sqlite_autoindex_GamePieces_1] ON [GamePieces] ([releaseKey] ASC,[gamePieceTypeId] ASC,[userId] ASC);
  `;
  runSql(createTable);
}

const createGameTimes = () => {
  let createTable = `
    -- Script Date: 2021-03-03 23:25  - ErikEJ.SqlCeScripting version 3.5.2.86
    CREATE TABLE [GameTimes] (
      [userId] int64 NOT NULL
    , [releaseKey] text NOT NULL
    , [minutesInGame] bigint NOT NULL
    );
    CREATE UNIQUE INDEX [GameTimes_sqlite_autoindex_GameTimes_1] ON [GameTimes] ([userId] ASC,[releaseKey] ASC);
  `;
  runSql(createTable);
}

const createReleaseProperties = () => {
  let createTable = `
    -- Script Date: 2021-03-03 23:26  - ErikEJ.SqlCeScripting version 3.5.2.86
    CREATE TABLE [ReleaseProperties] (
      [releaseKey] text NOT NULL
    , [isDlc] bigint DEFAULT (NULL) NULL
    , [isVisibleInLibrary] bigint DEFAULT (NULL) NULL
    , [gameId] text DEFAULT (NULL) NULL
    );
    CREATE UNIQUE INDEX [ReleaseProperties_sqlite_autoindex_ReleaseProperties_1] ON [ReleaseProperties] ([releaseKey] ASC);
  `;
  runSql(createTable);
}

describe('gogDb', () => {
  beforeEach(async () => {
    const SQL = await initSqlJs();
    db = new SQL.Database();

    createGameLinks();
    createGamePieceTypes();
    createGamePieces();
    createGameTimes();
    createReleaseProperties();

    prisonArchitect.forEach(runSql);
    galaxyBeta_notVisibleInLibrary.forEach(runSql);
    cyberpunkGoodies_dlc.forEach(runSql);
  });

  each([
    ['releaseKeys', 'gog_1441974651,steam_233450'],
    ['title', '{"title":"Prison Architect"}'],
    ['summary', '{"summary":"The game is a top-down 2D construction and management simulation where the player takes control of building and running a prison. The player is responsible for managing various aspects of their prison including building cells and facilities, planning and connecting utilities, hiring and assigning staff, including a warden, guards, workers, and more. The player needs to recruit staff to unlock more aspects of the game. The player is also responsible for the finance, and keeping their inmates content."}'],
    ['metadata', '{"criticsScore":81.0769,"developers":["Introversion Software","Double Eleven"],"genres":["Strategy","Indie","Simulator"],"publishers":["Introversion Software"],"releaseDate":1444089600,"themes":["Non-fiction","Sandbox","Business"]}'],
    ['gameMinutes', 1116],
    ['images', '{"background":"https:\/\/images.gog.com\/ab679758906a2b48a4e3cfda684cf78288aef89a4fbc39331a6e6d89787eb7e9_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_vertical_cover.webp?namespace=gamesdb"}'],
  ]).it('%s to be %s', async (column, value) => {
    let data = db.export();
    const blob = new Blob([data]);

    let result = await readGogGames(blob);

    expect(result.columns).toContain(column);
    let columnIndex = result.columns.indexOf(column);
    expect(result.values.some(x => x[columnIndex] === value)).toBeTruthy();
  });

  it('ignore releases with isVisibleInLibrary=0 in ReleaseProperties', async () => {
    let data = db.export();
    const blob = new Blob([data]);

    let result = await readGogGames(blob);

    let releaseKeysIndex = result.columns.indexOf('releaseKeys');
    result.values.forEach(x => expect(x[releaseKeysIndex] === 'gog_1207667173').toBeFalsy())
  });

  it('ignore dlc', async () => {
    let data = db.export();
    const blob = new Blob([data]);

    let result = await readGogGames(blob);

    let releaseKeysIndex = result.columns.indexOf('releaseKeys');
    result.values.forEach(x => expect(x[releaseKeysIndex] === 'gog_1486144755').toBeFalsy())
  });
});

