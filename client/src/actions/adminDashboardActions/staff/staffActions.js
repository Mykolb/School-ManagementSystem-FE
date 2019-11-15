import axios from 'axios';
export const FETCH_STAFF_START = 'FETCH_STAFF_START';
export const FETCH_STAFF_SUCCESS = 'FETCH_STAFF_SUCCESS';
export const FETCH_STAFF_FAILURE = 'FETCH_STAFF_FAILURE';
export const getStaffTable = (setSavePrevState, newRecord) => dispatch => {
    dispatch({type: FETCH_STAFF_START})
    axios.get('https://speak-out-be-staging.herokuapp.com/api?table=staff')
        .then(res => {
           setSavePrevState(newRecord);
           dispatch({type: FETCH_STAFF_SUCCESS, payload:res.data.tableData})
        }).catch(err=> {
            dispatch({type: FETCH_STAFF_FAILURE, payload: err.payload})
        });
};
export const FETCH_STAFFBYID_START = 'FETCH_STAFFBYID_START';
export const FETCH_STAFFBYID_SUCCESS = 'FETCH_STAFFBYID_SUCCESS';
export const FETCH_STAFFBYID_FAILURE = 'FETCH_STAFFBYID_FAILURE';
export const getStaffById = id => dispatch => {
    dispatch({ type: FETCH_STAFFBYID_START })
    axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=staff&where=id=${id}`)
    .then(res => {
        dispatch({
            type: FETCH_STAFFBYID_SUCCESS,
            payload: res.data.tableData[0]
        })
    })
    .catch(err => {
       dispatch({
        type: FETCH_STAFFBYID_FAILURE,
        payload: err.data
       }) 
    })
}
export const EDIT_STAFFBYID_START = 'EDIT_STAFFBYID_START';
export const EDIT_STAFFBYID_SUCCESS = 'EDIT_STAFFBYID_SUCCESS';
export const EDIT_STAFFBYID_FAILURE = 'EDIT_STAFFBYID_FAILURE';
export const editStaffById = (id, state) => dispatch => {
    axios.put(`https://speak-out-be-staging.herokuapp.com/api/?table=staff&where=id=${id}`, state)
    .then(res => {
      dispatch({
          type: EDIT_STAFFBYID_SUCCESS,
          payload: res.data
      })
    })
    .catch(err => {
       dispatch({
        type: EDIT_STAFFBYID_FAILURE,
        payload: err.data
       }) 
    })
}
export const resetEdited = () => {
  return { type: 'RESET_EDITED'}
}
export const DELETE_STAFFBYID_START = 'DELETE_STAFFBYID_START';
export const DELETE_STAFFBYID_SUCCESS = 'DELETE_STAFFBYID_SUCCESS';
export const DELETE_STAFFBYID_FAILURE = 'DELETE_STAFFBYID_FAILURE';
export const deleteStaffById = id => dispatch => {
    dispatch({ type: DELETE_STAFFBYID_START })
    axios.put(`https://speak-out-be-staging.herokuapp.com/api/?table=staff&where=id=${id}`)
    .then(res => {
      dispatch({
          type: DELETE_STAFFBYID_SUCCESS,
          payload: res.id
      })
    })
    .catch(err => {
       dispatch({
        type: DELETE_STAFFBYID_FAILURE,
        payload: err.data
       }) 
    })
}
export const resetForm = () => {
  return { type: 'RESET_FORM' }
};
export const CREATE_NEW_STAFF_START = 'CREATE_NEW_STAFF_START';
export const CREATE_NEW_STAFF_SUCCESS = 'CREATE_NEW_STAFF_SUCCESS';
export const CREATE_NEW_STAFF_FAILURE = 'CREATE_NEW_STAFF_FAILURE';
export const createNewStaff = (newStaff, setNewRecord, newRecord, displaySuccessMessageTimeout, setSavePrevState) => dispatch => {
  dispatch({ type: CREATE_NEW_STAFF_START })
  axios.post(`https://speak-out-be-staging.herokuapp.com/api/?table=staff`, newStaff)
  .then(res => {
    setSavePrevState(newRecord);
    setNewRecord(!newRecord);
    displaySuccessMessageTimeout();
    dispatch({
        type: CREATE_NEW_STAFF_SUCCESS,
        // payload: res
    })
  })
  .catch(err => {
     dispatch({
      type: CREATE_NEW_STAFF_FAILURE,
      payload: err.data
     }) 
  })
}
export const resetSuccessMessage = () => {
  return { type: 'RESET_SUCCESS_MESSAGE' }
}
export const FETCH_COURSES_BY_STAFF_START = 'FETCH_COURSES_BY_STAFF_START';
export const FETCH_COURSES_BY_STAFF_SUCCESS = 'FETCH_COURSES_BY_STAFF_SUCCESS';
export const FETCH_COURSES_BY_STAFF_FAILURE = 'FETCH_COURSES_BY_STAFF_FAILURE';
export const getCoursesByStaff = (id) => dispatch => {
  dispatch({type: FETCH_COURSES_BY_STAFF_START})
  axios.get(`https://speak-out-be-staging.herokuapp.com/api?table=course_view&where=teacher_id=${id}`)
      .then(res => {
         dispatch({type: FETCH_COURSES_BY_STAFF_SUCCESS, payload:res.data.tableData})
      }).catch(err=> {
          dispatch({type: FETCH_COURSES_BY_STAFF_FAILURE, payload: err.payload})
      });
};





