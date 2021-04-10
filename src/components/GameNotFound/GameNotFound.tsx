import { Container, Typography } from '@material-ui/core';

const GameNotFound = () => {

    return (
        <Container>
            <Typography variant='h4' align='center'>We couldn't find any game that matches your given criteria.</Typography>
            <Typography variant='h4' align='center'>Try changing your preferences.</Typography>
        </Container>
    );
}

export default GameNotFound;