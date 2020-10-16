import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { colors, Card, makeStyles } from '@material-ui/core';
import { Button, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import { Icon, InlineIcon } from '@iconify/react';
import GemIcon from '@iconify/icons-fa-solid/gem';
import DollarIcon from '@iconify/icons-fa-solid/dollar-sign';
import CoinsIcon from '@iconify/icons-fa-solid/coins';
import PlusCircleIcon from '@iconify/icons-fa-solid/plus-circle';
import { currencyFormatter } from 'src/utils/formatter';
import { AddReceiptModal } from '../Modals/AddReceiptModal';

const useStyles = makeStyles({
  root: {},
  bText: {
    fontSize: '1.3rem',
  },
  color1: {
    background: colors.cyan['600'],
  },
  color2: {
    background: colors.common.white['600'],
    color: '#000 !important',
  },
  color3: {
    background: colors.green['600'],
  },
  currency: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: 400,
  },
  popover: {
    transition: 'all 0.5s ease-in',
    borderRadius: 10,

    '&:hover > .btn': {
      width: '100%',
      background: '#17a2b8',
      color: '#fff !important',
    },
  },
});

const Header = (props) => {
  const classes = useStyles();
  const [receiptModal, setReceiptModal] = useState(false);

  const handleReceiptModal = () => setReceiptModal(true);

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Content>
        <ul className='list-group'>
          <li className={`list-item ${classes.popover}`}>
            <Link className='btn' onClick={handleReceiptModal}>
              Add Receipt
            </Link>
          </li>
          <li className={`list-item ${classes.popover}`}>
            <Link className='btn '>Add Invoice</Link>
          </li>
          <li className={`list-item ${classes.popover}`}>
            <Link className='btn'>Add Payment</Link>
          </li>
        </ul>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className={classes.root}>
      <Row>
        <Col md={12} xs={8}>
          <Row>
            <Col lg='4' md='12'>
              <Card
                color='primary'
                className={`d-flex justify-content-between info-box text-white ${classes.color1}`}
              >
                <span className='info-box-icon'>
                  <Icon icon={GemIcon} />
                </span>
                <div className='flex-grow-1'>
                  <span className={`d-block ${classes.bText}`}>
                    Total Balance
                  </span>
                  <span className={classes.currency}>
                    {currencyFormatter(56000)}
                  </span>
                </div>
              </Card>
            </Col>
            <Col lg='4' md='6'>
              <Card
                color='primary'
                className={`d-flex justify-content-between info-box text-white mr-2 ${classes.color2}`}
              >
                <span className='info-box-icon'>
                  <Icon icon={CoinsIcon} />
                </span>
                <div className='flex-grow-1'>
                  <span className={`d-block ${classes.bText}`}>Debit</span>
                  <span className={classes.currency}>
                    {currencyFormatter(5000)}
                  </span>
                </div>
              </Card>
            </Col>
            <Col lg='4' md='6'>
              {' '}
              <Card
                color='primary'
                className={`d-flex justify-content-between info-box text-white ${classes.color3}`}
              >
                <span className='info-box-icon'>
                  <Icon icon={DollarIcon} />
                </span>
                <div className='flex-grow-1'>
                  <span className={`d-block ${classes.bText}`}>Credit</span>
                  <span className={classes.currency}>
                    {currencyFormatter(6000)}
                  </span>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4} xs={4} className='text-'>
          <OverlayTrigger trigger='click' placement='left' overlay={popover}>
            <Button variant='outline-secondary'>
              <InlineIcon icon={PlusCircleIcon} className='mr-1' />
              Add Transaction
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>

      {/** Modals */}
      <AddReceiptModal
        showModal={receiptModal}
        setShowModal={setReceiptModal}
      />
    </div>
  );
};

Header.propTypes = {};

export default Header;
