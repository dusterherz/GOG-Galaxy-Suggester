export interface preferences {
    filters: filters;
}

export interface filters {
    played: boolean;
    unplayed: boolean;
    withoutCriticsScore: boolean;
    withCriticsScore: boolean;
    criticsScore: number[];
    withoutReleaseDate: boolean;
    withReleaseDate: boolean;
    releaseYear: number[];
}

export const minYear = 1980;
export const maxYear = new Date().getFullYear() + 1;

export const allowAllFilter: filters = {
    played: true,
    unplayed: true,
    withoutCriticsScore: true,
    withCriticsScore: true,
    criticsScore: [0, 100],
    withoutReleaseDate: true,
    withReleaseDate: true,
    releaseYear: [minYear, maxYear],
};
