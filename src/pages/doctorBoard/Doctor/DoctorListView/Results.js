import React, { useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
// import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Card,
  Form,
  FormControl,
  FormCheck,
  Button,
} from 'react-bootstrap';
import Avatar from 'src/components/Avatar';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar';
// import {
//   Box,
//   Button,
//   Card,
//   Checkbox,
//   Divider,
//   IconButton,
//   InputAdornment,
//   Link,
//   SvgIcon,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TextField,
//   Typography,
//   makeStyles,
// } from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon,
} from 'react-feather';
import Table from 'src/components/Table';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
import TableHead from 'src/components/TableHead';
import TableBody from 'src/components/TableBody';
import Checkbox from 'src/components/Checkbox';
// import getInitials from 'src/utils/getInitials';

const tabs = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'hasAcceptedMarketing',
    label: 'Accepts Marketing',
  },
  {
    value: 'isProspect',
    label: 'Prospect',
  },
  {
    value: 'isReturning',
    label: 'Returning',
  },
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)',
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)',
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)',
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)',
  },
];

const applyFilters = (doctors, query, filters) => {
  return doctors.filter((doctor) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (doctor[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && doctor[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (doctors, page, limit) => {
  return doctors.slice(page * limit, page * limit + limit);
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const applySort = (doctors, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = doctors.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const classes = {
  root: {},
  queryField: {
    width: '500px',
  },
  bulkOperations: {
    position: 'relative',
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    // backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    // marginLeft: theme.spacing(2),
  },
};

const Results = ({ className, doctors, ...rest }) => {
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null,
  });

  const handleTabsChange = (value) => {
    const updatedFilters = {
      ...filters,
      hasAcceptedMarketing: null,
      isProspect: null,
      isReturning: null,
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setSelectedDoctors([]);
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllDoctors = (event) => {
    setSelectedDoctors(event ? doctors.map((doctor) => doctor.id) : []);
  };

  const handleSelectOneDoctor = (event, doctorId) => {
    if (!selectedDoctors.includes(doctorId)) {
      setSelectedDoctors((prevSelected) => [...prevSelected, doctorId]);
    } else {
      setSelectedDoctors((prevSelected) =>
        prevSelected.filter((id) => id !== doctorId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredDoctors = applyFilters(doctors, query, filters);
  const sortedDoctors = applySort(filteredDoctors, sort);
  const paginatedDoctors = applyPagination(sortedDoctors, page, limit);
  const enableBulkOperations = selectedDoctors.length > 0;
  const selectedSomeDoctors =
    selectedDoctors.length > 0 && selectedDoctors.length < doctors.length;
  const selectedAllDoctors = selectedDoctors.length === doctors.length;

  return (
    <Card className='overflow-hidden' style={{ borderRadius: '.5rem' }}>
      <Tabs
        onSelect={handleTabsChange}
        className='text-secondary px-2'
        activeKey={currentTab}
        variant='tabs'
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
        ))}
      </Tabs>
      <div
        style={{ minHeight: '56px' }}
        className='d-flex align-items-center justify-content-between p-2 flex-wrap'
      >
        <Card
          style={{ maxWidth: '300px' }}
          className='flex-row align-items-center border px-2'
        >
          <SearchIcon className='text-secondary' />
          <FormControl
            className='borderless unfocus'
            onChange={handleQueryChange}
            placeholder='Search doctors'
            value={query}
            variant='outlined'
          />
        </Card>

        <FormControl
          label='Sort By'
          name='sort'
          onChange={handleSortChange}
          value={sort}
          variant='outlined'
          style={{ maxWidth: '300px' }}
          as='select'
          custom
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormControl>
      </div>
      {/*{enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllDoctors}
              indeterminate={selectedSomeDoctors}
              onChange={handleSelectAllDoctors}
            />
            <Button variant='outlined' className={classes.bulkAction}>
              Delete
            </Button>
            <Button variant='outlined' className={classes.bulkAction}>
              Edit
            </Button>
          </div>
        </div>
      )} */}
      <HorizontalScrollbar>
        <div style={{ minWidth: '700px' }}>
          <Table>
            <TableHead fontWeight='600'>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedAllDoctors}
                    indeterminate={selectedSomeDoctors}
                    onChange={(e) => handleSelectAllDoctors(e)}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody fontWeight='400'>
              {paginatedDoctors.map((doctor) => {
                const isDoctorSelected = selectedDoctors.includes(doctor.id);

                return (
                  <TableRow hover key={doctor.id} selected={isDoctorSelected}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isDoctorSelected}
                        onChange={(event) =>
                          handleSelectOneDoctor(event, doctor.id)
                        }
                        value={isDoctorSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar img={doctor.avatar} className='mr-2' />
                      {doctor.firstName} {doctor.lastName}
                    </TableCell>
                    <TableCell>{doctor.gender}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.address}</TableCell>
                    <TableCell align='right'>
                      <Link to='/app/management/customers/1/edit'>
                        <EditIcon fontSize='small' />
                      </Link>
                      <Link to='/app/management/customers/1'>
                        <ArrowRightIcon fontSize='small' />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            {/* <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedAllCustomers}
                    indeterminate={selectedSomeCustomers}
                    onChange={handleSelectAllCustomers}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>Spent</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {
                const isCustomerSelected = selectedCustomers.includes(
                  customer.id
                );

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isCustomerSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isCustomerSelected}
                        onChange={(event) =>
                          handleSelectOneCustomer(event, customer.id)
                        }
                        value={isCustomerSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center'>
                        <Avatar
                          className={classes.avatar}
                          src={customer.avatar}
                        >
                          {getInitials(customer.name)}
                        </Avatar>
                        <div>
                          <Link
                            color='inherit'
                            component={RouterLink}
                            to='/app/management/customers/1'
                            variant='h6'
                          >
                            {customer.name}
                          </Link>
                          <Typography variant='body2' color='textSecondary'>
                            {customer.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {`${customer.city}, ${customer.state}, ${customer.country}`}
                    </TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>
                      {numeral(customer.totalAmountSpent).format(
                        `${customer.currency}0,0.00`
                      )}
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        component={RouterLink}
                        to='/app/management/customers/1/edit'
                      >
                        <SvgIcon fontSize='small'>
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to='/app/management/customers/1'
                      >
                        <SvgIcon fontSize='small'>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody> */}
          </Table>
        </div>
      </HorizontalScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
};

Results.defaultProps = {
  customers: [],
};

export default Results;
