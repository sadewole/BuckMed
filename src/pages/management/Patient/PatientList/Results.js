import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, FormControl, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Tabs, Tab, Paper, TableRow, TableCell } from '@material-ui/core';
import moment from 'moment';
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

const Results = ({ className, patients }) => {
  const [currentTab, setCurrentTab] = useState('all');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [query, setQuery] = useState('');
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
    'Phone',
    'Genotype',
    'Blood Group',
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
  const paginatedPatients = applyPagination(
    filteredPatients,
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
      </div>
      <Table
        header={header}
        selectedData={selectedPatients}
        data={filteredPatients}
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
                {patient.firstName} {patient.lastName}
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.phoneNumber}</TableCell>
              <TableCell>{patient.genotype}</TableCell>
              <TableCell>{patient.bloodGroup}</TableCell>
              <TableCell>
                {moment(patient.dateOfBirth).format('DD MMM, YYYY')}
              </TableCell>
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
                      to={`/doctor/management/patients/${patient.id}/board`}
                    >
                      View
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={RouterLink}
                      to={`/doctor/management/patients/${patient.id}/edit`}
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
