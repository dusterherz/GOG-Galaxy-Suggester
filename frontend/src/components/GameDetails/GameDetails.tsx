import React from "react";
import { Grid, Paper, List, ListItem, Typography, Container, Box, Divider } from '@material-ui/core';
import { gameDetailsProps } from "./GameDetails.types";
import useStyles from './GameDetails.styles'
import GameDetailsItem from "../GameDetailsItem/GameDetailsItem";

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
    themes,
    backgroundImage,
    ...props
}: gameDetailsProps) {
    const classes = useStyles({ backgroundImage });
    return (
        <Box className={classes.background}>
            <Paper className={classes.root} >
                <Container>
                    <Grid container>
                        <Grid item xs={12} className={classes.header}>
                            <Typography variant='h3'>{title}</Typography>
                            <Typography variant='subtitle1'>{platforms.join(', ')}</Typography>
                            <Typography variant='subtitle2'>Time played: {gameMinutes} minutes</Typography>
                        </Grid>
                        <Grid item xs={12} lg={9} className={classes.summary}>
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
                            <Divider className={classes.divider} />
                            <List>
                                <ListItem><GameDetailsItem title={'Release date'} text={releaseDate.toDateString()}></GameDetailsItem></ListItem>
                                <ListItem><GameDetailsItem title={'Critics score'} text={criticsScore.toString()}></GameDetailsItem></ListItem>
                                <ListItem><GameDetailsItem title={'Developer'} text={developers.join(', ')}></GameDetailsItem></ListItem>
                                <ListItem><GameDetailsItem title={'Publisher'} text={publishers.join(', ')}></GameDetailsItem></ListItem>
                                <ListItem><GameDetailsItem title={'Genres'} text={genres.join(', ')}></GameDetailsItem></ListItem>
                                <ListItem><GameDetailsItem title={'Themes'} text={themes.join(', ')}></GameDetailsItem></ListItem>
                            </List>
                            <Divider className={classes.divider} />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </Box>
    );
}

export default GameDetails;