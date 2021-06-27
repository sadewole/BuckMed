import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import Table from 'src/components/CustomTable';
import { TableRow, TableCell } from '@material-ui/core';
import { dateFormatter } from 'src/utils/formatter';
import { deletePatientAdmissionRecord } from 'src/slices/patient';
import { useDispatch } from 'src/store';
import { useSnackbar } from 'notistack';
import NewAdmission from './Partials/NewAdmission';

const applyPagination = (datas, page, limit) => {
  return datas.slice(page * limit, page * limit + limit);
};

const Results = ({
  className,
  datas,
  show,
  setShow,
  action,
  setAction,
  selectedContent,
  setSelectedContent,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
    'Actions',
  ];

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

  const handleEdit = (content) => {
    setAction('Edit');
    setShow(true);
    setSelectedContent(content);
  };

  const handleDelete = (id) => {
    dispatch(deletePatientAdmissionRecord(id)).then((res) => {
      if (res.success === true) {
        enqueueSnackbar(res.message, {
          variant: 'success',
        });
      }
    });
  };

  return (
    <Card className='overflow-hidden' style={{ borderRadius: '.5rem' }}>
      <Table
        header={header}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        paginate={paginate}
        minWidth='500px'
      >
        {paginatedDatas.length ? (
          paginatedDatas.map((data, index) => {
            return (
              <TableRow hover key={index}>
                <TableCell>{dateFormatter(data.admittedOn)}</TableCell>
                <TableCell>{dateFormatter(data.dischargedOn)}</TableCell>
                <TableCell>{data.roomNumber}</TableCell>
                <TableCell>{data.bedNumber}</TableCell>
                <TableCell>
                  <div className='d-flex align-items-center justify-content-center'>
                    <IconButton
                      aria-label='edit'
                      onClick={() => handleEdit(data)}
                    >
                      <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      onClick={() => handleDelete(data.id)}
                    >
                      <DeleteIcon fontSize='small' style={{ color: 'red' }} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            {/** Empty item */}
            <TableCell
              colSpan='100%'
              align='center'
              style={{ color: 'darkgray', padding: '30px' }}
            >
              No record
            </TableCell>
          </TableRow>
        )}
      </Table>
      <NewAdmission
        show={show}
        setShow={setShow}
        selectedContent={selectedContent}
        action={action}
        setAction={setAction}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  datas: PropTypes.array.isRequired,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  action: PropTypes.string,
  setAction: PropTypes.func,
  selectedContent: PropTypes.object,
  setSelectedContent: PropTypes.func,
};

Results.defaultProps = {
  datas: [],
};

export default Results;
