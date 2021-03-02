import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';

const Header = ({ className, ...rest }) => {
  return (
    <Row className='justify-content-between m-3' {...rest}>
      <Row>
        <h3 className='text-primary'> All Doctors</h3>
      </Row>
      <Row>
        <Button variant='primary'>
          <InlineIcon icon={plusCircle} className='mr-1' />
          New Doctor
        </Button>
      </Row>
    </Row>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;