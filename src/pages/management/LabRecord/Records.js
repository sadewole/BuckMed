import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, FormControl, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Tabs, Tab, Paper, TableRow, TableCell } from '@material-ui/core';
import moment from 'moment';
import {
  Search as SearchIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from 'react-feather';
import Table from 'src/components/CustomTable';
import { fetchLabRecords } from 'src/slices/patient';
import { useDispatch, useSelector } from 'src/store';


const Records = ({ className, records }) => {
    const dispatch = useDispatch();
    const { patientId } = useParams();
    const { labRecord } = useSelector((state) => state.patient);

    useEffect(() => {
      dispatch(fetchLabRecords(patientId));
    }, [dispatch, patientId]);

    console.log(labRecord, patientId);
    return (
        <div>Record List</div>
    )
}

Records.propTypes = {
  className: PropTypes.string,
  records: PropTypes.array.isRequired,
};

Records.defaultProps = {
  records: [],
};

export default Records;
