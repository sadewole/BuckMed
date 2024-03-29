import { combineReducers } from '@reduxjs/toolkit';
import { defaults } from 'chart.js';
import { reducer as calendarReducer } from 'src/slices/calendar';
import { reducer as authReducer } from 'src/slices/auth';
import { reducer as userReducer } from 'src/slices/user';
import { reducer as patientReducer } from 'src/slices/patient';

export default combineReducers({
  calendar: calendarReducer,
  auth: authReducer,
  user: userReducer,
  patient: patientReducer,
});
