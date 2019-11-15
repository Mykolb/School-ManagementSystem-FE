import React, { useEffect } from 'react';
import CourseInfoTab from './CourseInfoTab';



function DisplayContent({navigation, courseData, resetForm}) {

  useEffect(() => {
    console.log('DISPLAY COMPONENT')
  }, [])

  {if (navigation === "Course Information") {
    return <CourseInfoTab courseData={courseData} resetForm={resetForm}/>
  } else if (navigation === "Enrolled Students") {
     return <div>Enrolled Students</div>
  } 
  }
}

export default DisplayContent;