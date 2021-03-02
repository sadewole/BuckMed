import { combineReducers } from '@reduxjs/toolkit';
import { defaults } from 'chart.js';
import { reducer as calendarReducer } from 'src/slices/calendar';
import { reducer as authReducer } from 'src/slices/auth';

export default combineReducers({
  calendar: calendarReducer,
  auth: authReducer,
});
