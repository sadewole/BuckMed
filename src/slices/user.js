import { createSlice } from '@reduxjs/toolkit';
import { server } from 'src/constants';

const initialState = {
  allEmployee: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    employee(state, action) {
      state.allEmployee = action.payload;
    },
    addEmployee(state, action) {
      state.allEmployee = [...state.allEmployee, action.payload];
    },
  },
});

export const reducer = slice.reducer;

export const fetchEmployee = () => (dispatch, getState) => {
  fetch(`${server}employee/all`, {
    headers: {
      Authorization: `Bearer ${getState().auth.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(({ data }) => {
      console.log(data);
      dispatch(slice.actions.employee(data));
    })
    .catch((err) => err);
};

export const createEmployee = (data) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${server}employee/admin/create`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    console.log(responseJSON);

    if (responseJSON.success === true) {
      dispatch(slice.actions.addEmployee(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};
