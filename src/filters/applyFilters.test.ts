import { game } from "../types/game";
import { allowAllFilter, filters } from "../types/preferences";
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
        filter.criticsScore = [25, 75]

        const actualGames = applyFilters(games, filter);

        expect(actualGames).toHaveLength(3);
    });
});