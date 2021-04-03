import { game } from "../types/game";
import { filters } from "../types/preferences";

const applyFilters = (games: game[], filters: filters) => {
    return games.filter(game => {
        return filters.excludePlayed ? !isPlayed(game) : true;
    });
}

const isPlayed = (game: game) => {
    return game.gameMinutes > 0;
};

export default applyFilters;