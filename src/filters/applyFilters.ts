import { game } from "../types/game";
import { filters } from "../types/preferences";

const applyFilters = (games: game[], filters: filters) => {
    return games.filter(game => {
        return filters.played ? true : !isPlayed(game);
    });
}

const isPlayed = (game: game) => {
    return game.gameMinutes > 0;
};

export default applyFilters;