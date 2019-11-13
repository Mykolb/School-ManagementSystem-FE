import axios from 'axios';

export const FETCH_COURSES_START = 'FETCH_COURSES_START';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';

export const getCourseTable = () => dispatch => {
    dispatch({type: FETCH_COURSES_START})
    axios.get('https://speak-out-be-staging.herokuapp.com/api?table=course_view')
        .then(res => {
           dispatch({type: FETCH_COURSES_SUCCESS, payload:res.data.tableData})
        }).catch(err=> {
            dispatch({type: FETCH_COURSES_FAILURE, payload: err.payload})
        });
};

export const FETCH_COURSEBYID_START = 'FETCH_COURSEBYID_START';
export const FETCH_COURSEBYID_SUCCESS = 'FETCH_COURSEBYID_SUCCESS';
export const FETCH_COURSEBYID_FAILURE = 'FETCH_COURSEBYID_FAILURE';

export const getCourseById = id => dispatch => {
    dispatch({ type: FETCH_COURSEBYID_START })
    axios.get(`https://speak-out-be-staging.herokuapp.com/api?table=course&where=id=${id}`)
    .then(res => {
      console.log('RESPONSE COURSE BY ID:', res.data)
        dispatch({
            type: FETCH_COURSEBYID_SUCCESS,
            payload: res.data.tableData[0]
        })
    })
    .catch(err => {
       dispatch({
        type: FETCH_COURSEBYID_FAILURE,
        payload: err.data
       }) 
    })
}


// export const EDIT_COURSEBYID_START = 'EDIT_COURSEBYID_START';
// export const EDIT_COURSEBYID_SUCCESS = 'EDIT_COURSEBYID_SUCCESS';
// export const EDIT_COURSEBYID_FAILURE = 'EDIT_COURSEBYID_FAILURE';

// // export const toggleEditCourse = () => dispatch => {
// //     dispatch({ type: EDIT_COURSEBYID_START })
// // }

// export const editCouseById = (id, state) => dispatch => {
//     let obj1 = {id:id, block_code:"431", delinquent:true} //will fix later 
//     let state1 = {...state, ...obj1 }
//     axios.put(`https://speak-out-be-staging.herokuapp.com/api?table=course_view&where=id=${id}`, state1)
//     .then(res => {
//         dispatch({
//             type: EDIT_COURSEBYID_SUCCESS,
//             payload: res.data
//         })
//     })
//     .catch(err => {
//        dispatch({
//         type: EDIT_COURSEBYID_FAILURE,
//         payload: err.data
//        }) 
//     })
// }

export const EDIT_COURSEBYID_START = 'EDIT_COURSEBYID_START';
export const EDIT_COURSEBYID_SUCCESS = 'EDIT_COURSEBYID_SUCCESS';
export const EDIT_COURSEBYID_FAILURE = 'EDIT_COURSEBYID_FAILURE';



export const editCourseById = (id, state) => dispatch => {
    axios.put(`https://speak-out-be-staging.herokuapp.com/api/?table=course&where=id=${id}`, state)
    .then(res => {
      dispatch({
          type: EDIT_COURSEBYID_SUCCESS,
          payload: res.data
      })
    })
    .catch(err => {
       dispatch({
        type: EDIT_COURSEBYID_FAILURE,
        payload: err.data
       }) 
    })
}

// export const FETCH_COURSES_BY_STUDENT_START = 'FETCH_COURSES_BY_STUDENT_START';
// export const FETCH_COURSES_BY_STUDENT_SUCCESS = 'FETCH_COURSES_BY_STUDENT_SUCCESS';
// export const FETCH_COURSES_BY_STUDENT_FAILURE = 'FETCH_COURSES_BY_STUDENT_FAILURE';

