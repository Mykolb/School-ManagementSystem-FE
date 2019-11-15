import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { getCourseTable, getCourseById, 
import { getCourseTable, getCourseById, 
         getTermTable, 
         getCourseTypeTable,
         getGroupTypeTable,
         getSchoolGradeTable,
         getLevelTable,
         getCourseScheduleTable,
         getRoomTable,
         getTeacherTable
        } from '../../../../../actions/adminDashboardActions/courses/courseAction';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
// import './StudentTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import CourseRegistrationForm from '../courseRegistrationForm';
import CourseCard from '../CourseCard';
import { courseTableColumns } from '../../../../../data';

const Courses = props => {
  const [search, setSearch] = useState(''); //TODO: add search functionality and display the search result array
  const [form, setForm] = useState(false);
  const [courseId, setCourseId] = useState(undefined);
  const [newRecord, setNewRecord] = useState(false); //this component refreshes when the new record is added so that the new course apprears in the course list
  const [savePrevState, setSavePrevState] = useState(newRecord); //usefull when another course record needs to be added right after the first one
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState('none');

    
  useEffect(() => {
    // prevents from unneccessary api calls
      props.getCourseTable();

      props.getTermTable();
      props.getCourseTypeTable();
      props.getGroupTypeTable();
      props.getSchoolGradeTable();
      props.getLevelTable();
      props.getCourseScheduleTable();
      props.getRoomTable();
      props.getTeacherTable();
    
  }, [courseId])

  const handleCancelButtonOnForm = () => {
    setForm(false);
  }

  const handleAddButton = () => {
    setForm(!form);
    props.resetSuccessMessage(); //useful when another record needs to be added right after the first one
  }

  const displaySuccessMessageTimeout = () => {
    setDisplaySuccessMessage('flex');
    setTimeout(() => {
      setDisplaySuccessMessage('none');
    }, 3000)
    
  }
    
  const courseData = props.courseList.sort((a,b) => { 
      return b.id - a.id }
  )

  //switch between the course card view and the course list view
  {if (courseId !== undefined && props.courseById.length !== 0) {
    return <CourseCard id={courseId} setCourseId={setCourseId}/>
  } else {
      return (
          <div>
              <div className="row-above">
                <div className="create-new-entry">
                  <div style={{display: 'flex', marginRight: '10px', display: `${displaySuccessMessage}`}}>
                    <div style={{marginRight: '10px', color: '#0FDF0B'}}>Course has been successfully added</div>
                    <div><FontAwesomeIcon style={{width: '25px', height: '25px', cursor: 'pointer', color: '#0FDF0B'}} icon={faCheck} size='lg'/></div>
                  </div>
                  <div style={{display: 'flex'}}>
                    <div style={{marginRight: '10px', color: '#269FB0'}}>Add course</div>
                    <div><FontAwesomeIcon onClick={handleAddButton} style={{width: '25px', height: '25px', cursor: 'pointer', color: '#269FB0'}} icon={faPlusCircle} size='lg'/></div>
                  </div>
                </div>
              </div>

              {form ? (
                <CourseRegistrationForm handleCancelButtonOnForm={handleCancelButtonOnForm} setNewRecord={setNewRecord} 
                                          newRecord={newRecord} displaySuccessMessageTimeout={displaySuccessMessageTimeout}
                                          setSavePrevState={setSavePrevState}/>
              ) : null}
              
              
              {props.isLoading ? (
                <Spin style={{marginTop: '20px'}}size="large" />
              ) : (
              <Table
                className="rowHover"
                dataSource={courseData} 
                columns={courseTableColumns} 
                pagination={{ pageSize: 15 }} 
                rowKey='id'
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      setCourseId(record.id)
                      props.getCourseById(record.id)
                    }
                  };
                }}
              />
              )}
          </div>
      )
    } 
  }
}


