import {
    FETCH_COURSES_START,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    FETCH_COURSEBYID_START,
    FETCH_COURSEBYID_SUCCESS,
    FETCH_COURSEBYID_FAILURE,
    EDIT_COURSEBYID_START,
    EDIT_COURSEBYID_SUCCESS,
    EDIT_COURSEBYID_FAILURE,
    FETCH_COURSES_BY_STUDENT_START,
    FETCH_COURSES_BY_STUDENT_SUCCESS,
    FETCH_COURSES_BY_STUDENT_FAILURE,

    GET_TERM_TABLE_SUCCESS,
    GET_COURSE_TYPE_TABLE_SUCCESS,
    GET_GROUP_TYPE_TABLE_SUCCESS,
    GET_SCHOOL_GRADE_TABLE_SUCCESS,
    GET_LEVEL_TABLE_SUCCESS,
    GET_COURSE_SCHEDULE_TABLE_SUCCESS,
    GET_ROOM_TABLE_SUCCESS,
    GET_TEACHER_TABLE_SUCCESS,

    CREATE_NEW_COURSE_START,
    CREATE_NEW_COURSE_SUCCESS,
    CREATE_NEW_COURSE_FAILURE
  } from '../../../actions';
  
  const initialState = {
        isLoading: false,
        error: null,
        courseList: [],
        courseById: [],
        isEdited: false,
        isEditing: false,


        listIsLoading: false,
        listError: null,
        courseList: [],
        courseById: [],
        cardIsLoading: false,
        cardFetching: false,
        cardError: null,
        cardIsEditting: false,
        cardIsEditted: false,

        termList: [],
        termIdLookup: {},
        courseTypeList: [],
        courseTypeIdLookup: {},
        groupTypeList: [],
        groupTypeIdLookup: {},
        schoolGradeList: [],
        schoolGradeIdLookup: {},
        levelList: [],
        levelListIdLookup: {},
        courseScheduleList: [],
        courseScheduleIdLookup: {},
        roomList: [],
        roomIdLookup: {},
        teacherList: [],
        teacherIdLookup: {},

        createNewCouseIsLoading: false,
        createNewCourseError: null,
        createNewCourseSuccessMessage: '',
    
        editCourseIsLoading: false,
        editCourseError: null,
        edited: false

  }
  
  export const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSES_START:
            return {
                ...state,
                listIsLoading: true,
                listError: null
            };
        case FETCH_COURSES_SUCCESS:
            return {
                ...state,
                listIsLoading: false,
                listError: null,
                courseList: action.payload
            };
        case FETCH_COURSES_FAILURE:
            return {
                ...state,
                listIsLoading: false,
                listError: action.payload
            }
            /// get by ID 
        case FETCH_COURSEBYID_START:
            return {
                ...state,
                cardIsLoading: true,
                cardError: null
            };
        case FETCH_COURSEBYID_SUCCESS:
            return {
                ...state,
                cardIsLoading: false,
                cardError: null,
                courseById: action.payload
            };
        case FETCH_COURSEBYID_FAILURE:
            return {
                ...state,
                cardIsLoading: false,
                cardError: action.payload
            }
        // edit by id
        case EDIT_COURSEBYID_START:
          return {
            ...state,
            editCourseIsLoading: true
          }
        case EDIT_COURSEBYID_SUCCESS:
            return {
              ...state,
              editCourseIsLoading: false,
              edited: true,
              CourseById: action.payload
            }
        case EDIT_COURSEBYID_FAILURE:
            return {
              ...state,
              editCourseError: 'Something went wrong'
            }

        case GET_TERM_TABLE_SUCCESS:
          let termArr = ['select'];
          let termObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            termArr.push(action.payload[i].name + ' sub ' + action.payload[i].subsection);
    
            termObj[action.payload[i].name + ' sub ' + action.payload[i].subsection] = action.payload[i].id;
            
          }
          return {
            ...state,
            termList: termArr,
            termIdLookup: termObj
        }
        case  GET_COURSE_TYPE_TABLE_SUCCESS:
          let courseTypeArr = ['select'];
          let courseTypeObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            courseTypeArr.push(action.payload[i].description);
            courseTypeObj[action.payload[i].description] = action.payload[i].id;
          }
          return {
            ...state,
            courseTypeList: courseTypeArr,
            courseTypeIdLookup: courseTypeObj
          }
        case GET_GROUP_TYPE_TABLE_SUCCESS:
          let groupTypeArr = ['select'];
          let groupTypeObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            groupTypeArr.push(action.payload[i].long_description);
            groupTypeObj[action.payload[i].long_description] = action.payload[i].id;
          }
          return {
            ...state,
            groupTypeList: groupTypeArr,
            groupTypeIdLookup: groupTypeObj
          }
        case GET_SCHOOL_GRADE_TABLE_SUCCESS:
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
        case GET_LEVEL_TABLE_SUCCESS:
          let levelArr = ['select'];
          let levelObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            levelArr.push(action.payload[i].description);
            levelObj[action.payload[i].description] = action.payload[i].id;
          }
          return {
            ...state,
            levelList: levelArr,
            levelListIdLookup: levelObj
          }
        case GET_COURSE_SCHEDULE_TABLE_SUCCESS:
          let courseScheduleArr = ['select'];
          let courseScheduleObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            courseScheduleArr.push(action.payload[i].short_description);
            courseScheduleObj[action.payload[i].short_description] = action.payload[i].id;
          }
          return {
            ...state,
            courseScheduleList: courseScheduleArr,
            courseScheduleIdLookup: courseScheduleObj
          }
        case GET_ROOM_TABLE_SUCCESS:
          let roomArr = ['select'];
          let roomObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            roomArr.push(action.payload[i].id.toString());
            roomObj[action.payload[i].id] = action.payload[i].id;
          }
          return {
            ...state,
            roomList: roomArr,
            roomIdLookup: roomObj
          }
        case GET_TEACHER_TABLE_SUCCESS:
          let teacherArr = ['select'];
          let teacherObj = {};
          for (let i = 0; i < action.payload.length; i++) {
            teacherArr.push(action.payload[i].name);
            teacherObj[action.payload[i].name] = action.payload[i].id;
          }
          return {
            ...state,
            teacherList: teacherArr,
            teacherIdLookup: teacherObj
          }
        case 'RESET_FORM':
          return {
            ...state,
            courseById: []
          }
        case 'RESET_SUCCESS_MESSAGE': //reset success message in case user wants to create another user right after
        return {
          ...state,
          createNewCourseSuccessMessage: ''
        }
        case 'RESET_EDITED':
          return {
            ...state,
            edited: false
          }
        case CREATE_NEW_COURSE_START: 
          return {
            ...state,
            createNewCourseIsLoading: true
          }
        case CREATE_NEW_COURSE_SUCCESS:
          return {
            ...state,
            createNewCourseIsLoading: false,
            createNewCourseSuccessMessage: 'Course has been successfuly added'
          }
        case CREATE_NEW_COURSE_FAILURE:
          return {
            ...state,
            createNewCourseError: 'Something went wrong'
          }
        default: return state;
  
    }
  }