import React from 'react';
import PropTypes from 'prop-types';
import { Link, matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  AlertCircle as AlertCircleIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  Share2 as ShareIcon,
  Users as UsersIcon,
} from 'react-feather';
import { Card, ListGroup } from 'react-bootstrap';
import NavItem from './NavItem';
import Avatar from 'src/common/Avatar';

const sections = [
  {
    subheader: 'Reports',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/doctor/dashboard',
      },
    ],
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Doctors',
        icon: UsersIcon,
        href: '/doctor/management/all',
      },
      {
        title: 'Patients',
        icon: UsersIcon,
        href: '/doctor/management/patients',
      },
      {
        title: 'Lab. Records',
        icon: FolderIcon,
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
        icon: FolderIcon,
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
        icon: BriefcaseIcon,
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
        icon: MessageCircleIcon,
      },
      {
        title: 'Appointment',
        href: '/doctor/appointment',
        icon: CalendarIcon,
      },
    ],
  },
  {
    subheader: 'Pages',
    items: [
      {
        title: 'Account',
        href: '/doctor/account',
        icon: UserIcon,
      },
      {
        title: 'Pricing',
        href: '/pricing',
        icon: DollarSignIcon,
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <ListGroup disablePadding>
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

const NavIndex = (props) => {
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
        <Card className='p-2 borderless'>
          <Link to='/'>Logo</Link>
        </Card>
        <Card className='p-2'>
          <Card className='justify-content-center borderless text-center align-items-center'>
            <Link to='/doctor/account'>
              <Avatar rounded size='large' img='/static/img/experts/4.png' />
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
      <Scrollbar className='flex-grow-1'>
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

        <Divider />
        <Card className='p-2 borderless'>
          <Card className='p-2'>
            <h6 className='text-primary'>Need Help?</h6>
            <Link className='text-secondary' to='/docs'>
              <small>Check our docs</small>
            </Link>
          </Card>
        </Card>
      </Scrollbar>
    </Card>
  );

  return <LeftSideBar className='show'>{content}</LeftSideBar>;
};

const Divider = styled.hr`
  margin: 10px 0;
`;

const Scrollbar = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    outline: 1px solid slategrey;
    background-color: darkgray;
  }
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
  /* display: none; */
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
