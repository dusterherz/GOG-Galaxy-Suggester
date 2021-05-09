import { game } from "../types/game";
import { allowAllFilter, filters, maxGameMinutes, maxYear, minYear } from "../types/preferences";
import applyFilters from "./applyFilters";
import { testGame } from "./testData";

describe('applyFilters', () => {
    let games: game[] = [
    ];

    let filter: filters;

    beforeEach(() => {
        games = [
            { ...testGame },
        ];

        filter = { ...allowAllFilter };
    });

    it('should return full list if nothing is filtered', () => {
        const actualGames = applyFilters(games, allowAllFilter);

        expect(actualGames).toEqual(games);
    });

    it('should exclude games with gameTime if excluding played games', () => {
        games[0].gameMinutes = 13;
        filter.played = false;

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(0);
    });

    it('should exclude games without gameTime if excluding unplayed games', () => {
        games[0].gameMinutes = 0;
        filter.unplayed = false;

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(0);
    });

    it('should exclude games with gameMinutes out of range', () => {
        games = [
            { ...testGame, gameMinutes: 20 },
            { ...testGame, gameMinutes: 50 },
            { ...testGame, gameMinutes: 80 },
        ];
        filter.gameMinutes = [40, 60];

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(1);
    });

    it('should include games with gameMinutes more than max if max is selected', () => {
        games = [
            { ...testGame, gameMinutes: maxGameMinutes + 1 },
        ];
        filter.gameMinutes = [0, maxGameMinutes];

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(1);
    });

    it('should exclude games without criticsScore if excluding games without critics score', () => {
        games[0].criticsScore = null;
        filter.withoutCriticsScore = false;

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(0);
    });

    it('should exclude games with criticsScore if excluding games with critics score', () => {
        games[0].criticsScore = 50;
        filter.withCriticsScore = false;

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(0);
    });

    it('should exclude games with criticsScore out of range if excluding games with critics score', () => {
        games = [
            { ...testGame, criticsScore: 24 },
            { ...testGame, criticsScore: 25 },
            { ...testGame, criticsScore: 50 },
            { ...testGame, criticsScore: 75 },
            { ...testGame, criticsScore: 76 },
        ];
        filter.criticsScore = [25, 75];

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(3);
    });

    it('should exclude games without releaseDate if excluding games without release date', () => {
        games[0].releaseDate = null;
        filter.withoutReleaseDate = false;

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(0);
    });

    it('should exclude games with releaseDate if excluding games with release date', () => {
        games[0].releaseDate = new Date('2010-01-01');
        filter.withReleaseDate = false;

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(0);
    });

    it('should exclude games with releaseDate out of range', () => {
        games = [
            { ...testGame, releaseDate: new Date('1980-01-01') },
            { ...testGame, releaseDate: new Date('1990-01-01') },
            { ...testGame, releaseDate: new Date('2000-01-01') },
            { ...testGame, releaseDate: new Date('2010-01-01') },
        ];
        filter.releaseYear = [1985, 2005];

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(2);
    });

    it('should include games older than minimum year when minimum year is selected', () => {
        games = [
            { ...testGame, releaseDate: new Date((minYear - 10) + '-01-01') },
        ];
        filter.releaseYear = [minYear, 2005];

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(1);
    });

    it('should include games newer than maximum year when maximum year is selected', () => {
        games = [
            { ...testGame, releaseDate: new Date((maxYear + 1) + '-01-01') },
        ];
        filter.releaseYear = [2000, maxYear];

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(1);
    });
});