// export const getCoursesByStudent = (id) => dispatch => {
//   dispatch({type: FETCH_COURSES_BY_STUDENT_START})
//   axios.get(`https://speak-out-be-staging.herokuapp.com/api?table=course_result_view&where=student_id=${id}`)
//       .then(res => {
//          dispatch({type: FETCH_COURSES_BY_STUDENT_SUCCESS, payload:res.data.tableData})
//       }).catch(err=> {
//           dispatch({type: FETCH_COURSES_BY_STUDENT_FAILURE, payload: err.payload})
//       });
// };


// foreign key tables

export const GET_TERM_TABLE_SUCCESS = 'GET_TERM_TABLE_SUCCESS';
export const GET_COURSE_TYPE_TABLE_SUCCESS = 'GET_COURSE_TYPE_TABLE_SUCCESS';
export const GET_GROUP_TYPE_TABLE_SUCCESS = 'GET_GROUP_TYPE_TABLE_SUCCESS';
export const GET_SCHOOL_GRADE_TABLE_SUCCESS = 'GET_SCHOOL_GRADE_TABLE_SUCCESS';
export const GET_LEVEL_TABLE_SUCCESS = 'GET_LEVEL_TABLE_SUCCESS';
export const GET_COURSE_SCHEDULE_TABLE_SUCCESS = 'GET_COURSE_SCHEDULE_TABLE_SUCCESS';
export const GET_ROOM_TABLE_SUCCESS = 'GET_ROOM_TABLE_SUCCESS';
export const GET_TEACHER_TABLE_SUCCESS = 'GET_TEACHER_TABLE_SUCCESS';

export const getTermTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=term`)
  .then(res => {
    dispatch({
        type: GET_TERM_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
 })
}

export const getCourseTypeTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=course_type`)
  .then(res => {
    dispatch({
        type: GET_COURSE_TYPE_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
  })
}

export const getGroupTypeTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=group_type`)
  .then(res => {
    dispatch({
        type: GET_GROUP_TYPE_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
  })
}

export const getSchoolGradeTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=school_grade`)
  .then(res => {
    dispatch({
        type: GET_SCHOOL_GRADE_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
  })
}

export const getLevelTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=level`)
  .then(res => {
    dispatch({
        type: GET_LEVEL_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
  })
}

export const getCourseScheduleTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=course_schedule`)
  .then(res => {
    dispatch({
        type: GET_COURSE_SCHEDULE_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
  })
}

export const getRoomTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=room`)
  .then(res => {
    dispatch({
        type: GET_ROOM_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
  })
}

export const getTeacherTable = () => dispatch => {
  axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=staff`)
  .then(res => {
    dispatch({
        type: GET_TEACHER_TABLE_SUCCESS,
        payload: res.data.tableData
    })
  })
  .catch(err => {
    //TODO: if it catches 401 unauthorized it means the session has expired so push to login here
  })
}


//helper methods

export const resetEdited = () => {
  return { type: 'RESET_EDITED'}
}

export const resetForm = () => {
  return { type: 'RESET_FORM' }
};

export const resetSuccessMessage = () => {
  return { type: 'RESET_SUCCESS_MESSAGE' }
}

// create new entry

export const CREATE_NEW_COURSE_START = 'CREATE_NEW_COURSE_START';
export const CREATE_NEW_COURSE_SUCCESS = 'CREATE_NEW_COURSE_SUCCESS';
export const CREATE_NEW_COURSE_FAILURE = 'CREATE_NEW_COURSE_FAILURE';

export const createNewCourse = (newCourse, setNewRecord, newRecord, displaySuccessMessageTimeout, setSavePrevState) => dispatch => {
  dispatch({ type: CREATE_NEW_COURSE_START })
  axios.post(`https://speak-out-be-staging.herokuapp.com/api/?table=course`, newCourse)
  .then(res => {
    setSavePrevState(newRecord);
    setNewRecord(!newRecord);
    displaySuccessMessageTimeout();
    dispatch({
        type: CREATE_NEW_COURSE_SUCCESS,
        // payload: res
    })
  })
  .catch(err => {
     dispatch({
      type: CREATE_NEW_COURSE_FAILURE,
      payload: err.data
     }) 
  })
}


