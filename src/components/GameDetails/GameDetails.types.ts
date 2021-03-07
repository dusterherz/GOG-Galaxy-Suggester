export interface gameDetailsProps {
    title: string;
    summary: string;
    releaseKeys: string[];
    criticsScore: number | null;
    developers: string[];
    publishers: string[];
    genres: string[];
    themes: string[];
    releaseDate: Date | null;
    gameMinutes: number;
}
