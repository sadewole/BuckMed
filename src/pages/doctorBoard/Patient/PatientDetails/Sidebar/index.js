import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ListGroupItem, ButtonGroup } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Tag from '@iconify/icons-fa-solid/tag';
import { colors } from '@material-ui/core';

const labels = [
  {
    id: 'board',
    name: 'Dashboard',
    color: colors.blue[600],
  },
  {
    id: 'timeline',
    name: 'Timeline',
    color: colors.deepOrange[600],
  },
  {
    id: 'forms',
    name: 'Forms',
    color: colors.amber[600],
  },
  {
    id: 'prescription',
    name: 'Prescription',
    color: colors.red[600],
  },
  {
    id: 'billing',
    name: 'Billing',
    color: colors.lightGreen[600],
  },
];

const Sidebar = ({ show }) => {
  const { patientId } = useParams();
  return (
    <Drawer className={show ? 'show' : undefined}>
      {labels.map((label) => (
        <ListGroupItem key={label.id} style={{ paddingLeft: 0, border: 0 }}>
          <NavLink to={`/doctor/management/patients/${patientId}/${label.id}`}>
            <ButtonGroup className='sidenavItem'>
              <Icon
                icon={Tag}
                style={{ color: label.color }}
                className='mr-2'
              />
              {label.name}
            </ButtonGroup>
          </NavLink>
        </ListGroupItem>
      ))}
    </Drawer>
  );
};

const Drawer = styled.aside`
  width: 230px;
  display: flex;
  position: fixed;
  margin-left: -350px;
  flex-direction: column;
  background: #fff;
  margin-top: 51px !important;
  height: calc(100vh - 120px);
  z-index: 120;
  transition: all 0.5s ease-in-out;

  &.show {
    margin-left: -15px;
  }

  .btn-group {
    width: 90%;
    height: 30px;
    color: #000;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    padding-right: 18px;
    padding-left: 32px;
    align-items: center;
  }
  a {
    color: inherit;
    text-decoration: none !important;

    &:hover {
      text-decoration: none !important;
    }
  }

  .active .sidenavItem {
    background: #e3e3e3;
  }
`;

Sidebar.propTypes = {
  location: PropTypes.object,
  show: PropTypes.bool,
};

export default Sidebar;
