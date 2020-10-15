import React from 'react';
import PropTypes from 'prop-types';
import { colors, Card, makeStyles } from '@material-ui/core';
import { Button, Row, Col } from 'react-bootstrap';
import { Icon, InlineIcon } from '@iconify/react';
import GemIcon from '@iconify/icons-fa-solid/gem';
import DollarIcon from '@iconify/icons-fa-solid/dollar-sign';
import CoinsIcon from '@iconify/icons-fa-solid/coins';
import PlusCircleIcon from '@iconify/icons-fa-solid/plus-circle';
import { currencyFormatter } from 'src/utils/formatter';

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
    background: colors.red['600'],
  },
  currency: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: 400,
  },
});

const Header = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Row>
        <Col item md={8} xs={8}>
          <Card
            color='primary'
            className={`d-flex justify-content-between info-box text-white ${classes.color1}`}
          >
            <span className='info-box-icon'>
              <Icon icon={GemIcon} />
            </span>
            <div className='flex-grow-1'>
              <span className={`d-block ${classes.bText}`}>Total Balance</span>
              <span className={classes.currency}>
                {currencyFormatter(56000)}
              </span>
            </div>
          </Card>
          <div className='d-flex'>
            <Card
              color='primary'
              className={`d-flex justify-content-between info-box text-white mr-1 ${classes.color2}`}
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
          </div>
        </Col>
        <Col item md={4} xs={4} className='text-right'>
          <Button variant='outline-secondary'>
            <InlineIcon icon={PlusCircleIcon} className='mr-1' />
            Add Transaction
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Header.propTypes = {};

export default Header;
