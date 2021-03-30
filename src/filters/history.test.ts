import { game } from "../types/game";
import moveGameToHistory from "./history";

describe('history', () => {
    const game01: game = {
        title: 'Ricochet',
        backgroundImage: '',
        criticsScore: null,
        developers: [],
        gameMinutes: 0,
        genres: [],
        publishers: [],
        releaseDate: null,
        releaseKeys: ['abc_abc'],
        squareIcon: '',
        summary: '',
        themes: [],
        verticalCover: ''
    };

    const game02: game = {
        ...game01,
        title: 'Fatal Fumes'
    }

    it('should remove single item from rotation', () => {
        let gamesInRotation: game[] = [game01, game02];
        let history: game[] = [];

        let [actualGamesInRotation] = moveGameToHistory(gamesInRotation, history, 1);

        expect(actualGamesInRotation).toEqual([game01]);
    });

    it('should add single item to history', () => {
        let gamesInRotation: game[] = [game01, game02];
        let history: game[] = [];

        let [, actualHistory] = moveGameToHistory(gamesInRotation, history, 1);

        expect(actualHistory).toEqual([game02]);
    });

    it('should not remove from rotation if only one present', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [];

        let [actualGamesInRotation] = moveGameToHistory(gamesInRotation, history, 0);

        expect(actualGamesInRotation).toEqual([game01]);
    });

    it('should not add to history', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [];

        let [, actualHistory] = moveGameToHistory(gamesInRotation, history, 0);

        expect(actualHistory).toEqual([]);
    });

    it('should move item from history to rotation when half of the items are in history', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [game02];

        let [actualGamesInRotation] = moveGameToHistory(gamesInRotation, history, 0);

        expect(actualGamesInRotation).toContain(game02);
    });

    it('should remove item from history when half of the items are in history', () => {
        let gamesInRotation: game[] = [game01];
        let history: game[] = [game02];

        let [, actualHistory] = moveGameToHistory(gamesInRotation, history, 0);

        expect(actualHistory).not.toContain(game02);
    });
});