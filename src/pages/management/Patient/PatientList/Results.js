import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, FormControl, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Tabs, Tab, Paper, TableRow, TableCell } from '@material-ui/core';
import Avatar from 'src/components/Avatar';
import {
  Search as SearchIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from 'react-feather';
import Table from 'src/components/CustomTable';

const tabs = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'hasAcceptedMarketing',
    label: 'OutPatients',
  },
  {
    value: 'isProspect',
    label: 'InPatients',
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

const applyFilters = (patients, query, filters) => {
  return patients.filter((patient) => {
    let matches = true;

    if (query) {
      const properties = ['firstName', 'lastName'];
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

const Results = ({ className, patients }) => {
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null,
  });

  const [paginate, setPaginate] = useState({
    page: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25],
  });

  const header = [
    'Name',
    'Gender',
    'Diagnosis',
    'Phone',
    'Address',
    'Blood',
    'Date of Birth',
    '',
  ];

  const handleTabsChange = (event, value) => {
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

  const handleSelected = (event, patientId) => {
    if (!selectedPatients.includes(patientId)) {
      setSelectedPatients((prevSelected) => [...prevSelected, patientId]);
    } else {
      setSelectedPatients((prevSelected) =>
        prevSelected.filter((id) => id !== patientId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPaginate({ ...paginate, page: newPage });
  };

  const handleLimitChange = (event) => {
    setPaginate({ ...paginate, rowsPerPage: parseInt(event.target.value) });
    if (event.target.value >= patients.length) {
      setPaginate({ ...paginate, page: 0 });
    }
  };

  const filteredPatients = applyFilters(patients, query, filters);
  const sortedPatients = applySort(filteredPatients, sort);
  const paginatedPatients = applyPagination(
    sortedPatients,
    paginate.page,
    paginate.rowsPerPage
  );

  return (
    <Card className='overflow-hidden' style={{ borderRadius: '.5rem' }}>
      <Paper>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons='auto'
          indicatorColor='primary'
          textColor='primary'
          value={currentTab}
          variant='scrollable'
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Paper>
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
      <Table
        header={header}
        selectedData={selectedPatients}
        data={sortedPatients}
        onSelect={(e) =>
          setSelectedPatients(e ? patients.map((patient) => patient.id) : [])
        }
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        paginate={paginate}
        minWidth='1100px'
      >
        {paginatedPatients.map((patient) => {
          const isPatientSelected = selectedPatients.includes(patient.id);

          return (
            <TableRow hover key={patient.id} selected={isPatientSelected}>
              <TableCell>
                <Avatar img={patient.avatar} className='mr-2' />
                {patient.firstName} {patient.lastName}
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.diagnosis}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>{patient.blood}</TableCell>
              <TableCell>{patient.dob}</TableCell>
              <TableCell align='right'>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    as={MoreHorizontalIcon}
                    variant='link'
                    className='cursor-pointer'
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={RouterLink}
                      to={`/doctor/management/patients/${1}/board`}
                    >
                      View
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={RouterLink}
                      to={`/doctor/management/patients/${1}/edit`}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
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
