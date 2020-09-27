import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, Form, FormControl, Button } from 'react-bootstrap';
import Avatar from 'src/components/Avatar';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar';
import {
  Search as SearchIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from 'react-feather';
import Table from 'src/components/Table';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
import TableHead from 'src/components/TableHead';
import TableBody from 'src/components/TableBody';
import Checkbox from 'src/components/Checkbox';

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

const applyFilters = (patients, query, filters) => {
  return patients.filter((patient) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (patient[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && patient[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (patients, page, limit) => {
  return patients.slice(page * limit, page * limit + limit);
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

const applySort = (patients, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = patients.map((el, index) => [el, index]);

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
    marginLeft: 2,
  },
};

const Results = ({ className, patients, ...rest }) => {
  const [selectedPatients, setSelectedPatients] = useState([]);
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
    setSelectedPatients([]);
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllPatients = (event) => {
    setSelectedPatients(event ? patients.map((patient) => patient.id) : []);
  };

  const handleSelectOnePatient = (event, patientId) => {
    if (!selectedPatients.includes(patientId)) {
      setSelectedPatients((prevSelected) => [...prevSelected, patientId]);
    } else {
      setSelectedPatients((prevSelected) =>
        prevSelected.filter((id) => id !== patientId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPatients = applyFilters(patients, query, filters);
  const sortedPatients = applySort(filteredPatients, sort);
  const paginatedPatients = applyPagination(sortedPatients, page, limit);
  const enableBulkOperations = selectedPatients.length > 0;
  const selectedSomepatients =
    selectedPatients.length > 0 && selectedPatients.length < patients.length;
  const selectedAllPatients = selectedPatients.length === patients.length;

  return (
    <Card className='overflow-hidden' style={{ borderRadius: '.5rem' }}>
      <div
        style={{ minHeight: '56px' }}
        className='d-flex align-items-center justify-content-between p-2 flex-wrap'
      >
        <Card
          style={{ maxWidth: '300px' }}
          className='flex-row align-items-center border px-2 m-1'
        >
          <SearchIcon className='text-secondary' />
          <FormControl
            className='borderless unfocus'
            onChange={handleQueryChange}
            placeholder='Search patients'
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
          className='m-1'
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
              checked={selectedAllPatients}
              indeterminate={selectedSomepatients}
              onChange={handleSelectAllPatients}
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
                    checked={selectedAllPatients}
                    indeterminate={selectedSomepatients}
                    onChange={(e) => handleSelectAllPatients(e)}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Diagnose</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Blood</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody fontWeight='400'>
              {paginatedPatients.map((doctor) => {
                const isPatientSelected = selectedPatients.includes(doctor.id);

                return (
                  <TableRow hover key={doctor.id} selected={isPatientSelected}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isPatientSelected}
                        onChange={(event) =>
                          handleSelectOnePatient(event, doctor.id)
                        }
                        value={isPatientSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar img={doctor.avatar} className='mr-2' />
                      {doctor.firstName} {doctor.lastName}
                    </TableCell>
                    <TableCell>{doctor.gender}</TableCell>
                    <TableCell>{doctor.diagnosis}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>{doctor.address}</TableCell>
                    <TableCell>{doctor.blood}</TableCell>
                    <TableCell>{doctor.dob}</TableCell>
                    <TableCell align='right'>
                      <Link to='/doctor/management/patients'>
                        <MoreHorizontalIcon fontSize='small' />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </HorizontalScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired,
};

Results.defaultProps = {
  patients: [],
};

export default Results;
