import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import Page from 'src/components/Page';
import Header from './Header'
import { Container } from 'react-bootstrap';

const Calendar = (props) => {
    const [date, setDate] = useState(moment().toDate())
  return <Page title='Calendar'>
  <Container fluid>
  <Header />
  </Container>
  </Page>;
};

Calendar.propTypes = {};

export default Calendar;
