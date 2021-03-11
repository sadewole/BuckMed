import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useSelector } from 'src/store';
import Details from './Details';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Board = () => {
  const classes = useStyles();
  const { patient } = useSelector((state) => state.patient);

  return (
    <Page className={classes.root} title='Customer Details'>
      <Container maxWidth={false}>
        <Box mt={3}>
          <Details patient={patient} />
        </Box>
      </Container>
    </Page>
  );
};

export default Board;
