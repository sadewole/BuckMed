import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableHead = ({ children, fontWeight }) => {
  return <TableHeader style={{ fontWeight }}>{children}</TableHeader>;
};

const TableHeader = styled.div`
  display: table-header-group;
  color: #000;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.09px;
  //   color: #bcbec0;
  text-transform: uppercase;
`;

TableHead.propTypes = {};

export default TableHead;
