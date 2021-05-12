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
  role: null,
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
      const { user, role, isAuthenticated } = action.payload;
      state.user = user;
      state.role = role;
      state.isAuthenticated = isAuthenticated;
      state.isInitialised = true;
    },
    signedUser(state, action) {
      const { user, token, role } = action.payload;
      state.user = user;
      state.role = role;
      state.isAuthenticated = true;
      state.token = token;
    },
    resetAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
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

export const fetchUser = () => async (dispatch) => {
  const buckmed_store = localStorage.getItem('buckmed_store');
  try {
    if (buckmed_store) {
      const { session } = JSON.parse(buckmed_store);

      if (session && isValidToken(session)) {
        const response = await fetch(`${server}verify/token`, {
          headers: {
            Authorization: `Bearer ${session}`,
            'Content-Type': 'application/json',
          },
        });

        const { data } = await response.json();

        return dispatch(
          slice.actions.fetchUser({
            user: data.user,
            role: data.role,
            isAuthenticated: true,
          })
        );
      }
      return dispatch(
        slice.actions.fetchUser({
          user: null,
          isAuthenticated: false,
        })
      );
    }
  } catch (err) {
    return dispatch(
      slice.actions.fetchUser({
        user: null,
        isAuthenticated: false,
      })
    );
  }
};
