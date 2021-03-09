import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import CreateDoctor from '../Partials/CreateEmployee';

const Header = ({ className, ...rest }) => {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <Row className='justify-content-between m-3' {...rest}>
        <Row>
          <h3 className='text-primary'> All Employees</h3>
        </Row>
        <Row>
          <Button variant='primary' onClick={() => setShow(!show)}>
            <InlineIcon icon={plusCircle} className='mr-1' />
            New Employee
          </Button>
        </Row>
      </Row>
      <CreateDoctor show={show} setShow={setShow} />
    </Fragment>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
