import React, { useEffect } from 'react';
import CourseInfoTab from './CourseInfoTab';
import CourseStudents from './CourseStudents';



function DisplayContent({navigation, courseData, resetForm}) {

  useEffect(() => {
    console.log('DISPLAY COMPONENT')
  }, [])

  {if (navigation === "Course Information") {
    return <CourseInfoTab courseData={courseData} resetForm={resetForm}/>
  } else if (navigation === "Enrolled Students") {
     return <CourseStudents courseData={courseData} />
  } 
  }
}

export default DisplayContent;