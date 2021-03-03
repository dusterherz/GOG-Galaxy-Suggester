import React, { useState, useEffect } from 'react';
import GameDetails from './components/GameDetails/GameDetails';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { readGogGames } from './gogDb';
import FileUpload from './components/FileUpload/FileUpload';
import { SqlJs } from 'sql.js/module';
import dbRowToGameDetails from './utils/dbRowToGame';
import Navigation from './components/Navigation/Navigation';
import { game } from './types/game';
import Background from './components/Background/Background';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: teal,
    type: 'dark',
  },
});

function App() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [game, setGame] = useState<game | null>(null);
  const [allGames, setAllGames] = useState<game[] | null>(null);



  // // Note: the empty deps array [] means
  // // this useEffect will run once
  // // similar to componentDidMount()
  // useEffect(() => {
  //   fetch("http://localhost:5000/games/random", {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setGameDetails({
  //           ...result,
  //           releaseDate: new Date(result.releaseDate),
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])


  // if (error && error) {
  //   return null; //<div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {

  const handleGogRead = (queryResults: SqlJs.QueryResults) => {
    let rows = queryResults.values;
    let randomGameIndex = Math.floor(Math.random() * Math.floor(rows.length));

    let games = rows.map(x => dbRowToGameDetails(x, queryResults.columns));
    setAllGames(games);

    let gameDetailsProps: game = games[randomGameIndex];

    setGame(gameDetailsProps);
    setIsLoaded(true);
  };

  const handleGogReadError = (error: any) => {
    setError(error);
    setIsLoaded(true);
  };

  const handleFileChange = (blob: Blob) => {
    setIsLoaded(false);
    readGogGames(blob, handleGogRead, handleGogReadError);
  };

  const handleUploadDbClicked = () => {
    setError(null);
    setGame(null);
  };

  const handleNextGameClicked = () => {
    setError(null);
    setNextGame();
  };

  const setNextGame = () => {
    if (allGames === null) {
      return;
    }

    let randomGameIndex = Math.floor(Math.random() * Math.floor(allGames.length));
    let gameDetailsProps: game = allGames[randomGameIndex];

    setGame(gameDetailsProps);
  };

  const isNextGameDisabled = () => {
    return allGames === null || allGames.length === 0;
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Background backgroundImage={game?.backgroundImage ?? ''}>
          <Navigation onUploadDbClicked={handleUploadDbClicked} onNextGameClicked={handleNextGameClicked} isNextGameDisabled={isNextGameDisabled()}></Navigation>
          {error && error.message
            ? <div>Error: {error.message}</div>
            : !isLoaded
              ? <div>Loading...</div>
              : game != null
                ? <GameDetails {...game} />
                : <FileUpload onFileChange={handleFileChange}></FileUpload>
          }
        </Background>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
