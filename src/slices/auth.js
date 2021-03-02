import { createSlice } from '@reduxjs/toolkit';
// import axios from 'src/utils/axios';
import axios from 'axios';
import { isError } from 'lodash';

const initialState = {
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    patientLogin(state, action) {
      state.user = action.payload;
    },
  },
});

export const reducer = slice.reducer;

export const patientLogin = (data) => async (dispatch) => {
  try {
    const response = await axios.post('login', data);

    console.log(response.data);
    dispatch('patientLogin', response.data);
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

export const patientRegister = (data) => (dispatch) => {
  console.log(data);
  //   try {
  //     const body = JSON.stringify(data);
  //     // const response = await axios.post(
  //     //   'https://hospital-manage-project.herokuapp.com/api/patient/auth/signup/',
  //     //   body
  //     // );
  //     console.log('got here');
  //     console.log(response);
  //     // dispatch('patientRegister', response.data);
  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //     return err;
  //   }

  fetch(
    'https://hospital-manage-project.herokuapp.com/api/patient/auth/signup/',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
