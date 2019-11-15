import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getStudentTable, getStudentById, getLocationsTable, 
         getPreferredContactMethodTable, getSchoolGradeTable, 
         resetSuccessMessage, getBlockTable, resetEdited } 
         from '../../../../../actions/adminDashboardActions/students/studentsActions';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import './StudentTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import StudentRegistrationForm from './StudentRegistrationForm';
import StudentCard from '../studentCard/StudentCard';
import { studentTableColumns } from '../../../../../data';

const StudentTable = props => {
  const [search, setSearch] = useState(''); //TODO: add search functionality and display the search result array
  const [form, setForm] = useState(false);
  const [studentId, setStudentId] = useState(undefined);
  const [newRecord, setNewRecord] = useState(false); //this component refreshes when the new record is added so that the new student apprears in the student list
  const [savePrevState, setSavePrevState] = useState(newRecord); //usefull when another student record needs to be added right after the first one
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState('none');

    
  useEffect(() => {
    // prevents from unneccessary api calls
    if (props.studentList.length === 0 || savePrevState !== newRecord || props.edited) {
      if (props.edited) {
        props.resetEdited();
      }
      props.getStudentTable(setSavePrevState, newRecord);
    }
    if (props.locationList.length === 0) {
      props.getLocationsTable();
    }
    if (props.preferredContactMethodList.length === 0) {
      props.getPreferredContactMethodTable();
    }
    if (props.schoolGradeList.length === 0) {
      props.getSchoolGradeTable();
    }
    if (props.blockList.length === 0) {
      props.getBlockTable();
    }

  }, [studentId, newRecord])

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
    
  const studentData = props.studentList.sort((a,b) => { 
      return b.id - a.id }
  )

  //switch between the student card view and the student list view
  {if (studentId !== undefined && props.studentById.length !== 0) {
    return <StudentCard id={studentId} setStudentId={setStudentId}/>
  } else {
      return (
          <div>
              <div className="row-above">
                <div className="create-new-entry">
                  <div style={{display: 'flex', marginRight: '10px', alignItems: 'center', display: `${displaySuccessMessage}`}}>
                    <div style={{marginRight: '10px', color: '#0FDF0B', fontSize: '12px'}}>Student has been successfully added</div>
                    <div><FontAwesomeIcon style={{width: '12px', cursor: 'pointer', color: '#0FDF0B'}} icon={faCheck} size='lg'/></div>
                  </div>
                  <div style={{display: 'flex'}}>
                    <div style={{marginRight: '10px', color: '#269FB0'}}>Add Student</div>
                    <div><FontAwesomeIcon onClick={handleAddButton} style={{width: '25px', height: '25px', cursor: 'pointer', color: '#269FB0'}} icon={faPlusCircle} size='lg'/></div>
                  </div>
                </div>
              </div>

              {form ? (
                <StudentRegistrationForm handleCancelButtonOnForm={handleCancelButtonOnForm} setNewRecord={setNewRecord} 
                                          newRecord={newRecord} displaySuccessMessageTimeout={displaySuccessMessageTimeout}
                                          setSavePrevState={setSavePrevState}/>
              ) : null}
              
              
              {props.isLoading ? (
                <Spin style={{marginTop: '20px'}}size="large" />
              ) : (
              <Table
                className="rowHover"
                dataSource={studentData} 
                columns={studentTableColumns} 
                pagination={{ pageSize: 15 }} 
                rowKey='id'
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      setStudentId(record.id)
                      props.getStudentById(record.id)
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
      isLoading: state.studentsReducer.listIsLoading,
      studentList: state.studentsReducer.studentList,
      error: state.studentsReducer.listError,
      studentById: state.studentsReducer.studentById,
      createNewStudentSuccessMessage: state.studentsReducer.createNewStudentSuccessMessage,
      locationList: state.studentsReducer.locationList,
      preferredContactMethodList: state.studentsReducer.preferredContactMethodList,
      schoolGradeList: state.studentsReducer.schoolGradeList,
      blockList: state.studentsReducer.blockList,
      edited: state.studentsReducer.edited
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getStudentTable, 
        getStudentById, 
        getLocationsTable, 
        getPreferredContactMethodTable, 
        getSchoolGradeTable,
        getBlockTable,
        resetSuccessMessage,
        resetEdited }
  )(StudentTable)
  )