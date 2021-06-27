import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';

const Header = ({ show, setShow, setAction, setSelectedContent }) => {
  const handleNew = () => {
    setShow(!show);
    setSelectedContent();
    setAction('Create');
  };

  return (
    <Fragment>
      <Row className='justify-content-between m-3'>
        <Row>
          <h3 className='text-primary'>Patient Admission</h3>
        </Row>
        <Row>
          <Button variant='primary' onClick={handleNew}>
            <InlineIcon icon={plusCircle} className='mr-1' />
            New
          </Button>
        </Row>
      </Row>
    </Fragment>
  );
};

export default Header;
