import React from 'react';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar';
import Table from 'src/components/Table';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
import Checkbox from 'src/components/Checkbox';

const header = [
  'Drug group',
  'Drug Name',
  'Drug quality',
  'Dosage',
  'Start date',
  'Period',
  'Note',
  '',
];

export const Billing = () => {
  return (
    <div>
      <HorizontalScrollbar>
        <div style={{ minWidth: '700px' }}></div>
      </HorizontalScrollbar>
    </div>
  );
};
