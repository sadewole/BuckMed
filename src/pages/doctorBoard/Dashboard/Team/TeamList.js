import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
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
        <ul class='users-list clearfix'>
          <li>
            <img src='dist/img/user1-128x128.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              Alexander Pierce
            </a>
            <span class='users-list-date'>Today</span>
          </li>
          <li>
            <img src='dist/img/user8-128x128.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              Norman
            </a>
            <span class='users-list-date'>Yesterday</span>
          </li>
          <li>
            <img src='dist/img/user7-128x128.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              Jane
            </a>
            <span class='users-list-date'>12 Jan</span>
          </li>
          <li>
            <img src='dist/img/user6-128x128.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              John
            </a>
            <span class='users-list-date'>12 Jan</span>
          </li>
          <li>
            <img src='dist/img/user2-160x160.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              Alexander
            </a>
            <span class='users-list-date'>13 Jan</span>
          </li>
          <li>
            <img src='dist/img/user5-128x128.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              Sarah
            </a>
            <span class='users-list-date'>14 Jan</span>
          </li>
          <li>
            <img src='dist/img/user4-128x128.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              Nora
            </a>
            <span class='users-list-date'>15 Jan</span>
          </li>
          <li>
            <img src='dist/img/user3-128x128.jpg' alt='User Image' />
            <a class='users-list-name' href='#'>
              Nadia
            </a>
            <span class='users-list-date'>15 Jan</span>
          </li>
        </ul>
      </Card.Body>
      <Card.Footer class='card-footer text-center'>
        <a href='javascript::'>View All Users</a>
      </Card.Footer>
    </Card>
  );
};

TeamList.propTypes = {};

export default TeamList;
