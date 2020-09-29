import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TableCell = ({ children, padding }) => {
  return padding === 'checkbox' ? (
    <Cell style={{ width: '25px' }}>{children}</Cell>
  ) : (
    <Cell>{children}</Cell>
  );
};

const Cell = styled.div`
  display: table-cell;
  padding: 10px 10px;
  vertical-align: middle;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.85;
  letter-spacing: 0.09px;
  // color: #495057;
  background-clip: padding-box;
  // border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

TableCell.propTypes = {};

export default TableCell;
