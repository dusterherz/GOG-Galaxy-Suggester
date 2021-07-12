import applyFilters from "../filters/applyFilters";
import moveGameToHistory from "../filters/history";
import { game } from "../types/game";
import { bias, preferences } from "../types/preferences";

export const pickAGameAndRefreshRotaion = (
    allGames: game[],
    preferences: preferences,
    allBiasedGames: game[],
    setGamesInRotation: (rotation: game[]) => void,
    setGamesInHistory: (history: game[]) => void,
    setFilteredBiasedGames: (filteredBiasedGames: game[]) => void,
) => {
    let filteredGames = applyFilters(allGames, preferences.filters);
    let filteredBiasedGames = applyFilters(allBiasedGames, preferences.filters);
    setFilteredBiasedGames(filteredBiasedGames);

    return pickAGameInRotation(filteredGames, [], preferences, filteredBiasedGames, setGamesInRotation, setGamesInHistory);
};

export const pickAGameInRotation = (
    gamesInRotation: game[],
    gamesInHistory: game[],
    preferences: preferences,
    filteredBiasedGames: game[],
    setGamesInRotation: (rotation: game[]) => void,
    setGamesInHistory: (history: game[]) => void,
) => {
    const selectedGame = pickAGame(gamesInRotation, gamesInHistory, preferences, filteredBiasedGames);

    let [rotation, history] = moveGameToHistory(gamesInRotation, gamesInHistory, selectedGame);
    setGamesInRotation(rotation);
    setGamesInHistory(history);

    return selectedGame;
};

const pickAGame = (
    gamesInRotation: game[],
    gamesInHistory: game[],
    preferences: preferences,
    filteredBiasedGames: game[],): game => {
    if (preferences.biases.genre === bias.ignore) {
        return pickARandomGame(gamesInRotation);
    } else {
        return pickABiasedGame(filteredBiasedGames, gamesInHistory);
    }
}

const pickARandomGame = (filteredGames: game[]) => {
    let randomGameIndex = Math.floor(Math.random() * Math.floor(filteredGames.length));
    console.log("picking random from " + filteredGames.length)
    console.log(randomGameIndex);
    return filteredGames[randomGameIndex];
};

const pickABiasedGame = (filteredBiasedGames: game[], gamesInHistory: game[]) => {
    const biasedInRotation = filteredBiasedGames.filter(biasedGame => !gamesInHistory.includes(biasedGame));

    let randomGameIndex = Math.floor(Math.random() * Math.floor(biasedInRotation.length));
    console.log("pickingBiased from " + biasedInRotation.length)
    console.log(randomGameIndex);
    console.log(biasedInRotation.filter(game => game === biasedInRotation[randomGameIndex]).length);
    return biasedInRotation[randomGameIndex];
};

