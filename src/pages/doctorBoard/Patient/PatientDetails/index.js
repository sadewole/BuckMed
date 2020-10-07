import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import Page from 'src/components/Page';
import { useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery, makeStyles, Box } from '@material-ui/core';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const useStyle = makeStyles(() => ({
  layoutFixed: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.164)',
    zIndex: 800,
  },
  contentWrapper: {
    marginTop: 51,
    marginLeft: 230,

    '&.extend': {
      marginLeft: 0,
    },
  },
}));

const PatientDetails = () => {
  const [show, setShow] = useState(false);
  const classes = useStyle();
  const location = useLocation();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const contentWrapper = useRef();
  const layoutFixed = useRef();

  const handleLayoutFixed = () => {
    layoutFixed.current.style.display = 'none';
    setShow(false);
  };

  const handlePushMenu = () => {
    setShow(true);
    layoutFixed.current.style.display = 'block';
  };

  useLayoutEffect(() => {
    if (mobileDevice) {
      setShow(false);
      contentWrapper.current.classList.add('extend');
    } else {
      setShow(true);
      contentWrapper.current.classList.remove('extend');
      layoutFixed.current.style.display = 'none';
    }
  }, [mobileDevice]);

  return (
    <Page title='Patient Details' className='h-100 hidden'>
      <Topbar show={show} handlePush={handlePushMenu} />
      <div className='d-flex'>
        <div
          className={classes.layoutFixed}
          ref={layoutFixed}
          onClick={handleLayoutFixed}
        />
        <Sidebar location={location} show={show} />
        <Box className={classes.contentWrapper} ref={contentWrapper}>
          <h1>Please show me {show}</h1>
        </Box>
      </div>
    </Page>
  );
};

export default PatientDetails;