const mapStateToProps = state => {
    return {
      isLoading: state.coursesReducer.listIsLoading,
      courseList: state.coursesReducer.courseList,
      error: state.coursesReducer.listError,
      courseById: state.coursesReducer.courseById,
      // createNewcourseSuccessMessage: state.coursesReducer.createNewcourseSuccessMessage,
      // locationList: state.coursesReducer.locationList,
      // preferredContactMethodList: state.coursesReducer.preferredContactMethodList,
      // schoolGradeList: state.coursesReducer.schoolGradeList,
      // blockList: state.coursesReducer.blockList,
      // edited: state.coursesReducer.edited
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getCourseTable, 
        getCourseById,
        getTermTable, 
        getCourseTypeTable,
        getGroupTypeTable,
        getSchoolGradeTable,
        getLevelTable,
        getCourseScheduleTable,
        getRoomTable,
        getTeacherTable }
  )(Courses)
  )






// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { withRouter, Link } from 'react-router-dom';
// import { getCourseTable} from '../../../../actions/adminDashboardActions/courses/courseAction';
// import { Table, Spin } from 'antd';
// import 'antd/dist/antd.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// // import '../mainStyle/mainCard.scss'

// const Courses = props => {
//   const [search, setSearch] = useState('');
//   const [form, setForm] = useState(false);


//   useEffect(() => {
//     props.getCourseTable();
//   }, [])

//   const handleCancelButtonOnForm = () => {
//     setForm(false);
//   }

//   const handleSearchInput = () => {

//   }

//   const handleAddButton = () => {
//     setForm(!form);
//   }

//   const columns = [
//     {
//       title: 'Course ID',
//       dataIndex: 'id',
//       key: 1,
//     },
//     {
//       title: 'Term',
//       dataIndex: 'term',
//       key: 2,
//     },
//     {
//       title: 'Course Type',
//       dataIndex: 'course_type',
//       key: 4,
//     },
//     {
//       title: 'Group Type',
//       dataIndex: 'group_type',
//       key: 5,
//     },
//     {
//       title: 'School Grade',
//       dataIndex: 'school_grade',
//       key: 6,
//     },
//     {
//       title: 'Level',
//       dataIndex: 'level',
//       key: 7,
//     },
//     {
//       title: 'Course Schedule',
//       dataIndex: 'course_schedule',
//       key: 8,
//     },{
//       title: 'Teacher',
//       dataIndex: 'teacher',
//       key: 9,
//     },
//   ];

//   // const courseData = props.studentList.sort((a, b) => {
//   //   return b.id - a.id
//   // }
//   // )

//   return (
//     <div>
//       <div className="row-above">
//         <div>
//           <input
//             className="row-above-input"
//             type="text"
//             name="Search"
//             placeholder="Search by registration date, name, cpr, etc..."
//             value={search}
//             onChange={handleSearchInput}
//           />
//         </div>
//         <div className="create-new-entry" style={{ cursor: 'pointer', color: '#26ABBD' }}>
//           <div style={{ marginRight: '10px' }}>Add Course</div>
//           <div><FontAwesomeIcon onClick={handleAddButton} style={{ width: '18px', height: '21px' }} icon={faPlusCircle} size='lg' /></div>
//         </div>
//       </div>

//       {props.isLoading ? (
//         <Spin style={{ marginTop: '150px' }} size="large" />
//       ) : (
//           <Table
//             className="rowHover"
//             dataSource={props.courseList}
//             columns={columns}
//             pagination={{ pageSize: 15 }}
//             rowKey='id'
//             onRow={(record, rowIndex) => {
//               return {
//                 onClick: event => {
//                   props.setCourseView('courseCardView')
//                   props.setCourseID(record.id)
//                 }
//               };
//             }}
//           />
//         )}
//     </div>
//   )
// }

// const mapStateToProps = state => {
//   return {
//     isLoading: state.coursesTableReducer.isLoading,
//     courseList: state.coursesTableReducer.courseList,
//     error: state.coursesTableReducer.error,
//   };
// };

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { getCourseTable }
//   )(Courses)
// )