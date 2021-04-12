import { game } from "../types/game";
import { filters } from "../types/preferences";

const applyFilters = (games: game[], filters: filters) => {
    return games.filter(game => {
        return gameTimeFilter(game, filters)
            && criticsScoreFilter(game, filters);
    });
}

const gameTimeFilter = (game: game, filters: filters): boolean => {
    return (filters.played && isPlayed(game))
        || (filters.unplayed && !isPlayed(game));
}

const criticsScoreFilter = (game: game, filters: filters): boolean => {
    return filters.withoutCriticsScore ? true : game.criticsScore !== null;
}

const isPlayed = (game: game) => {
    return game.gameMinutes > 0;
};

export default applyFilters;