import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { studentsReducer } from './adminDashboardReducers/students/studentsReducer';
import { landingPageReducer } from './landingPageReducers/landingPageReducers';
// import { studentByIdReducer } from './adminDashboardReducers/studentByIdReducer';
import { coursesReducer } from './adminDashboardReducers/courses/coursesReducer';
export const reducer = combineReducers({
  authenticationReducer,
  studentsReducer,
  landingPageReducer,
  coursesReducer
  // studentByIdReducer,
});

