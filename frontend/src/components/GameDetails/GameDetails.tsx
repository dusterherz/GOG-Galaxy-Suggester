import React from "react";
import { Grid, List, ListItem, Typography, Container, Box, Divider } from '@material-ui/core';
import { gameDetailsProps } from "./GameDetails.types";
import useStyles from './GameDetails.styles'
import GameDetailsItem from "../GameDetailsItem/GameDetailsItem";
import MultilineText from "../MultilineText/MultilineText";
import HumanTime from "../HumanTime/HumanTime";
import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import PlatformDisplay from "../PlatformDisplay/PlatformDisplay";

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
}: gameDetailsProps) {

    const backgroundLimiterId = 'backgroundLimiter';
    const classes = useStyles();

    return (
        <Box className={classes.root} >
            <AnimatedBackground backgroundImage={backgroundImage} containerId={backgroundLimiterId}></AnimatedBackground>
            <Box className={classes.gradient} id={backgroundLimiterId} >
                <Container>
                    <Grid container>
                        <Grid item xs={12} className={classes.header}>
                            <Typography variant='h3'>{title}</Typography>
                            <Typography variant='subtitle1'><PlatformDisplay platforms={platforms} /></Typography>
                            <Typography variant='subtitle2'>Time played: {<HumanTime minutes={gameMinutes}></HumanTime>}</Typography>
                        </Grid>
                        <Grid item xs={12} lg={9} className={classes.summary}>
                            <MultilineText text={summary} />
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
            </Box >
        </Box >
    );
}

export default GameDetails;