import { defaults } from 'chart.js';
import { combineReducers } from 'redux';
import { reducer as calendarReducer } from 'src/slices/calendar';

export default combineReducers({
  calendar: calendarReducer,
});
