export interface preferences {
    filters: filters;
}

export interface filters {
    played: boolean;
    unplayed: boolean;
    withoutCriticsScore: boolean;
    withCriticsScore: boolean;
    criticsScore: number[];
}

export const allowAllFilter: filters = {
    played: true,
    unplayed: true,
    withoutCriticsScore: true,
    withCriticsScore: true,
    criticsScore: [0, 100],
};