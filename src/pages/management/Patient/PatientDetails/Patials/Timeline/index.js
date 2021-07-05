import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Button } from 'react-bootstrap';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import AddTimeline from './AddTimeline';
import { fetchTimelineRecord } from 'src/slices/patient';
import { useDispatch, useSelector } from 'src/store';

const TimeLine = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { timelineRecord } = useSelector((state) => state.patient);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTimelineRecord(params.patientId));
  }, [dispatch, params.patientId]);

  console.log(timelineRecord);

  return (
    <div>
      <div className='w-100 d-flex align-items-center justify-content-between mb-3'>
        <h2>Medical Timelines</h2>

        <Button onClick={() => setOpenModal(!openModal)}>Add Timeline</Button>
      </div>
      <Card border='light'>
        <Card.Body>
          {timelineRecord.length ? (
            timelineRecord.map((record) => (
              <List className='border mb-4' key={record.id}>
                <ListItem divider>
                  <ListItemText primary={record.title} />
                  <ListItemSecondaryAction>
                    <Button>Download PDF</Button>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae, molestias in voluptates incidunt numquam quis. Cumque
                    sit dicta natus vitae.
                  </Typography>
                </ListItem>
              </List>
            ))
          ) : (
            <div>
              <p>No timeline record</p>
            </div>
          )}
        </Card.Body>
      </Card>
      <AddTimeline openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default TimeLine;
