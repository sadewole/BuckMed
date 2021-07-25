import { createSlice } from '@reduxjs/toolkit';
import { server } from 'src/constants';

const initialState = {
  allPatient: [],
  patient: {},
  admissionRecord: [],
  prescriptionRecord: [],
  timelineRecord: [],
  labRecord: [],
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
      state.admissionRecord.splice(findIndex, 1, payload);
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
      let payload = action.payload[0];

      let findIndex = state.prescriptionRecord.findIndex(
        (record) => record.id === payload.id
      );
      state.prescriptionRecord.splice(findIndex, 1, payload);
    },
    fetchTimelineRecord(state, action) {
      state.timelineRecord = action.payload;
    },
    createTimelineRecord(state, action) {
      state.timelineRecord = [...state.timelineRecord, action.payload];
    },
    deleteTimelineRecord(state, action) {
      state.timelineRecord = state.timelineRecord.filter(
        (record) => record.id !== action.payload
      );
    },
    createLabRecord(state, action) {
      state.labRecord = [ ...state.labRecord, action.payload];
    },
    fetchLabRecords(state, action) {
      state.labRecord = action.payload;
    },
    updateLabRecord(state, action){
      let payload = action.payload;
      let findIndex = state.labRecord.findIndex(
        (record) => record.id === payload.id
      );
      state.labRecord.splice(findIndex, 1, payload);
    },
    fetchSingleRecord(state, action) {
      state.labRecord = action.payload
    }
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

// Timeline

export const createTimelineRecord = (data) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${server}employee/timeline/create`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const responseJSON = await response.json();
    if (responseJSON.success === true) {
      dispatch(slice.actions.createTimelineRecord(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

export const fetchTimelineRecord = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${server}employee/timeline/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();
    if (responseJSON.success === true) {
      dispatch(slice.actions.fetchTimelineRecord(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

export const deleteTimelineRecord = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${server}employee/timeline/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();
    if (responseJSON.success === true) {
      dispatch(slice.actions.deleteTimelineRecord(id));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

/** start ==> Lab record */ 

export const createLabRecord = (data) => async(dispatch, getState) => {
  try {
    const response = await fetch(`${server}lab/report/create`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();

    if (responseJSON.success === true) {
      dispatch(slice.actions.labRecord(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
};

export const updateLabRecord = (reportId, data) => async(dispatch, getState) => {
  try {
    const response = await fetch(
      `${server}lab/report/edit/${reportId}`,
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
      dispatch(slice.actions.updateLabRecord(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
}

export const fetchLabRecords = (patientId) => async(dispatch, getState) => {
  try {
    const response = await fetch(`${server}lab/report/${patientId}/all`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();
    if (responseJSON.success === true) {
      dispatch(slice.actions.fetchLabRecords(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
}

export const fetchSingleLabRecord = (reportId) => async(dispatch, getState) => {
  try {
    const response = await fetch(`${server}lab/report/${reportId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
        'Content-Type': 'application/json',
      },
    });

    const responseJSON = await response.json();
    if (responseJSON.success === true) {
      dispatch(slice.actions.fetchLabRecords(responseJSON.data));
    } else {
      throw new Error(responseJSON.message);
    }

    return responseJSON;
  } catch (err) {
    return err;
  }
}

/* end ==> Lab record */