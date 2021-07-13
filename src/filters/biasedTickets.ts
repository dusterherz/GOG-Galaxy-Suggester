import { game } from "../types/game";
import { bias, biases } from "../types/preferences";

export const prepareBiasedTickets = (games: game[], biases: biases): game[] => {
    let genresScore: { [key: string]: number; } = {};
    let themesScore: { [key: string]: number; } = {};
    games.forEach(game => {
        genresScore = addToAttributeScore(genresScore, game.genres, game.gameMinutes);
        themesScore = addToAttributeScore(themesScore, game.themes, game.gameMinutes);
    });

    let gamesWithScore: gameWithScore[] = games.map(game => {
        let score = 0;

        score += calculateGameScoreForAttribute(game.genres, biases.genre, genresScore);
        score += calculateGameScoreForAttribute(game.themes, biases.theme, themesScore);

        return { game, score }
    });

    gamesWithScore = normalize(gamesWithScore);
    const biasedGames: game[] = createBiasedTickets(gamesWithScore);

    console.log(genresScore);
    console.log(themesScore);
    console.log(gamesWithScore);
    console.log(biasedGames);

    const maxScoreGame = gamesWithScore.sort((a, b) => b.score - a.score)[0]
    console.log(maxScoreGame);

    return biasedGames;
}

const addToAttributeScore = (attributeScore: { [key: string]: number; }, attributes: string[], gameMinutes: number): { [key: string]: number; } => {
    const hoursPlayed = Math.ceil(gameMinutes / (attributes.length > 0 ? attributes.length : 1) / 60);

    attributes.forEach(item => {
        attributeScore[item] = attributeScore[item] === undefined
            ? hoursPlayed
            : attributeScore[item] + hoursPlayed;
    });
    return attributeScore;
}

const calculateGameScoreForAttribute = (attributes: string[], attributeBias: bias, attributeScore: { [key: string]: number; }) => {
    let score = 0;
    if (attributeBias !== bias.ignore) {
        attributes.forEach(attribute => {
            score += attributeBias === bias.similar
                ? attributeScore[attribute]
                : -attributeScore[attribute];
        });
    }

    if (attributes.length > 0) {
        score = score / attributes.length;
    }

    return score;
}

const normalize = (gamesWithScore: gameWithScore[]): gameWithScore[] => {
    const minScore = Math.min(...gamesWithScore.map(x => x.score));
    gamesWithScore = gamesWithScore.map(x => { return { game: x.game, score: x.score - minScore + 1 } });

    const maxScore = Math.max(...gamesWithScore.map(x => x.score));
    return gamesWithScore.map(x => ({ game: x.game, score: x.score > 0.75 * maxScore ? x.score : 1 }))
}

const createBiasedTickets = (gamesWithScore: gameWithScore[]) => {
    let biasedGames: game[] = [];
    gamesWithScore.forEach(x => {
        for (let i = 0; i < x.score; i += 1) {
            biasedGames.push(x.game);
        }
    });

    return biasedGames;
}

interface gameWithScore {
    game: game;
    score: number;
}