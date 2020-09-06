import React from "react";
import { Grid, Paper, Card, CardMedia, CardActionArea, makeStyles, List, ListItem } from '@material-ui/core';

interface gameDetailsProps {
    title: string,
    summary: string,
    platformList: string[],
    criticsScore: number,
    developers: string[],
    publishers: string[],
    genres: string[],
    themes: string[],
    releaseDate: Date,
    gameMinutes: number,
    backgroundImage: string,
    squareIcon: string,
    verticalCover: string
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 482,
        // maxWidth: 600,
    },
});
function GameDetails(props: gameDetailsProps) {
    const title = props.title;
    const platforms = props.platformList;
    const gameMinutes = props.gameMinutes;

    const summary = props.summary;

    const releaseDate = props.releaseDate;
    const criticsScore = props.criticsScore;

    const developers = props.developers;
    const publishers = props.publishers;

    const genres = props.genres;
    const themes = props.themes;



    //   gameMinutes=''
    //   backgroundImage=''
    //   squareIcon=''
    //   verticalCover=''

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <h1>{title}</h1>
                <h4>{platforms.join(', ')}</h4>
                <h5>Time played: {gameMinutes} minutes</h5>
            </Grid>
            <Grid item xs={12}>
                {summary}
            </Grid>
            <Grid item xs={12}>
                <List>
                    <ListItem>Release date: {releaseDate.toDateString()}</ListItem>
                    <ListItem>Critics score: {criticsScore}</ListItem>
                    <ListItem>Developer: {developers.join(', ')}</ListItem>
                    <ListItem>Publisher: {publishers.join(', ')}</ListItem>
                    <ListItem>Genres: {genres.join(', ')}</ListItem>
                    <ListItem>Themes: {themes.join(', ')}</ListItem>
                </List>
            </Grid>
        </Grid>

    );
}

export default GameDetails;