import { SqlJs } from 'sql.js/module';
import dbRowToGameDetails from './dbRowToGameDetails';

const columns: string[] = [
  "releaseKeys",
  "title",
  "summary",
  "metadata",
  "gameMinutes",
  "images",
];

const valueTypes: SqlJs.ValueType[] = [
  'steam_435790',
  '{"title":"10 Second Ninja X"}',
  '{"summary":"10 SECOND NINJA X is a blisteringly fast, satisfyingly difficult and surprisingly methodical sidescroller which tasks you with completing each level in ten seconds or less. No lengthy checkpoint gaps. No cluttered control scheme. No hand holding. Get that three star rating, yo! You got this. \\n\\n1 star. Again. 1 star. Again. 2 stars! Again. Back to 1 star. DAMN IT. Again... \\n\\n100 levels including all 40 original 10 Second Ninja levels remastered in HD. Individual leaderboards for each level. Unlockables and collectibles."}',
  '{"criticsScore":77.3333,"developers":["Four Circle Interactive"],"genres":["Indie","Platform","Puzzle","Arcade"],"publishers":["Curve Digital"],"releaseDate":1468886400,"themes":["Action"]}',
  44,
  '{"background":"https:\/\/images.gog.com\/640c97dd51fbb5eb6240d0d7e2765e223d46e1b9f92ce4d9f5db7992f4ced293_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/e1d3f3b75a1cf921a1493294840c1e821e5002e55943f987039f6a76cc2bd90c_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/4df641c4cada7d9a9d3e76ac76581e4733d84d0a7030fd9de9322c9bf8b423d3_glx_vertical_cover.webp?namespace=gamesdb"}',
];

describe('dbRowToGameDetails', () => {
  it('should set title', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.title).toBe('10 Second Ninja X');
  });
});

describe('dbRowToGameDetails', () => {
  it('should set summary', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.summary).toBe("10 SECOND NINJA X is a blisteringly fast, satisfyingly difficult and surprisingly methodical sidescroller which tasks you with completing each level in ten seconds or less. No lengthy checkpoint gaps. No cluttered control scheme. No hand holding. Get that three star rating, yo! You got this. \n\n1 star. Again. 1 star. Again. 2 stars! Again. Back to 1 star. DAMN IT. Again... \n\n100 levels including all 40 original 10 Second Ninja levels remastered in HD. Individual leaderboards for each level. Unlockables and collectibles.");
  });
});

describe('dbRowToGameDetails', () => {
  it('should set criticsScore', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.criticsScore).toBe(77.3333);
  });
});

describe('dbRowToGameDetails', () => {
  it('should set developers', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.developers).toStrictEqual(["Four Circle Interactive"]);
  });
});

describe('dbRowToGameDetails', () => {
  it('should set genres', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.genres).toStrictEqual(["Indie", "Platform", "Puzzle", "Arcade"]);
  });
});

describe('dbRowToGameDetails', () => {
  it('should set publishers', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.publishers).toStrictEqual(["Curve Digital"]);
  });
});

describe('dbRowToGameDetails', () => {
  it('should set releaseDate', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.releaseDate).toStrictEqual(new Date('2016-07-19'));
  });
});

describe('dbRowToGameDetails', () => {
  it('should set themes', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.themes).toStrictEqual(["Action"]);
  });
});

describe('dbRowToGameDetails', () => {
  it('should set gameMinutes', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.gameMinutes).toBe(44);
  });
});

describe('dbRowToGameDetails', () => {
  it('should set backgroundImage', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.backgroundImage).toBe('https://images.gog.com/640c97dd51fbb5eb6240d0d7e2765e223d46e1b9f92ce4d9f5db7992f4ced293_glx_bg_top_padding_7.webp?namespace=gamesdb');
  });
});

describe('dbRowToGameDetails', () => {
  it('should set squareIcon', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.squareIcon).toBe("https://images.gog.com/e1d3f3b75a1cf921a1493294840c1e821e5002e55943f987039f6a76cc2bd90c_glx_square_icon_v2.webp?namespace=gamesdb");
  });
});

describe('dbRowToGameDetails', () => {
  it('should set verticalCover', () => {
    const gameDetailsProps = dbRowToGameDetails(valueTypes, columns);

    expect(gameDetailsProps.verticalCover).toBe('https://images.gog.com/4df641c4cada7d9a9d3e76ac76581e4733d84d0a7030fd9de9322c9bf8b423d3_glx_vertical_cover.webp?namespace=gamesdb');
  });
});