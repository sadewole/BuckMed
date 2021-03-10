import { createSlice } from '@reduxjs/toolkit';
import { server } from 'src/constants';
import jwtDecode from 'jwt-decode';

let buckmed_store = localStorage.getItem('buckmed_store');
let token;
if (buckmed_store) {
  token = JSON.parse(buckmed_store).session;
}

const initialState = {
  user: null,
  token,
  isAuthenticated: false,
  isInitialised: false,
};

const setAccessStorage = (data) => {
  if (data) {
    const buckmed_store = JSON.stringify({
      session: data.token,
    });
    localStorage.setItem('buckmed_store', buckmed_store);
  } else {
    localStorage.removeItem('buckmed_store');
  }
};

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchUser(state, action) {
      const { user, isAuthenticated } = action.payload;
      state.user = user;
      state.isAuthenticated = isAuthenticated;
      state.isInitialised = true;
    },
    signedUser(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.token = token;
    },
    resetAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
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
      setAccessStorage(responseJSON.data);
      dispatch(slice.actions.signedUser(responseJSON.data));
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

    console.log(responseJSON);

    if (responseJSON.success === true) {
      setAccessStorage(responseJSON.data);
      dispatch(slice.actions.signedUser(responseJSON.data));
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
      setAccessStorage(responseJSON.data);
      dispatch(slice.actions.signedUser(responseJSON.data));
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

export const fetchUser = () => (dispatch) => {
  const buckmed_store = localStorage.getItem('buckmed_store');
  if (buckmed_store) {
    const { session } = JSON.parse(buckmed_store);

    if (session && isValidToken(session)) {
      const decoded = jwtDecode(session);
      return dispatch(
        slice.actions.fetchUser({
          user: decoded.user,
          role: decoded.role,
          isAuthenticated: true,
        })
      );
      // fetch(`${server}verify/token`, {
      //   headers: {
      //     Authorization: `Bearer ${session}`,
      //     'Content-Type': 'application/json',
      //   },
      // })
      //   .then((res) => res.json())
      //   .then(({ data }) => {
      //     return dispatch(
      //       slice.actions.fetchUser({
      //         user: data.user,
      //         role: data.role,
      //         isAuthenticated: true,
      //       })
      //     );
      //   })
      //   .catch((err) => err);
    }
    return dispatch(
      slice.actions.fetchUser({
        user: null,
        isAuthenticated: false,
      })
    );
  }
  return dispatch(
    slice.actions.fetchUser({
      user: null,
      isAuthenticated: false,
    })
  );
};
