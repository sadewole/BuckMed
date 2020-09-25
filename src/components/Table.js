import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = ({
  children,
  hovered,
  responsive,
  bordered = false,
  light = false,
  dark = false,
}) => {
  return (
    <div>
      <TableContainer className={`${bordered && 'table-bordered'}`}>
        {children}
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

Table.propTypes = {};

export default Table;
