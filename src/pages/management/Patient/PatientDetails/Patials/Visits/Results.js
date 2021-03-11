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

const applyPagination = (datas, page, limit) => {
  return datas.slice(page * limit, page * limit + limit);
};

const Results = ({ className, datas, ...rest }) => {
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25],
  });

  const header = [
    'Admitted date',
    'Discharged date',
    'Room no.',
    'Bed no.',
    '',
  ];

  const handleSelectOneData = (event, dataId) => {
    if (!selectedDatas.includes(dataId)) {
      setSelectedDatas((prevSelected) => [...prevSelected, dataId]);
    } else {
      setSelectedDatas((prevSelected) =>
        prevSelected.filter((id) => id !== dataId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPaginate({ ...paginate, page: newPage });
  };

  const handleLimitChange = (event) => {
    setPaginate({ ...paginate, rowsPerPage: parseInt(event.target.value) });
    if (event.target.value >= datas.length) {
      setPaginate({ ...paginate, page: 0 });
    }
  };

  const paginatedDatas = applyPagination(
    datas,
    paginate.page,
    paginate.rowsPerPage
  );

  return (
    <Card className='overflow-hidden' style={{ borderRadius: '.5rem' }}>
      <Table
        header={header}
        checkbox
        selectedData={selectedDatas}
        data={datas}
        onSelect={(e) =>
          setSelectedDatas(e ? datas.map((data) => data.id) : [])
        }
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        paginate={paginate}
        minWidth='500px'
      >
        {paginatedDatas
          .filter((data) => data.employeeDetails !== null)
          .map((data) => {
            const isDataSelected = selectedDatas.includes(data.id);

            return (
              <TableRow hover key={data.id} selected={isDataSelected}>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={isDataSelected}
                    onChange={(event) => handleSelectOneData(event, data.id)}
                    value={isDataSelected}
                  />
                </TableCell>
                <TableCell>
                  {data.employeeDetails.firstname}{' '}
                  {data.employeeDetails.lastname}
                </TableCell>
                <TableCell className='text-capitalize'>
                  {data.employeeDetails.gender}
                </TableCell>
                <TableCell>{data.specialty}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.employeeDetails.address}</TableCell>
                <TableCell align='right'>
                  <Link to='/data/management/all'>
                    <Button variant='primary' className='mr-2'>
                      Appointment
                    </Button>
                  </Link>
                  <Link to='/data/management/all'>
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
  datas: PropTypes.array.isRequired,
};

Results.defaultProps = {
  datas: [],
};

export default Results;
