import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TableRow from './TableRow';
import TableCell from './TableCell';
import Checkbox from './Checkbox';

const Table = ({
  children,
  header,
  hovered,
  responsive,
  bordered = false,
  light = false,
  dark = false,
  checkbox,
  paginate,
  rowSelection,
  empty
}) => {
  let selectedSome, selectedAllData, onSelect;

  if (rowSelection) {
    selectedSome = rowSelection.selectedSome;
    selectedAllData = rowSelection.selectedAllData;
    onSelect = rowSelection.onSelect;
  }

  if ([null, false, undefined].includes(checkbox)) {
    checkbox = false;
  } else {
    checkbox = true;
  }

  return (
    <div>
      <TableContainer className={`${bordered && 'table-bordered'}`}>
        <TableHead>
          <TableRow>
            {checkbox ? (
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={selectedAllData}
                  indeterminate={selectedSome}
                  onChange={(e) => onSelect(e)}
                />
              </TableCell>
            ) : null}

            {header.map((head, index) => {
              return <TableCell key={index}>{head}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </TableContainer>
    </div>
  );
};

const TableContainer = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 1px;

  &.table-bordered {
    border: 1px solid #eaeaea;
  }
`;

const TableHead = styled.div`
  display: table-header-group;
  color: #000;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.09px;
  //   color: #bcbec0;
  text-transform: uppercase;

  div {
    font-weight: bold;
  }
`;

const TableBody = styled.div`
  display: table-row-group;
  box-shadow: 0 15px 40px 0 rgba(39, 59, 110, 0.1);
`;

Table.propTypes = {};

export default Table;
