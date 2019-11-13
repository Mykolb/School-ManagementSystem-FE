import {
  FETCH_STUDENTS_START,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENTBYID_START,
  FETCH_STUDENTBYID_SUCCESS,
  FETCH_STUDENTBYID_FAILURE,
  EDIT_STUDENTBYID_START,
  EDIT_STUDENTBYID_SUCCESS,
  EDIT_STUDENTBYID_FAILURE,
  DELETE_STUDENTBYID_START,
  DELETE_STUDENTBYID_SUCCESS,
  DELETE_STUDENTBYID_FAILURE,
  CREATE_NEW_STUDENT_START,
  CREATE_NEW_STUDENT_SUCCESS,
  CREATE_NEW_STUDENT_FAILURE,
  FETCH_COURSES_BY_STUDENT_START,
  FETCH_COURSES_BY_STUDENT_SUCCESS,
  FETCH_COURSES_BY_STUDENT_FAILURE,

} from '../../../actions/adminDashboardActions/students/studentsActions';

const initialState = {
    listIsLoading: false,
    listError: null,
    studentList: [],
    studentById: [],
    cardIsLoading: false,
    cardFetching: false,
    cardError: null,
    cardIsEditting: false,
    cardIsEditted: false,

    searchResults: [], //once search functionality is added, back button should go back to search resutls if there any
                       // and then back to student list, unless there can also be display all option right there
    locationList: [], // create a list of names from location table to use for the dropdown on the form
    locationIdLookup: {}, // store location name ids for a quick lookup when sending back a corresponding id (location is a foreign key)
    preferredContactMethodList: [],
    preferredContactMethodIdLookup: {},
    schoolGradeList: [],
    schoolGradeIdLookup: {},
    blockList: [],
    blockIdLookup: {},

    createNewStudentIsLoading: false,
    createNewStudentError: null,
    createNewStudentSuccessMessage: '',

    editStudentIsLoading: false,
    editStudentError: null,
    edited: false,

    coursesListIsLoading: false,
    coursesListError: null,
    courseList: []

}

export const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_STUDENTS_START:
          return {
              ...state,
              listIsLoading: true,
              listError: null
          };
      case FETCH_STUDENTS_SUCCESS:
          return {
              ...state,
              listIsLoading: false,
              listError: null,
              studentList: action.payload
          };
      case FETCH_STUDENTS_FAILURE:
          return {
              ...state,
              listIsLoading: false,
              listError: action.payload
          }
      case FETCH_STUDENTBYID_START:
          return {
              ...state,
        
              cardIsLoading: true,
              cardError: null
          }
      case  FETCH_STUDENTBYID_SUCCESS:
          return {
              ...state,

              cardIsLoading: false,
              cardFetching: true,
              studentById: action.payload
          }
      case FETCH_STUDENTBYID_FAILURE:
          return {
              ...state,
              cardIsLoading: false,
              cardError: action.payload
          }
      case 'RESET_FORM':
          return {
            ...state,
            studentById: []
          }
      case 'GET_LOCATIONS_TABLE_SUCCESS':
          let locationArr = ['select'];
          let locationObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            locationArr.push(action.payload[i].name);
            locationObj[action.payload[i].name] = action.payload[i].id;
          }
          return {
            ...state,
            locationList: locationArr,
            locationIdLookup: locationObj
          }
      case 'GET_PREFERRED_CONTACT_METHOD_TABLE_SUCCESS':
          let preferredContactMethodArr = ['select'];
          let preferredContactMethodObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            preferredContactMethodArr.push(action.payload[i].method);
            preferredContactMethodObj[action.payload[i].method] = action.payload[i].id;
          }
          return {
            ...state,
            preferredContactMethodList: preferredContactMethodArr,
            preferredContactMethodIdLookup: preferredContactMethodObj
          }
      case 'GET_SCHOOL_GRADE_TABLE_SUCCESS':
          let schoolGradeArr = ['select'];
          let schoolGradeObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            schoolGradeArr.push(action.payload[i].name);
            schoolGradeObj[action.payload[i].name] = action.payload[i].id;
          }
          return {
            ...state,
            schoolGradeList: schoolGradeArr,
            schoolGradeIdLookup: schoolGradeObj
          }
      case 'GET_BLOCK_TABLE_SUCCESS':
          let blockArr = ['select'];
          let blockObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            blockArr.push(action.payload[i].block_code + ' ' + action.payload[i].neighborhood);
            blockObj[action.payload[i].block_code + ' ' + action.payload[i].neighborhood] = action.payload[i].block_code;
          }
          return {
            ...state,
            blockList: blockArr,
            blockIdLookup: blockObj
          }
      case CREATE_NEW_STUDENT_START: 
          return {
            ...state,
            createNewStudentIsLoading: true
          }
      case CREATE_NEW_STUDENT_SUCCESS:
          return {
            ...state,
            createNewStudentIsLoading: false,
            createNewStudentSuccessMessage: 'Student has been successfuly added'
          }
      case CREATE_NEW_STUDENT_FAILURE:
          return {
            ...state,
            createNewStudentError: 'Something went wrong'
          }
      case 'RESET_SUCCESS_MESSAGE': //reset success message in case user wants to create another user right after
          return {
            ...state,
            createNewStudentSuccessMessage: ''
          }
      case EDIT_STUDENTBYID_START:
          return {
            ...state,
            editStudentIsLoading: true
          }
      case EDIT_STUDENTBYID_SUCCESS:
          return {
            ...state,
            editStudentIsLoading: false,
            edited: true,
            studentById: action.payload
          }
      case EDIT_STUDENTBYID_FAILURE:
          return {
            ...state,
            editStudentError: 'Something went wrong'
          }
      case 'RESET_EDITED':
          return {
            ...state,
            edited: false
          }
      case FETCH_COURSES_BY_STUDENT_START:
          return {
              ...state,
              coursesListIsLoading: true,
              coursesListError: null
          };
      case FETCH_COURSES_BY_STUDENT_SUCCESS:
          return {
              ...state,
              coursesListIsLoading: false,
              coursesListError: null,
              courseList: action.payload
          };
      case FETCH_COURSES_BY_STUDENT_FAILURE:
          return {
              ...state,
              coursesListIsLoading: false,
              coursesListError: action.payload
          }
      default: return state;

  }
}
