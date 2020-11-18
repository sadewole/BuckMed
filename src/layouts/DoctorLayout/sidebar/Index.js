import React from 'react';
import PropTypes from 'prop-types';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import doctorIcon from '@iconify/icons-fa-solid/user-md';
import pieChartIcon from '@iconify/icons-fa-solid/chart-pie';
import messageCircleIcon from '@iconify/icons-fa-solid/comment';
import briefcaseMedicalIcon from '@iconify/icons-fa-solid/briefcase-medical';
import calendarIcon from '@iconify/icons-fa-solid/calendar-plus';
import userIcon from '@iconify/icons-fa-solid/user-alt';
import priceTagIcon from '@iconify/icons-fa-solid/tags';
import patientIcon from '@iconify-icons/medical-icon/i-outpatient';
import labRecordIcon from '@iconify-icons/medical-icon/i-medical-records';
import fileInvoiceIcon from '@iconify/icons-fa-solid/file-invoice-dollar';
import { Card, ListGroup } from 'react-bootstrap';
import NavItem from './NavItem';
import Avatar from 'src/components/Avatar';
import Logo from 'src/components/Logo';

const sections = [
  {
    subheader: 'Reports',
    items: [
      {
        title: 'Dashboard',
        icon: pieChartIcon,
        href: '/doctor/dashboard',
      },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Doctors',
        icon: doctorIcon,
        href: '/doctor/management/all',
      },
      {
        title: 'Patients',
        icon: patientIcon,
        href: '/doctor/management/patients',
      },
      {
        title: 'Lab. Records',
        icon: labRecordIcon,
        href: '/doctor/management/records',
        items: [
          {
            title: 'List Records',
            href: '/doctor/management/records',
          },
          {
            title: 'View Order',
            href: '/doctor/management/records/1',
          },
        ],
      },
      {
        title: 'Finances',
        icon: fileInvoiceIcon,
        href: '/doctor/management/finances',
        items: [
          {
            title: 'List Finances',
            href: '/doctor/management/finances',
          },
          {
            title: 'View Finance',
            href: '/doctor/management/finances/1',
          },
        ],
      },
    ],
  },
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Projects',
        href: '/doctor/projects',
        icon: briefcaseMedicalIcon,
        items: [
          {
            title: 'Overview',
            href: '/doctor/projects/overview',
          },
          {
            title: 'Browse Projects',
            href: '/doctor/projects/browse',
          },
          {
            title: 'Create Project',
            href: '/doctor/projects/create',
          },
          {
            title: 'View Project',
            href: '/doctor/projects/1',
          },
        ],
      },
      {
        title: 'Chat',
        href: '/doctor/chat',
        icon: messageCircleIcon,
      },
      {
        title: 'Appointment',
        href: '/doctor/appointment',
        icon: calendarIcon,
      },
    ],
  },
  {
    subheader: 'Pages',
    items: [
      {
        title: 'Account',
        href: '/doctor/account',
        icon: userIcon,
      },
      {
        title: 'Pricing',
        href: '/pricing',
        icon: priceTagIcon,
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <ListGroup>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </ListGroup>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const NavIndex = ({ show }) => {
  const location = useLocation();
  const classes = {
    underlineNone: {
      textDecoration: 'none',
    },
  };

  const content = (
    <Card
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <Card className='p-2 borderless text-center'>
          <Link to='/'>
            <Logo />
          </Link>
        </Card>
        <Card className='p-2'>
          <Card className='justify-content-center borderless text-center align-items-center'>
            <Link to='/doctor/account'>
              <Avatar rounded size='large' img='/static/experts/4.png' />
            </Link>
          </Card>
          <Card className='text-center mt-2 borderless'>
            <Link
              to='/doctor/account'
              className={`text-primary ${clsx(classes.underlineNone)} `}
            >
              <h5>Dr. Shaun</h5>
            </Link>
            <p className='text-secondary'>
              Account Status:
              <Link to='/pricing' className='ml-2'>
                Available
              </Link>
            </p>
          </Card>
        </Card>
        <Divider />
      </div>
      <PerfectScrollbar className='flex-grow-1'>
        <Card className='p-2 borderless'>
          {sections.map((section) => (
            <ListGroup key={section.subheader} className='my-2'>
              <h4 className='px-4 text-secondary'>{section.subheader}</h4>
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </ListGroup>
          ))}
        </Card>
        <div className='flex-grow-1'></div>
        <Divider />
        <Card className='p-2 borderless'>
          <Card className='p-2 bg-primary text-white'>
            <h6>Need Help?</h6>
            <Link to='/docs'>
              <small>Check our docs</small>
            </Link>
          </Card>
        </Card>
      </PerfectScrollbar>
    </Card>
  );

  return (
    <LeftSideBar className={show ? 'show' : undefined}>{content}</LeftSideBar>
  );
};

const Divider = styled.hr`
  margin: 10px 0;
`;

const LeftSideBar = styled.aside`
  position: fixed;
  top: 0;
  left: -350px;
  height: 100vh;
  overflow-y: hidden;
  color: #343a40;
  z-index: 1038;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.691);
  transition: all 0.3s ease-in-out;
  width: 250px;

  &::before {
    transition: all 0.3s ease-in-out;
    width: 250px;
  }

  &.show {
    left: 0;
  }

  a {
    width: 100%;
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: none;
    }
  }
`;

NavIndex.propTypes = {};

export default NavIndex;
