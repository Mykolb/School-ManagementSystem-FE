import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCourseTable, 
         getCourseById, 
         getTermTable, 
         getCourseTypeTable,
         getGroupTypeTable,
         getSchoolGradeTable,
         getLevelTable,
         getCourseScheduleTable,
         getRoomTable,
         getTeacherTable,
         resetEdited,
         resetSuccessMessage
        } from '../../../../../actions/adminDashboardActions/courses/courseAction';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
// import './StudentTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import CourseRegistrationForm from './CourseRegistrationForm';
import CourseCard from '../courseCard/CourseCard';
import { courseTableColumns } from '../../../../../data';

const CourseTable = props => {
  const [search, setSearch] = useState(''); //TODO: add search functionality and display the search result array
  const [form, setForm] = useState(false);
  const [courseId, setCourseId] = useState(undefined);
  const [newRecord, setNewRecord] = useState(false); //this component refreshes when the new record is added so that the new course apprears in the course list
  const [savePrevState, setSavePrevState] = useState(newRecord); //usefull when another course record needs to be added right after the first one
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState('none');

    
  useEffect(() => {
    // prevents from unneccessary api calls
    if (props.courseList.length === 0 || savePrevState !== newRecord || props.edited) {
      if (props.edited) {
        props.resetEdited();
      }
      props.getCourseTable(setSavePrevState, newRecord);
    }
    if (props.termList.length === 0) {
      props.getTermTable();
    }
    if (props.courseTypeList.length === 0) {
      props.getCourseTypeTable();
    }
    if (props.groupTypeList.length === 0) {
      props.getGroupTypeTable();
    }
    if (props.schoolGradeList.length === 0) {
      props.getSchoolGradeTable();
    }
    if (props.levelList.length === 0) {
      props.getLevelTable();
    }
    if (props.courseScheduleList.length === 0) {
      props.getCourseScheduleTable();
    }
    if (props.roomList.length === 0) {
      props.getRoomTable();
    }
    if (props.teacherList.length === 0) {
      props.getTeacherTable();
    }   
    
  }, [courseId, newRecord])

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
      edited: state.coursesReducer.edited,
      termList: state.coursesReducer.termList,
      courseTypeList: state.coursesReducer.courseTypeList,
      groupTypeList: state.coursesReducer.groupTypeList,
      schoolGradeList: state.coursesReducer.schoolGradeList,
      levelList: state.coursesReducer.levelList,
      courseScheduleList: state.coursesReducer.courseScheduleList,
      roomList: state.coursesReducer.roomList,
      teacherList: state.coursesReducer.teacherList,
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
        getTeacherTable,
        resetEdited,
        resetSuccessMessage 
      }
  )(CourseTable)
  )
