import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';

const CustomTable = ({
  children,
  header,
  checkbox,
  selectedData,
  data,
  onSelect,
}) => {

  const matchAll = () => {
    let selectAllData = false;
    if (data.length > 0 && data.length === selectedData.length) {
      selectAllData = true;
    }
    return selectAllData;
  };

  const matchSome = () => {
    let selectSome = false;
    if (selectedData.length > 0 && selectedData.length < data.length) {
      selectSome = true;
    }
    return selectSome;
  };

  return (
      <Table>
        <TableHead>
          <TableRow>
            {checkbox ? (
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={matchAll}
                  indeterminate={matchSome}
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
      </Table>
  );
};

CustomTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  data: PropTypes.array,
  selectedData: PropTypes.array,
  onSelect: PropTypes.func,
};

CustomTable.defaultProps = {
  data: [],
  selectedData: [],
};

export default CustomTable;
