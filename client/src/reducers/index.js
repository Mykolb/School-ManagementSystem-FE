import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { studentsReducer } from './adminDashboardReducers/students/studentsReducer';
// import { studentByIdReducer } from './adminDashboardReducers/studentByIdReducer';

export const reducer = combineReducers({
  authenticationReducer,
  studentsReducer,
  // studentByIdReducer,
});

