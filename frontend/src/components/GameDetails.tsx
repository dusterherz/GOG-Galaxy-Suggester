import React from "react";
import { Grid, Paper, List, ListItem, Typography } from '@material-ui/core';

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



    //   backgroundImage=''
    //   squareIcon=''
    //   verticalCover=''


    return (
        <Paper style={{ height: '100vh' }}>
            <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant='h3'>{title}</Typography>
                    <Typography variant='subtitle1'>{platforms.join(', ')}</Typography>
                    <Typography variant='subtitle2'>Time played: {gameMinutes} minutes</Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                    <Typography variant='body1'>{summary}</Typography>
                </Grid>
                <Grid item xs={12} lg={3}>
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
        </Paper>
    );
}

export default GameDetails;