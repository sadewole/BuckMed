import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ListGroupItem, Button, Collapse } from 'react-bootstrap';

const NavItem = ({
  children,
  href,
  depth,
  title,
  info: Info,
  open: openProp,
  icon: Icon,
  className,
}) => {
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListGroupItem style={classes.item} className='borderless' key={title}>
        <Button
          onClick={handleToggle}
          style={classes.button}
          className='d-flex align-items-center py-2 unfocus'
          variant='link'
        >
          {Icon && <Icon style={classes.icon} size='20' />}
          <span style={classes.title}>{title}</span>
          {open ? (
            <i className='fas fa-chevron-up' />
          ) : (
            <i className='fas fa-chevron-down' />
          )}
        </Button>
        <Collapse in={open} className='borderless ml-2' style={style}>
          {children}
        </Collapse>
      </ListGroupItem>
    );
  }

  return (
    <ListGroupItem style={classes.itemLeaf} key={title} className='borderless'>
      <NavLink
        exact
        to={href}
        className='d-flex align-items-center py-2 sidenavItem'
      >
        {Icon && <Icon style={classes.icon} size='20' />}
        <span style={classes.title}>{title}</span>
        {Info && <Info />}
      </NavLink>
    </ListGroupItem>
  );
};

const classes = {
  button: {
    color: '#333',
    padding: '10px 0px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    outline: 'none',
  },
  buttonLeaf: {
    color: '#333',
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: 600,
  },
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  title: {
    marginRight: 'auto',
  },
};

NavItem.propTypes = {};

export default NavItem;
