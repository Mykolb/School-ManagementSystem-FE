import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { studentsReducer } from './adminDashboardReducers/students/studentsReducer';
import { landingPageReducer } from './landingPageReducers/landingPageReducers';
// import { studentByIdReducer } from './adminDashboardReducers/studentByIdReducer';
import { coursesReducer } from './adminDashboardReducers/courses/coursesReducer';
import { staffReducer } from './adminDashboardReducers/staff/staffReducer';
import { registrationReducer } from './registrationReducer';
export const reducer = combineReducers({
  authenticationReducer,
  studentsReducer,
  landingPageReducer,
  coursesReducer,
  staffReducer,
  registrationReducer
});

