import {
  FETCH_STAFF_START,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
  FETCH_STAFFBYID_START,
  FETCH_STAFFBYID_SUCCESS,
  FETCH_STAFFBYID_FAILURE,
  EDIT_STAFFBYID_START,
  EDIT_STAFFBYID_SUCCESS,
  EDIT_STAFFBYID_FAILURE,
  DELETE_STAFFBYID_START,
  DELETE_STAFFBYID_SUCCESS,
  DELETE_STAFFBYID_FAILURE,
  CREATE_NEW_STAFF_START,
  CREATE_NEW_STAFF_SUCCESS,
  CREATE_NEW_STAFF_FAILURE,
  FETCH_COURSES_BY_STAFF_START,
  FETCH_COURSES_BY_STAFF_SUCCESS,
  FETCH_COURSES_BY_STAFF_FAILURE,

} from '../../../actions/adminDashboardActions/staff/staffActions';

const initialState = {
    listIsLoading: false,
    listError: null,
    staffList: [],
    staffById: [],
    cardIsLoading: false,
    cardFetching: false,
    cardError: null,
    cardIsEditting: false,
    cardIsEditted: false,

    searchResults: [], //once search functionality is added, back button should go back to search resutls if there any
                       // and then back to stAFF list, unless there can also be display all option right there
    locationList: [], // create a list of names from location table to use for the dropdown on the form
    locationIdLookup: {}, // store location name ids for a quick lookup when sending back a corresponding id (location is a foreign key)
    preferredContactMethodList: [],
    preferredContactMethodIdLookup: {},
    schoolGradeList: [],
    schoolGradeIdLookup: {},
    blockList: [],
    blockIdLookup: {},

    createNewStaffIsLoading: false,
    createNewStaffError: null,
    createNewStaffuccessMessage: '',

    editStaffIsLoading: false,
    editStaffError: null,
    edited: false,

    coursesListIsLoading: false,
    coursesListError: null,
    courseList: []

}

export const staffReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_STAFF_START:
          return {
              ...state,
              listIsLoading: true,
              listError: null
          };
      case FETCH_STAFF_SUCCESS:
          return {
              ...state,
              listIsLoading: false,
              listError: null,
              staffList: action.payload
          };
      case FETCH_STAFF_FAILURE:
          return {
              ...state,
              listIsLoading: false,
              listError: action.payload
          }
      case FETCH_STAFFBYID_START:
          return {
              ...state,
        
              cardIsLoading: true,
              cardError: null
          }
      case  FETCH_STAFFBYID_SUCCESS:
          return {
              ...state,

              cardIsLoading: false,
              cardFetching: true,
              staffById: action.payload
          }
      case FETCH_STAFFBYID_FAILURE:
          return {
              ...state,
              cardIsLoading: false,
              cardError: action.payload
          }
      case 'RESET_FORM':
          return {
            ...state,
            staffById: []
          }
      case CREATE_NEW_STAFF_START: 
          return {
            ...state,
            createNewStaffIsLoading: true
          }
      case CREATE_NEW_STAFF_SUCCESS:
          return {
            ...state,
            createNewStaffIsLoading: false,
            createNewStaffuccessMessage: 'Staff has been successfuly added'
          }
      case CREATE_NEW_STAFF_FAILURE:
          return {
            ...state,
            createNewStaffError: 'Something went wrong'
          }
      case 'RESET_SUCCESS_MESSAGE': //reset success message in case user wants to create another user right after
          return {
            ...state,
            createNewStaffuccessMessage: ''
          }
      case EDIT_STAFFBYID_START:
          return {
            ...state,
            editStaffIsLoading: true
          }
      case EDIT_STAFFBYID_SUCCESS:
          return {
            ...state,
            editStaffIsLoading: false,
            edited: true,
            staffById: action.payload
          }
      case EDIT_STAFFBYID_FAILURE:
          return {
            ...state,
            editStaffError: 'Something went wrong'
          }
      case 'RESET_EDITED':
          return {
            ...state,
            edited: false
          }
      case FETCH_COURSES_BY_STAFF_START:
          return {
              ...state,
              coursesListIsLoading: true,
              coursesListError: null
          };
      case FETCH_COURSES_BY_STAFF_SUCCESS:
          return {
              ...state,
              coursesListIsLoading: false,
              coursesListError: null,
              courseList: action.payload
          };
      case FETCH_COURSES_BY_STAFF_FAILURE:
          return {
              ...state,
              coursesListIsLoading: false,
              coursesListError: action.payload
          }
      default: return state;

  }
}
