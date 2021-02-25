import React, { useState, useEffect } from 'react';
import GameDetails from './components/GameDetails/GameDetails';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';
import { gameDetailsProps } from './components/GameDetails/GameDetails.types';
import Paper from '@material-ui/core/Paper';
import { readGogGames } from './sqlInput';
import DbInput from './components/DbInput/DbInput';
import { SqlJs } from 'sql.js/module';
import { exception } from 'console';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: teal,
    type: 'dark',
  },
});

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameDetails, setGameDetails] = useState<gameDetailsProps | null>(null);
  const [dbFile, setDbFile] = useState<Blob | null>(null);

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

  const handleGogRead = (e: SqlJs.ValueType[][]) => {
    let randomGameIndex = Math.floor(Math.random() * Math.floor(e.length));
    let b = e[randomGameIndex][1];
    if (typeof b !== "string") {
      throw 'unexpected type';
    }
    let gameDetailsProps: gameDetailsProps = {
      title: JSON.parse(b).title,
      summary: '',
      platforms: [],
      criticsScore: null,
      developers: [],
      publishers: [],
      genres: [],
      themes: [],
      releaseDate: null,
      gameMinutes: 0,
      backgroundImage: '',
      squareIcon: '',
      verticalCover: '',
    }
    setGameDetails(gameDetailsProps);
  }

  const handleFileChange = (e: Blob) => {
    readGogGames(e, handleGogRead);
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        {gameDetails != null
          ? <GameDetails {...gameDetails} />
          : <DbInput onFileChange={handleFileChange}></DbInput>
        }


      </Paper>
    </ThemeProvider>
  );
  //   }
}

export default App;
