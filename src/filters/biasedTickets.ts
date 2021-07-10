import { game } from "../types/game";
import { bias, biases } from "../types/preferences";

export const prepareBiasedTickets = (games: game[], biases: biases): game[] => {
    let genresScore: { [key: string]: number; } = {};
    games.forEach(game => {
        const hoursPlayed = Math.ceil(game.gameMinutes / 60);

        game.genres.forEach(genre => {
            genresScore[genre] = genresScore[genre] === undefined
                ? hoursPlayed
                : genresScore[genre] + hoursPlayed;
        })
    });

    let gamesWithScore: gameWithScore[] = games.map(game => {
        let score = 0;
        if (biases.genre !== bias.ignore) {
            game.genres.forEach(genre => {
                score += biases.genre === bias.similar
                    ? genresScore[genre]
                    : -genresScore[genre];
            });
        }

        return { game, score }
    });

    gamesWithScore = normalize(gamesWithScore);

    let biasedGames: game[] = [];
    gamesWithScore.forEach(x => {
        for (let i = 0; i < x.score; i += 1) {
            biasedGames.push(x.game);
        }
    });

    return biasedGames;
}

const normalize = (gamesWithScore: gameWithScore[]): gameWithScore[] => {
    const minScore = Math.min(...gamesWithScore.map(x => x.score));
    return gamesWithScore.map(x => { return { game: x.game, score: x.score - minScore + 1 } });
}

interface gameWithScore {
    game: game;
    score: number;
}