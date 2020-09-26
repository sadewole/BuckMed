import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Avatar from 'src/components/Avatar';
import PropTypes from 'prop-types';

const TeamList = (props) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Latest Team</Card.Title>
        <div class='card-tools d-flex mr-auto'>
          <span class='badge badge-danger'>8 New Members</span>
          <button type='button' class='btn btn-tool' data-card-widget='remove'>
            <i class='fas fa-times'></i>
          </button>
        </div>
      </Card.Header>
      <Card.Body class='p-0'>
        <ListGroup class='users-list clearfix'>
          <ListGroupItem>
            <Avatar />
            <img src='dist/img/user1-128x128.jpg' alt='User Image' />
            <h5 className='text-primary'>Alexander Pierce</h5>
            <span class='users-list-date'>Today</span>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
      <Card.Footer class='card-footer text-center'>
        <Link to='javascript::'>View All Users</Link>
      </Card.Footer>
    </Card>
  );
};

TeamList.propTypes = {};

export default TeamList;
