import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, FormControl, Button } from 'react-bootstrap';
import {
  Search as SearchIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from 'react-feather';
import Table from 'src/components/CustomTable';
import { TableRow, TableCell } from '@material-ui/core';
import Checkbox from 'src/components/Checkbox';

const applyFilters = (doctors, query) => {
  return doctors
    .filter((doctor) => doctor.specialty !== null)
    .filter((doctor) => {
      let matches = true;

      if (query) {
        const properties = ['email', 'specialty'];
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

      return matches;
    });
};

const applyPagination = (doctors, page, limit) => {
  return doctors.slice(page * limit, page * limit + limit);
};

const Results = ({ className, doctors, ...rest }) => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [query, setQuery] = useState('');
  const [paginate, setPaginate] = useState({
    page: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25],
  });

  const header = ['Name', 'Gender', 'Specialiazation', 'Email', 'Address', ''];

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
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
    setPaginate({ ...paginate, page: newPage });
  };

  const handleLimitChange = (event) => {
    setPaginate({ ...paginate, rowsPerPage: parseInt(event.target.value) });
    if (event.target.value >= doctors.length) {
      setPaginate({ ...paginate, page: 0 });
    }
  };

  const filteredDoctors = applyFilters(doctors, query);
  const paginatedDoctors = applyPagination(
    filteredDoctors,
    paginate.page,
    paginate.rowsPerPage
  );

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
            placeholder='Search employee'
            value={query}
            variant='outlined'
          />
        </Card>
      </div>
      <Table
        header={header}
        checkbox
        selectedData={selectedDoctors}
        data={filteredDoctors}
        onSelect={(e) =>
          setSelectedDoctors(e ? doctors.map((doctor) => doctor.id) : [])
        }
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        paginate={paginate}
        minWidth='1100px'
      >
        {paginatedDoctors
          .filter((doctor) => doctor.employeeDetails !== null)
          .map((doctor) => {
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
                  {doctor.employeeDetails.firstname}{' '}
                  {doctor.employeeDetails.lastname}
                </TableCell>
                <TableCell className='text-capitalize'>
                  {doctor.employeeDetails.gender}
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.employeeDetails.address}</TableCell>
                <TableCell align='right'>
                  <Link to='/doctor/management/all'>
                    <Button variant='primary' className='mr-2'>
                      Appointment
                    </Button>
                  </Link>
                  <Link to='/doctor/management/all'>
                    <MoreHorizontalIcon fontSize='small' />
                  </Link>
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
  doctors: PropTypes.array.isRequired,
};

Results.defaultProps = {
  doctors: [],
};

export default Results;
