import React, { useState } from 'react';
import styled from 'styled-components';

const TableRow = ({ children, selected = false, hovered = false }) => {
  const [hover, setHover] = useState();
  return (
    <Row
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={hover ? 'hover' : undefined}
    >
      {children}
    </Row>
  );
};

const Row = styled.div`
  display: table-row;
  border-bottom: 1px solid #eaeaea;

  &.hover {
    background-color: #ececf6;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default TableRow;
