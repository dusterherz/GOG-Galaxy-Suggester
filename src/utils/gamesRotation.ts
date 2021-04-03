import applyFilters from "../filters/applyFilters";
import moveGameToHistory from "../filters/history";
import { game } from "../types/game";
import { preferences } from "../types/preferences";

export const pickAGameAndRefreshRotaion = (
    allGames: game[],
    preferences: preferences,
    setGamesInRotation: (rotation: game[]) => void,
    setGamesInHistory: (history: game[]) => void,
) => {
    let filteredGames = applyFilters(allGames, preferences.filters);

    return pickAGameInRotation(filteredGames, [], preferences, setGamesInRotation, setGamesInHistory);
};

export const pickAGameInRotation = (
    gamesInRotation: game[],
    gamesInHistory: game[],
    preferences: preferences,
    setGamesInRotation: (rotation: game[]) => void,
    setGamesInHistory: (history: game[]) => void,
) => {
    const selectedGame = pickARandomGame(gamesInRotation);

    let [rotation, history] = moveGameToHistory(gamesInRotation, gamesInHistory, selectedGame);
    setGamesInRotation(rotation);
    setGamesInHistory(history);

    return selectedGame;
};

const pickARandomGame = (filteredGames: game[]) => {
    let randomGameIndex = Math.floor(Math.random() * Math.floor(filteredGames.length));
    return filteredGames[randomGameIndex];
};

