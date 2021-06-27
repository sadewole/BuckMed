import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import editIcon from '@iconify/icons-fa-solid/edit';
import trashIcon from '@iconify/icons-fa-solid/trash-alt';
import Table from 'src/components/CustomTable';
import { TableRow, TableCell } from '@material-ui/core';
import { PrescriptionModal } from './Modal';
import { fetchPatientPrescriptionRecords } from 'src/slices/patient';
import { useDispatch, useSelector } from 'src/store';
import { dateFormatter } from 'src/utils/formatter';

const header = [
  'Drug Name',
  'Drug type',
  'Dosage',
  'Start date',
  'Period',
  'Note',
  'Actions',
];

const Prescription = () => {
  const dispatch = useDispatch();
  const { prescriptionRecord } = useSelector((state) => state.patient);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [action, setAction] = useState('Create');

  const handleShowModal = () => {
    setAction('Create');
    setShowModal(true);
  };
  const { patientId } = useParams();

  useEffect(() => {
    dispatch(fetchPatientPrescriptionRecords(patientId));
  }, [dispatch, patientId]);

  const [paginate, setPaginate] = useState({
    page: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25],
  });

  const handlePageChange = (event, newPage) => {
    setPaginate({ ...paginate, page: newPage });
  };

  const handleLimitChange = (event) => {
    setPaginate({ ...paginate, rowsPerPage: parseInt(event.target.value) });
  };

  return (
    <>
      <Button variant='primary' onClick={handleShowModal} className='my-3'>
        <InlineIcon icon={plusCircle} className='mr-1' />
        Add Drug Precription
      </Button>
      <Card>
        <Table
          header={header}
          data={prescriptionRecord}
          paginate={paginate}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        >
          {prescriptionRecord.length > 0 ? (
            prescriptionRecord.map((drug) => {
              return (
                <TableRow key={drug.id}>
                  <TableCell>{drug.drugName}</TableCell>
                  <TableCell>{drug.drugType}</TableCell>
                  <TableCell>{drug.dosage}</TableCell>
                  <TableCell>{dateFormatter(drug.startDate)}</TableCell>
                  <TableCell>{drug.period}</TableCell>
                  <TableCell>{drug.note}</TableCell>
                  <TableCell align='right'>
                    <InlineIcon icon={editIcon} className='mr-1' />
                    <InlineIcon icon={trashIcon} className='mr-1' />
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
                Create new item
              </TableCell>
            </TableRow>
          )}
        </Table>
      </Card>

      <PrescriptionModal
        showModal={showModal}
        setShowModal={setShowModal}
        action={action}
        setAction={setAction}
        selectedContent={selectedContent}
      />
    </>
  );
};

export default Prescription;
