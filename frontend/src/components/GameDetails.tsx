import React from "react";
import { Grid, Paper, List, ListItem, Typography } from '@material-ui/core';
import { gameDetailsProps } from "./GameDetails.types";

function GameDetails({
    title,
    platforms,
    gameMinutes,
    summary,
    releaseDate,
    criticsScore,
    developers,
    publishers,
    genres,
    themes
}: gameDetailsProps) {

    return (
        <Paper style={{ height: '100vh' }}>
            <Grid container>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant='h3'>{title}</Typography>
                    <Typography variant='subtitle1'>{platforms.join(', ')}</Typography>
                    <Typography variant='subtitle2'>Time played: {gameMinutes} minutes</Typography>
                </Grid>
                <Grid item xs={12} lg={9}>
                    <Typography variant='body1'>{summary.split("\\n").map(function (item, idx) {
                        return (
                            <span key={idx}>
                                {item}
                                <br />
                            </span>
                        )
                    })}</Typography>
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