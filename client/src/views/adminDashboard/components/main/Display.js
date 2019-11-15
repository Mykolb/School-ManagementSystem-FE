import React from 'react';
import StudentTable from '../students/studentList/StudentTable';
import CourseTable from '../courses/courseList/CourseTable';
import StaffTable from '../staff/staffList/StaffTable';

function Display({ navigation }) {

  {if (navigation === 'students') {
    return (
      <StudentTable />
    )
  } else if (navigation === 'courses') {
    return (
      <CourseTable />
    )

  } else if (navigation === 'staff') {
    return (
      <div>
        <StaffTable />
      </div>
    )
  } 
 }
}

export default Display;