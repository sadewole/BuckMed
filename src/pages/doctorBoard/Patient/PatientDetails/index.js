import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import Page from 'src/components/Page';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { useTheme, useMediaQuery, makeStyles, Box } from '@material-ui/core';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Board } from './Patials/Board';
import { Forms } from './Patials/Forms';
import Prescription from './Patials/Prescription';
import { Treatment } from './Patials/Treatment';
import Billing from './Patials/Billing';
import { Timeline } from './Patials/Timeline';

const useStyle = makeStyles(() => ({
  layoutFixed: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.164)',
    zIndex: 80,
  },
  mainWrapper: {
    width: '100%',
    marginTop: 51,
    marginLeft: 230,
    paddingTop: 10,

    '&.extend': {
      marginLeft: 0,
    },
  },
}));

const PatientDetails = () => {
  const [show, setShow] = useState(false);
  const classes = useStyle();
  const { label } = useParams();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const mainWrapper = useRef();
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
      mainWrapper.current.classList.add('extend');
    } else {
      setShow(true);
      mainWrapper.current.classList.remove('extend');
      layoutFixed.current.style.display = 'none';
    }
  }, [mobileDevice]);

  const View = () => {
    switch (label) {
      case 'board':
        return <Board />;
      case 'timeline':
        return <Timeline />;
      case 'forms':
        return <Forms />;
      case 'prescription':
        return <Prescription />;
      case 'treament_plan':
        return <Treatment />;
      case 'billing':
        return <Billing />;
      default:
        return <Redirect to='/404' />;
    }
  };

  return (
    <Page title='Patient Details' className='h-100 hidden'>
      <Topbar show={show} handlePush={handlePushMenu} />
      <div className='d-flex'>
        <div
          className={classes.layoutFixed}
          ref={layoutFixed}
          onClick={handleLayoutFixed}
        />
        <Sidebar show={show} />
        <Box className={classes.mainWrapper} ref={mainWrapper}>
          {View()}
        </Box>
      </div>
    </Page>
  );
};

export default PatientDetails;
