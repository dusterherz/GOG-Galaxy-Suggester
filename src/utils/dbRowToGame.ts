import { SqlJs } from 'sql.js/module';
import { game } from '../types/game';
import readablePlatformName from './readablePlatformName';

const columnIndexFromName = (columns: string[], name: string) => {
    return columns.indexOf(name) as number;
};

const parseGamePiece = (valueType: SqlJs.ValueType[], columnIndex: number) => {
    let gamePieceJson = valueType[columnIndex];
    if (typeof gamePieceJson !== "string") {
        throw 'unexpected type';
    }

    return JSON.parse(gamePieceJson);
};

const platformFromReleaseKey = (releaseKey: string) => {
    let platformPrefix = releaseKey.split('_')[0];
    return platformPrefix;
};

export default (row: SqlJs.ValueType[], columns: string[]) => {
    let platforms = new Set(
        (row[columnIndexFromName(columns, 'releaseKeys')] as string)
            .split(',')
            .map(platformFromReleaseKey)
            .map(readablePlatformName)
    );

    let metadata = parseGamePiece(row, columnIndexFromName(columns, 'metadata'));
    let gameMinutes = row[columnIndexFromName(columns, 'gameMinutes')] as number;
    let images = parseGamePiece(row, columnIndexFromName(columns, 'images'));

    let game: game = {
        title: parseGamePiece(row, columnIndexFromName(columns, 'title')).title,
        summary: parseGamePiece(row, columnIndexFromName(columns, 'summary')).summary,
        platforms: Array.from(platforms),
        criticsScore: metadata.criticsScore,
        developers: metadata.developers,
        publishers: metadata.publishers,
        genres: metadata.genres,
        themes: metadata.themes,
        releaseDate: metadata.releaseDate ? new Date(metadata.releaseDate * 1000) : null,
        gameMinutes: gameMinutes,
        backgroundImage: images.background,
        squareIcon: images.squareIcon,
        verticalCover: images.verticalCover,
    }

    return game;
};
