import React, { useState } from 'react';
import GameDetails from './components/GameDetails/GameDetails';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { readGogGames } from './utils/gogDb';
import FileUpload from './components/FileUpload/FileUpload';
import { SqlJs } from 'sql.js/module';
import dbRowToGameDetails from './utils/dbRowToGame';
import Navigation from './components/Navigation/Navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
