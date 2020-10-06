import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, FormControl, Button } from 'react-bootstrap';
import Avatar from 'src/components/Avatar';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar';
import {
  Search as SearchIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from 'react-feather';
import Table from 'src/components/Table';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
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

const applyFilters = (doctors, query, filters) => {
  return doctors.filter((doctor) => {
    let matches = true;

    if (query) {
      const properties = ['email', 'firstName', 'lastName'];
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

const Results = ({ className, doctors, ...rest }) => {
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);

  const header = ['Name', 'Gender', 'Specialiazation', 'Email', 'Address', ''];

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
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

  const rowSelection = {
    selectedSome:
      selectedDoctors.length > 0 && selectedDoctors.length < doctors.length,
    selectedAllData: selectedDoctors.length === doctors.length,
    onSelect: (e) =>
      setSelectedDoctors(e ? doctors.map((doctor) => doctor.id) : []),
  };

  const filteredDoctors = applyFilters(doctors, query);
  const sortedDoctors = applySort(filteredDoctors, sort);
  const paginatedDoctors = applyPagination(sortedDoctors, page, limit);
  const enableBulkOperations = selectedDoctors.length > 0;

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
          className='m-1'
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormControl>
      </div>
      <HorizontalScrollbar>
        <div style={{ minWidth: '700px' }}>
          <Table header={header} checkbox rowSelection={rowSelection}>
            {sortedDoctors.map((doctor) => {
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
        </div>
      </HorizontalScrollbar>
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
