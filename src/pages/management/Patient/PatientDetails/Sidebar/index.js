import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ListGroupItem, ButtonGroup } from 'react-bootstrap';
import { Icon as IconGroup } from '@iconify/react';
import ChartLineIcon from '@iconify/icons-fa-solid/chart-line';
import HistoryIcon from '@iconify/icons-fa-solid/history';
import FormIcon from '@iconify/icons-fa-solid/align-left';
import PrescriptionIcon from '@iconify/icons-fa-solid/prescription';
import TagIcon from '@iconify/icons-fa-solid/tags';
import { colors } from '@material-ui/core';

const labels = [
  {
    id: 'board',
    name: 'Dashboard',
    icon: ChartLineIcon,
    color: colors.blue[600],
  },
  {
    id: 'timeline',
    name: 'Timeline',
    icon: HistoryIcon,
    color: colors.deepOrange[600],
  },
  {
    id: 'visits',
    name: 'Visits',
    icon: FormIcon,
    color: colors.amber[600],
  },
  {
    id: 'prescription',
    name: 'Prescription',
    icon: PrescriptionIcon,
    color: colors.red[600],
  },
  {
    id: 'billing',
    name: 'Billing',
    icon: TagIcon,
    color: colors.lightGreen[600],
  },
];

const Sidebar = ({ show }) => {
  const { patientId } = useParams();
  return (
    <Drawer className={show ? 'show' : undefined}>
      {labels.map(({ id, name, icon: Icon, color }) => (
        <ListGroupItem key={id} style={{ paddingLeft: 0, border: 0 }}>
          <NavLink to={`/doctor/management/patients/${patientId}/${id}`}>
            <ButtonGroup className='sidenavItem'>
              <IconGroup
                icon={Icon}
                style={{ color: color }}
                className='mr-2'
              />
              {name}
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
