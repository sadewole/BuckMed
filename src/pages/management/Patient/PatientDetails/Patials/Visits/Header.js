import React, { useState, Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import NewAdmission from './Partials/NewAdmission';

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <Row className='justify-content-between m-3'>
        <Row>
          <h3 className='text-primary'>Patient Admission</h3>
        </Row>
        <Row>
          <Button variant='primary' onClick={() => setShow(!show)}>
            <InlineIcon icon={plusCircle} className='mr-1' />
            New
          </Button>
        </Row>
      </Row>
      <NewAdmission show={show} setShow={setShow} />
    </Fragment>
  );
};

export default Header;
