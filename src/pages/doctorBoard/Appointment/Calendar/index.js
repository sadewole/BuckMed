// import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import Page from 'src/components/Page';
import { Container } from 'react-bootstrap';
import { Paper, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  getEvents,
  updateEvent,
  selectEvent,
  selectRange,
  openModal,
  closeModal,
} from 'src/slices/calendar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  calendar: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    '& .fc-unthemed .fc-head': {
      backgroundColor: theme.palette.background.dark,
    },
    '& .fc-unthemed .fc-body': {
      backgroundColor: theme.palette.background.default,
    },
    '& .fc-unthemed .fc-row': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-axis': {
      ...theme.typography.body2,
    },
    '& .fc-unthemed .fc-divider': {
      backgroundColor: theme.palette.background.dark,
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed th': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed td.fc-today': {
      backgroundColor: theme.palette.background.dark,
    },
    '& .fc-unthemed .fc-highlight': {
      backgroundColor: theme.palette.background.dark,
    },
    '& .fc-unthemed .fc-event': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit',
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit',
      },
    },
    '& .fc-unthemed .fc-day-top': {
      ...theme.typography.body2,
    },
    '& .fc-unthemed .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.dark,
    },
    '& .fc-unthemed .fc-list-view': {
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-list-empty': {
      ...theme.typography.subtitle1,
    },
    '& .fc-unthemed .fc-list-heading td': {
      backgroundColor: theme.palette.background.dark,
      borderColor: theme.palette.divider,
    },
    '& .fc-unthemed .fc-list-heading-main': {
      ...theme.typography.h6,
    },
    '& .fc-unthemed .fc-list-heading-alt': {
      ...theme.typography.h6,
    },
    '& .fc-unthemed .fc-list-item:hover td': {
      backgroundColor: theme.palette.background.dark,
    },
    '& .fc-unthemed .fc-list-item-title': {
      ...theme.typography.body1,
    },
    '& .fc-unthemed .fc-list-item-time': {
      ...theme.typography.body2,
    },
  },
}));

const Calendar = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [date, setDate] = useState(moment().toDate());
  const [view, setView] = useState();
  const calendarRef = useRef(null);
  const classes = useStyles();
  const { events, isModalOpen, selectedRange } = useSelector(
    (state) => state.calendar
  );

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = mobileDevice ? 'listWeek' : 'dayGridMonth';

      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [mobileDevice]);

  return (
    <Page title='Calendar'>
      <Container fluid>
        <Paper className={classes.calendar}>
          <FullCalendar
            allDayMaintainDuration
            defaultDate={date}
            defaultView={view}
            droppable
            editable
            // eventClick={handleEventSelect}
            // eventDrop={handleEventDrop}
            eventLimit
            eventResizableFromStart
            // eventResize={handleEventResize}
            events={events}
            header={false}
            height={800}
            ref={calendarRef}
            rerenderDelay={10}
            // select={handleRangeSelect}
            selectable
            weekends
            plugins={[
              dayGridPlugin,
              listPlugin,
              timeGridPlugin,
              interactionPlugin,
              timelinePlugin,
            ]}
          />
        </Paper>
      </Container>
    </Page>
  );
};

Calendar.propTypes = {};

export default Calendar;
