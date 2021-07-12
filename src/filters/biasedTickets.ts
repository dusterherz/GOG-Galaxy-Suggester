import { game } from "../types/game";
import { bias, biases } from "../types/preferences";

export const prepareBiasedTickets = (games: game[], biases: biases): game[] => {
    let genresScore: { [key: string]: number; } = {};
    let themesScore: { [key: string]: number; } = {};
    games.forEach(game => {
        let hoursPlayed = Math.ceil(game.gameMinutes / (game.genres.length > 0 ? game.genres.length : 1) / 60);

        game.genres.forEach(genre => {
            genresScore[genre] = genresScore[genre] === undefined
                ? hoursPlayed
                : genresScore[genre] + hoursPlayed;
        });

        hoursPlayed = Math.ceil(game.gameMinutes / (game.themes.length > 0 ? game.themes.length : 1) / 60);

        game.themes.forEach(theme => {
            themesScore[theme] = themesScore[theme] === undefined
                ? hoursPlayed
                : themesScore[theme] + hoursPlayed;
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

        if (game.genres.length > 0) {
            score = score / game.genres.length;
        }

        let finalScore = score;

        score = 0;
        if (biases.theme !== bias.ignore) {
            game.themes.forEach(theme => {
                score += biases.theme === bias.similar
                    ? themesScore[theme]
                    : -themesScore[theme];
            });
        }

        if (game.themes.length > 0) {
            score = score / game.themes.length;
        }

        finalScore += score;

        return { game, score: finalScore }
    });

    gamesWithScore = normalize(gamesWithScore);

    let biasedGames: game[] = [];
    gamesWithScore.forEach(x => {
        for (let i = 0; i < x.score; i += 1) {
            biasedGames.push(x.game);
        }
    });

    console.log(genresScore);
    console.log(themesScore);
    console.log(gamesWithScore);
    console.log(biasedGames);

    const maxScoreGame = gamesWithScore.sort((a, b) => b.score - a.score)[0]
    console.log(maxScoreGame);

    return biasedGames;
}

const normalize = (gamesWithScore: gameWithScore[]): gameWithScore[] => {
    const minScore = Math.min(...gamesWithScore.map(x => x.score));
    gamesWithScore = gamesWithScore.map(x => { return { game: x.game, score: x.score - minScore + 1 } });

    const maxScore = Math.max(...gamesWithScore.map(x => x.score));
    return gamesWithScore.map(x => ({ game: x.game, score: x.score > 0.75 * maxScore ? x.score : 1 }))
}

interface gameWithScore {
    game: game;
    score: number;
}