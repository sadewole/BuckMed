import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableBody = ({ children, fontWeight }) => {
  return <Body style={{ fontWeight }}>{children}</Body>;
};

const Body = styled.div`
  display: table-row-group;
  box-shadow: 0 15px 40px 0 rgba(39, 59, 110, 0.1);
`;

TableBody.propTypes = {};

export default TableBody;
