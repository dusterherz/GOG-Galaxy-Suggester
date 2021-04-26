import { game } from "../types/game";
import { filters, maxYear, minYear } from "../types/preferences";

const applyFilters = (games: game[], filters: filters) => {
    return games.filter(game => {
        return gameTimeFilter(game, filters)
            && criticsScoreFilter(game, filters)
            && releaseDateFilter(game, filters);
    });
}

const gameTimeFilter = (game: game, filters: filters): boolean => {
    return (filters.played && isPlayed(game))
        || (filters.unplayed && !isPlayed(game));
}

const criticsScoreFilter = (game: game, filters: filters): boolean => {
    return (filters.withoutCriticsScore && game.criticsScore === null)
        || (filters.withCriticsScore && game.criticsScore !== null
            && game.criticsScore >= filters.criticsScore[0] && game.criticsScore <= filters.criticsScore[1]);
}

const releaseDateFilter = (game: game, filters: filters): boolean => {
    return (filters.withoutReleaseDate && game.releaseDate === null)
        || (filters.withReleaseDate && game.releaseDate !== null
            && ((game.releaseDate.getFullYear() >= filters.releaseYear[0] && game.releaseDate.getFullYear() <= filters.releaseYear[1])
                || (game.releaseDate.getFullYear() < minYear && filters.releaseYear[0] === minYear)
                || (game.releaseDate.getFullYear() > maxYear && filters.releaseYear[1] === maxYear)
            ));
}

const isPlayed = (game: game) => {
    return game.gameMinutes > 0;
};

export default applyFilters;