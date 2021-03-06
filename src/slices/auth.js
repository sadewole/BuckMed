import { createSlice } from '@reduxjs/toolkit';
import { server } from 'src/constants';
import moment from 'moment';

const initialState = {
  user: null,
};

const setUserStorage = (data) => {
  if (data) {
    let session_expiry = moment().add(1, 'days').valueOf();
    const buckmed_store = JSON.stringify({
      session: data.token,
      session_expiry,
    });
    localStorage.setItem('buckmed_store', buckmed_store);
  } else {
    localStorage.removeItem('buckmed_store');
  }
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    user(state, action) {
      state.user = action.payload;
    },
  },
});

export const reducer = slice.reducer;

export const patientLogin = (data) => async (dispatch) => {
  try {
    const response = await fetch(`${server}auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    console.log(responseJSON);

    if (responseJSON.success === true) {
      setUserStorage(data);
      dispatch(slice.actions.user(data.user));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

export const staffLogin = (data) => async (dispatch) => {
  try {
    const response = await fetch(`${server}employee/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    if (responseJSON.success === true) {
      setUserStorage(data);
      dispatch(slice.actions.user(data.user));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

export const patientRegister = (data) => async (dispatch) => {
  try {
    const response = await fetch(`${server}auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    if (responseJSON.success === true) {
      setUserStorage(data);
      dispatch(slice.actions.user(data.user));
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};
