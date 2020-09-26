import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HorizontalScrollbar = ({ children }) => {
  return <Scrollbar>{children}</Scrollbar>;
};

const Scrollbar = styled.div`
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    outline: 1px solid slategrey;
    background-color: darkgray;
  }
`;

HorizontalScrollbar.propTypes = {
  children: PropTypes.node,
};

export default HorizontalScrollbar;
