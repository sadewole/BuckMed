import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import editIcon from '@iconify/icons-fa-solid/edit';
import trashIcon from '@iconify/icons-fa-solid/trash-alt';
import Table from 'src/components/CustomTable';
import { TableRow, TableCell } from '@material-ui/core';
import { PrescriptionModal } from './Modals/PrescriptionModal';

const header = [
  'Drug Name',
  'Drug quality',
  'Dosage',
  'Start date',
  'Period',
  'Note',
  'Actions',
];

const Prescription = ({ drugs }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button variant='primary' onClick={handleShowModal} className='my-3'>
        <InlineIcon icon={plusCircle} className='mr-1' />
        Add Drug Precription
      </Button>
      <Card>
        <HorizontalScrollbar>
          <div style={{ minWidth: '700px' }}>
            <Table header={header}>
              {drugs.length > 0 ? (
                drugs.map((drug) => {
                  return (
                    <TableRow key={drug.id}>
                      <TableCell>{drug.drug_name}</TableCell>
                      <TableCell>{drug.drug_quality}</TableCell>
                      <TableCell>{drug.dosage}</TableCell>
                      <TableCell>{drug.start_date}</TableCell>
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
          </div>
        </HorizontalScrollbar>
      </Card>

      <PrescriptionModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

Prescription.defaultProps = {
  drugs: [],
};

export default Prescription;
