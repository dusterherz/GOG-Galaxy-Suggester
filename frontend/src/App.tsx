import React, { useState, useEffect } from 'react';
import GameDetails from './components/GameDetails';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, teal } from '@material-ui/core/colors';
import { gameDetailsProps } from './components/GameDetails.types';

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
  const [gameDetails, setGameDetails] = useState<gameDetailsProps>({ title: '', summary: '', platforms: [], criticsScore: 0, developers: [], publishers: [], genres: [], themes: [], releaseDate: new Date(), gameMinutes: 0, backgroundImage: '', verticalCover: '', squareIcon: '' });

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:5000/random", {
      method: 'GET',
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setGameDetails({
            ...result,
            releaseDate: new Date(result.releaseDate),
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  if (error && error) {
    return null; //<div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <GameDetails
          {...gameDetails} />
      </ThemeProvider>
    );
  }
}

export default App;
