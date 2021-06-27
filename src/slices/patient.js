import { createSlice } from '@reduxjs/toolkit';
import { server } from 'src/constants';

const initialState = {
  allPatient: [],
  patient: {},
  admissionRecord: [],
  prescriptionRecord: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    patients(state, action) {
      state.allPatient = action.payload;
    },
    patient(state, action) {
      state.patient = action.payload;
    },
    admissionRecord(state, action) {
      state.admissionRecord = [...state.admissionRecord, action.payload];
    },
    fetchAdmissionRecords(state, action) {
      state.admissionRecord = action.payload;
    },
    updateAdmissionRecord(state, action) {
      let payload = action.payload;
      let findIndex = state.admissionRecord.findIndex(
        (record) => record.id === payload.id
      );
      state.admissionRecord = state.admissionRecord.splice(
        findIndex,
        1,
        action.payload
      );
    },
    deleteAdmissionRecord(state, action) {
      state.admissionRecord = state.admissionRecord.filter(
        (record) => record.id !== action.payload
      );
    },
    fetchPrescriptionRecords(state, action) {
      state.prescriptionRecord = action.payload;
    },
    createPatientPrescription(state, action) {
      state.prescriptionRecord = [...state.prescriptionRecord, action.payload];
    },
    updatePrescriptionRecord(state, action) {
      let payload = action.payload;
      let findIndex = state.prescriptionRecord.findIndex(
        (record) => record.id === payload.id
      );
      state.prescriptionRecord = state.prescriptionRecord.splice(
        findIndex,
        1,
        action.payload
      );
    },
  },
});

export const reducer = slice.reducer;

export const fetchAllPatient = () => (dispatch, getState) => {
  fetch(`${server}patient/all`, {
    headers: {
      Authorization: `Bearer ${getState().auth.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(({ data }) => {
      dispatch(slice.actions.patients(data));
    })
    .catch((err) => err);
};

export const fetchPatient = (id) => (dispatch, getState) => {
  fetch(`${server}patient/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${getState().auth.token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(({ data }) => {
      dispatch(slice.actions.patient(data));
    })
    .catch((err) => err);
};

/** start ==> Admission record  */
export const createPatientAdmission = (data) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${server}patient/admit`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    if (responseJSON.success === true) {
      dispatch(slice.actions.admissionRecord(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

export const fetchPatientAdmissionRecords =
  (id) => async (dispatch, getState) => {
    try {
      const response = await fetch(`${server}patient/admit/${id}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseJSON = await response.json();

      if (responseJSON.success === true) {
        dispatch(slice.actions.fetchAdmissionRecords(responseJSON.data));
      } else {
        throw new Error(responseJSON.message);
      }

      return responseJSON;
    } catch (err) {
      return err;
    }
  };

export const updatePatientAdmissionRecord =
  (id, data) => async (dispatch, getState) => {
    try {
      const response = await fetch(`${server}patient/admit/${id}/update`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseJSON = await response.json();

      if (responseJSON.success === true) {
        dispatch(slice.actions.updateAdmissionRecord(responseJSON.data));
      } else {
        throw new Error(responseJSON.message);
      }

      return responseJSON;
    } catch (err) {
      return err;
    }
  };

export const deletePatientAdmissionRecord =
  (id) => async (dispatch, getState) => {
    try {
      const response = await fetch(`${server}patient/admit/${id}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseJSON = await response.json();

      if (responseJSON.success === true) {
        dispatch(slice.actions.deleteAdmissionRecord(id));
      } else {
        throw new Error(responseJSON.message);
      }

      return responseJSON;
    } catch (err) {
      return err;
    }
  };

/** end ==> Admission record  */

/** start ==> prescription record  */
export const createPatientPrescription =
  (data) => async (dispatch, getState) => {
    try {
      const response = await fetch(`${server}employee/prescription/create`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseJSON = await response.json();

      if (responseJSON.success === true) {
        dispatch(slice.actions.createPatientPrescription(responseJSON.data));
      } else {
        throw new Error(responseJSON.message);
      }

      return responseJSON;
    } catch (err) {
      return err;
    }
  };

export const fetchPatientPrescriptionRecords =
  (patientId) => async (dispatch, getState) => {
    try {
      console.log(patientId);
      const response = await fetch(
        `${server}employee/prescription/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const responseJSON = await response.json();

      if (responseJSON.success === true) {
        dispatch(slice.actions.fetchPrescriptionRecords(responseJSON.data));
      } else {
        throw new Error(responseJSON.message);
      }

      return responseJSON;
    } catch (err) {
      return err;
    }
  };

export const updatePatientPrescriptionRecord =
  (id, data) => async (dispatch, getState) => {
    try {
      const response = await fetch(
        `${server}employee/prescription/update/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const responseJSON = await response.json();

      if (responseJSON.success === true) {
        dispatch(slice.actions.updatePrescriptionRecord(responseJSON.data));
      } else {
        throw new Error(responseJSON.message);
      }

      return responseJSON;
    } catch (err) {
      return err;
    }
  };

/** end ==> Admission record  */
