import { readGogGames } from "./gogDb";
import each from 'jest-each';
import { cyberpunkGoodies_dlc, galaxyBeta_notVisibleInLibrary, greyGooDefinitiveEdition_notInLibraryReleases, prisonArchitect } from "../../test_utils/gameTestData";
import createTestDb, { runSql } from '../../test_utils/createTestDb'

describe('gogDb', () => {
  let blob: Blob;

  beforeAll(async () => {
    let db = await createTestDb();

    prisonArchitect.forEach(x => runSql(db, x));
    galaxyBeta_notVisibleInLibrary.forEach(x => runSql(db, x));
    cyberpunkGoodies_dlc.forEach(x => runSql(db, x));
    greyGooDefinitiveEdition_notInLibraryReleases.forEach(x => runSql(db, x));

    let data = db.export();
    blob = new Blob([data]);
  });

  each([
    ['releaseKeys', 'gog_1441974651,steam_233450'],
    ['title', '{"title":"Prison Architect"}'],
    ['summary', '{"summary":"The game is a top-down 2D construction and management simulation where the player takes control of building and running a prison. The player is responsible for managing various aspects of their prison including building cells and facilities, planning and connecting utilities, hiring and assigning staff, including a warden, guards, workers, and more. The player needs to recruit staff to unlock more aspects of the game. The player is also responsible for the finance, and keeping their inmates content."}'],
    ['metadata', '{"criticsScore":81.0769,"developers":["Introversion Software","Double Eleven"],"genres":["Strategy","Indie","Simulator"],"publishers":["Introversion Software"],"releaseDate":1444089600,"themes":["Non-fiction","Sandbox","Business"]}'],
    ['gameMinutes', 1116],
    ['images', '{"background":"https:\/\/images.gog.com\/ab679758906a2b48a4e3cfda684cf78288aef89a4fbc39331a6e6d89787eb7e9_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_vertical_cover.webp?namespace=gamesdb"}'],
  ]).it('%s to be %s', async (column, value) => {
    let result = await readGogGames(blob);

    expect(result.columns).toContain(column);
    let columnIndex = result.columns.indexOf(column);
    expect(result.values.some(x => x[columnIndex] === value)).toBeTruthy();
  });

  it('ignores releases with isVisibleInLibrary=0 in ReleaseProperties', async () => {
    let result = await readGogGames(blob);

    let releaseKeysIndex = result.columns.indexOf('releaseKeys');
    result.values.forEach(x => expect(x[releaseKeysIndex] === 'gog_1207667173').toBeFalsy())
  });

  it('ignores dlc', async () => {
    let result = await readGogGames(blob);

    let releaseKeysIndex = result.columns.indexOf('releaseKeys');
    result.values.forEach(x => expect(x[releaseKeysIndex] === 'gog_1486144755').toBeFalsy())
  });

  it('ignores items that are not in LibraryReleases', async () => {
    let result = await readGogGames(blob);

    let releaseKeysIndex = result.columns.indexOf('releaseKeys');
    result.values.forEach(x => expect(x[releaseKeysIndex] === 'humble_greygoo_definitiveedition_steam').toBeFalsy())
  });
});

