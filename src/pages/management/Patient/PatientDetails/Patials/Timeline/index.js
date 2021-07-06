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
import { fetchTimelineRecord, deleteTimelineRecord } from 'src/slices/patient';
import { useDispatch, useSelector } from 'src/store';
import { useSnackbar } from 'notistack';

const TimeLine = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { timelineRecord } = useSelector((state) => state.patient);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTimelineRecord(params.patientId));
  }, [dispatch, params.patientId]);

  console.log(timelineRecord);

  const handleDeleteRecord = (id) => {
    dispatch(deleteTimelineRecord(id)).then((res) => {
      if (res.success === true) {
        enqueueSnackbar('Deleted successfully', {
          variant: 'success',
        });
      }
    });
  };

  return (
    <div className='mb-5'>
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
                    <a
                      href={record.document}
                      target='_blank'
                      rel='noopener noreferrer'
                      download
                    >
                      <Button>Download PDF</Button>
                    </a>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => handleDeleteRecord(record.id)}
                    >
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
