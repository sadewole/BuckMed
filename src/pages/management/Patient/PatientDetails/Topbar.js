import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Avatar from 'src/components/Avatar';
import { Icon } from '@iconify/react';
import BarIcon from '@iconify/icons-fa-solid/bars';

const useStyle = makeStyles(() => ({
  root: {
    width: '100%',
    background: '#fff',
    height: '60px',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    margin: '-10px -15px',
    paddingLeft: '20px',
    boxShadow: '5px 0 12px rgba(0,0,0,0.4)',
    zIndex: 100,
  },
}));

const Topbar = ({ user, show, handlePush, patient, ...rest }) => {
  const classes = useStyle();

  return (
    <nav className={classes.root} {...rest}>
      <ul className='navbar-nav' style={{ flexDirection: 'row' }}>
        <li
          className={`nav-item mr-2 cursor-pointer ${show && 'display-none'}`}
          onClick={handlePush}
        >
          <Icon icon={BarIcon} />
        </li>
        <li className='nav-item'>
          <Avatar
            rounded
            name={`${patient.firstName} ${patient.lastName}`}
            size='small'
          />
          <span className='mx-2'>
            {patient.firstName} {patient.lastName}
          </span>
        </li>
        <li className='nav-item'>
          <NavLink to={`/doctor/management/patients/${1}/edit`}>Edit</NavLink>
        </li>
      </ul>
    </nav>
  );
};

Topbar.propTypes = {
  handlePush: PropTypes.func,
  show: PropTypes.bool,
};

export default Topbar;
