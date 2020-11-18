import React, { useEffect, useState, useRef } from 'react';
import NProgress from 'nprogress';
import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    // zIndex: 2000,
  },
}));

const LoadingScreen = () => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    NProgress.start();
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      NProgress.done();
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Box width={500}>
        <LinearProgress
          variant='buffer'
          value={progress}
          valueBuffer={buffer}
        />
        <Typography variant='body1'>Loading...</Typography>
      </Box>
    </div>
  );
};

export default LoadingScreen;
