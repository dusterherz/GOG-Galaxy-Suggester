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

  const columnIndexFromName = (columns: string[], name: string) => {
    return columns.indexOf(name) as number;
  }

  const parseGamePiece = (valueType: SqlJs.ValueType[], columnIndex: number) => {
    let gamePieceJson = valueType[columnIndex];
    if (typeof gamePieceJson !== "string") {
      throw 'unexpected type';
    }

    return JSON.parse(gamePieceJson);
  }

  const platformFromReleaseKey = (releaseKey: string) => {
    let platformPrefix = releaseKey.split('_')[0];
    return platformPrefix;
  }

  const handleGogRead = (queryResults: SqlJs.QueryResults) => {
    let values = queryResults.values;
    let randomGameIndex = Math.floor(Math.random() * Math.floor(values.length));
    let valueType = values[randomGameIndex];
    let platforms = new Set((valueType[0] as string).split(',').map(platformFromReleaseKey))

    let metadata = parseGamePiece(valueType, columnIndexFromName(queryResults.columns, 'metadata'));
    let gameMinutes = valueType[columnIndexFromName(queryResults.columns, 'sum(MasterDB.time)')] as number;
    let images = parseGamePiece(valueType, columnIndexFromName(queryResults.columns, 'images'));

    let gameDetailsProps: gameDetailsProps = {
      title: parseGamePiece(valueType, columnIndexFromName(queryResults.columns, 'title')).title,
      summary: parseGamePiece(valueType, columnIndexFromName(queryResults.columns, 'summary')).summary,
      platforms: Array.from(platforms),
      criticsScore: metadata.criticsScore,
      developers: metadata.developers,
      publishers: metadata.publishers,
      genres: metadata.genres,
      themes: metadata.themes,
      releaseDate: metadata.releaseDate ? new Date(metadata.releaseDate * 1000) : null,
      gameMinutes: gameMinutes ?? 0,
      backgroundImage: images.background,
      squareIcon: images.squareIcon,
      verticalCover: images.verticalCover,
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
