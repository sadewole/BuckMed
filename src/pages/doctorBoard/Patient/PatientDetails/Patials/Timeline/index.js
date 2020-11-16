import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Typography, List, ListItem } from '@material-ui/core';
import { Icon } from '@iconify/react';
import FilterIcon from '@iconify/icons-fa-solid/filter';

const TimeLine = () => {
  return (
    <div>
      <div className='w-100 d-flex align-items-center justify-content-between'>
        <h2>Medical History</h2>

        <Button variant='outline-primary'>
          <Icon icon={FilterIcon} /> Filter
        </Button>
      </div>
      <Card border='light'>
        <Row>
          <Col md='2'>10-Nov-2039</Col>
          <Col md='10'>
            <List>
              <ListItem divider>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae, molestias in voluptates incidunt numquam quis. Cumque
                  sit dicta natus vitae.
                </Typography>
              </ListItem>
              <ListItem divider>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae, molestias in voluptates incidunt numquam quis. Cumque
                  sit dicta natus vitae.
                </Typography>
              </ListItem>
            </List>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TimeLine;
