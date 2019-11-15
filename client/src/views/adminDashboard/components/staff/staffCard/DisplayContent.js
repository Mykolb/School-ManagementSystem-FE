import React, { useEffect } from 'react';
import StaffInfoTab from './StaffInfoTab';
import StaffCourses from './StaffCourses';

function DisplayContent({navigation, staffData, resetForm}) {

  useEffect(() => {
    console.log('DISPLAY COMPONENT')
  }, [])

  {if (navigation === "Staff Information") {
    return <StaffInfoTab staffData={staffData} resetForm={resetForm}/>
  } else if (navigation === "Courses") {
    return <StaffCourses id={staffData.id}/>
  } 
  }
}

export default DisplayContent;