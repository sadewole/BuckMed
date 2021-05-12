import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import Page from 'src/components/Page';
import { Redirect, useParams } from 'react-router-dom';
import { useTheme, useMediaQuery, makeStyles, Box } from '@material-ui/core';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Visits from './Patials/Visits';
import Board from './Patials/Board';
import Prescription from './Patials/Prescription';
import Billing from './Patials/Billings';
import Timeline from './Patials/Timeline';
import { useDispatch, useSelector } from 'src/store';
import { fetchPatient } from 'src/slices/patient';

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
  const dispatch = useDispatch();
  const { patient } = useSelector((state) => state.patient);
  const [show, setShow] = useState(false);
  const classes = useStyle();
  const { label, patientId } = useParams();
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

  useEffect(() => {
    dispatch(fetchPatient(patientId));
  }, [dispatch, patientId]);

  const View = () => {
    switch (label) {
      case 'board':
        return <Board />;
      case 'timeline':
        return <Timeline />;
      case 'visits':
        return <Visits />;
      case 'prescription':
        return <Prescription />;
      case 'billing':
        return <Billing />;
      default:
        return <Redirect to='/404' />;
    }
  };

  return (
    <Page title='Patient Details' className='h-100 hidden'>
      <Topbar show={show} handlePush={handlePushMenu} patient={patient} />
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
