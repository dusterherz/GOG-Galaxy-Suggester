import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { SqlJs } from 'sql.js/module';

import Background from './components/Background/Background';
import Error from './components/Error/Error';
import FileUpload from './components/FileUpload/FileUpload';
import GameDetails from './components/GameDetails/GameDetails';
import Loading from './components/Loading/Loading';
import Navigation from './components/Navigation/Navigation';

import dbRowToGameDetails from './utils/dbRowToGame';
import { readGogGames } from './utils/gogDb';
import { game } from './types/game';
import { preferences } from './types/preferences';
import { pickAGameAndRefreshRotaion, pickAGameInRotation } from './utils/gamesRotation';


const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: teal,
    type: 'dark',
  },
});

const defaultPreferences = { filters: { excludePlayed: false } };

function App() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [game, setGame] = useState<game | null>(null);
  const [allGames, setAllGames] = useState<game[] | null>(null);
  const [gamesInRotation, setGamesInRotation] = useState<game[]>([]);
  const [gamesInHistory, setGamesInHistory] = useState<game[]>([]);
  const [preferences, setPreferences] = useState<preferences>(defaultPreferences);

  const handleGogRead = (queryResults: SqlJs.QueryResults) => {
    let rows = queryResults.values;

    let games = rows.map(x => dbRowToGameDetails(x, queryResults.columns));
    setAllGames(games);

    const selectedGame = pickAGameAndRefreshRotaion(games, preferences, setGamesInRotation, setGamesInHistory);

    setGame(selectedGame);
    setIsLoaded(true);
  };

  const handleGogReadError = (error: any) => {
    console.error(error);
    setError(error);
    setIsLoaded(true);
  };

  const handleFileChange = async (blob: Blob) => {
    setIsLoaded(false);
    try {
      let results = await readGogGames(blob);
      handleGogRead(results);
    }
    catch (error) {
      handleGogReadError(error);
    }
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

    const selectedGame = pickAGameInRotation(gamesInRotation, gamesInHistory, preferences, setGamesInRotation, setGamesInHistory);

    setGame(selectedGame);
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
            ? <Error message={error.message} />
            : !isLoaded
              ? <Loading />
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
