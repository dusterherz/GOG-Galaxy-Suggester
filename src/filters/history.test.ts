import { game } from "../types/game";
import moveGameToHistory from "./history";
import { testGame } from "./testData";

describe('history', () => {
    const game01 = testGame;

    const game02: game = {
        ...game01,
        title: 'Fatal Fumes'
    }

    it('should remove single item from rotation', () => {
        let gamesInRotation: game[] = [game01, game02];
        let history: game[] = [];

        let [actualGamesInRotation] = moveGameToHistory(gamesInRotation, history, game02);

        expect(actualGamesInRotation).toEqual([game01]);
    });

    it('should add single item to history', () => {
        let gamesInRotation: game[] = [game01, game02];
        let history: game[] = [];

        let [, actualHistory] = moveGameToHistory(gamesInRotation, history, game02);

        expect(actualHistory).toEqual([game02]);
    });

    it('should not remove from rotation if only one present', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [];

        let [actualGamesInRotation] = moveGameToHistory(gamesInRotation, history, game01);

        expect(actualGamesInRotation).toEqual([game01]);
    });

    it('should not add to history', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [];

        let [, actualHistory] = moveGameToHistory(gamesInRotation, history, game01);

        expect(actualHistory).toEqual([]);
    });

    it('should move item from history to rotation when half of the items are in history', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [game02];

        let [actualGamesInRotation] = moveGameToHistory(gamesInRotation, history, game01);

        expect(actualGamesInRotation).toContain(game02);
    });

    it('should remove item from history when half of the items are in history', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [game02];

        let [, actualHistory] = moveGameToHistory(gamesInRotation, history, game01);

        expect(actualHistory).not.toContain(game02);
    });
});