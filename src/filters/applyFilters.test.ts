import { filters } from "../types/preferences";
import applyFilters from "./applyFilters";
import { testGame } from "./testData";

describe('applyFilters', () => {
    const allowAllFilter: filters = { played: true };
    const games = [
        testGame,
    ];

    it('should return full list if nothing is filtered', () => {
        const actualGames = applyFilters(games, allowAllFilter);

        expect(actualGames).toEqual(games);
    });

    it('should exclude games with gameTime if excluding played games', () => {
        games[0].gameMinutes = 13;
        let filter = allowAllFilter;
        filter.played = false;

        const actualGames = applyFilters(games, allowAllFilter);

        expect(actualGames).toHaveLength(0);
    });
});