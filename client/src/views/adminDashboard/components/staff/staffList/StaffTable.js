import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getStaffTable, getStaffById, 
         resetSuccessMessage, resetEdited } 
         from '../../../../../actions/adminDashboardActions/staff/staffActions';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import './StaffTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import StaffRegistrationForm from './StaffRegistrationForm';
import StaffCard from '../staffCard/StaffCard';
import { staffTableColumns } from '../../../../../data';

const StaffTable = props => {
  const [search, setSearch] = useState(''); //TODO: add search functionality and display the search result array
  const [form, setForm] = useState(false);
  const [staffId, setStaffId] = useState(undefined);
  const [newRecord, setNewRecord] = useState(false); //this component refreshes when the new record is added so that the new staff apprears in the staff list
  const [savePrevState, setSavePrevState] = useState(newRecord); //usefull when another staff record needs to be added right after the first one
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState('none');

    
  useEffect(() => {
    // prevents from unneccessary api calls
    if (props.staffList.length === 0 || savePrevState !== newRecord || props.edited) {
      if (props.edited) {
        props.resetEdited();
      }
      props.getStaffTable(setSavePrevState, newRecord);
    }

  }, [staffId, newRecord])

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
    
  const staffData = props.staffList.sort((a,b) => { 
      return b.id - a.id }
  )

  //switch between the staff card view and the staff list view
  {if (staffId !== undefined && props.staffById.length !== 0) {
    return <StaffCard id={staffId} setStaffId={setStaffId}/>
  } else {
      return (
          <div>
              <div className="row-above">
                <div className="create-new-entry">
                  <div style={{display: 'flex', marginRight: '10px', alignItems: 'center', display: `${displaySuccessMessage}`}}>
                    <div style={{marginRight: '10px', color: '#0FDF0B', fontSize: '12px'}}>Staff has been successfully added</div>
                    <div><FontAwesomeIcon style={{width: '12px', cursor: 'pointer', color: '#0FDF0B'}} icon={faCheck} size='lg'/></div>
                  </div>
                  <div style={{display: 'flex'}}>
                    <div style={{marginRight: '10px', color: '#269FB0'}}>Add Staff</div>
                    <div><FontAwesomeIcon onClick={handleAddButton} style={{width: '25px', height: '25px', cursor: 'pointer', color: '#269FB0'}} icon={faPlusCircle} size='lg'/></div>
                  </div>
                </div>
              </div>

              {form ? (
                <StaffRegistrationForm handleCancelButtonOnForm={handleCancelButtonOnForm} setNewRecord={setNewRecord} 
                                          newRecord={newRecord} displaySuccessMessageTimeout={displaySuccessMessageTimeout}
                                          setSavePrevState={setSavePrevState}/>
              ) : null}
              
              
              {props.isLoading ? (
                <Spin style={{marginTop: '20px'}}size="large" />
              ) : (
              <Table
                className="rowHover"
                dataSource={staffData} 
                columns={staffTableColumns} 
                pagination={{ pageSize: 15 }} 
                rowKey='id'
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      setStaffId(record.id)
                      props.getStaffById(record.id)
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
      isLoading: state.staffReducer.listIsLoading,
      staffList: state.staffReducer.staffList,
      error: state.staffReducer.listError,
      staffById: state.staffReducer.staffById,
      createNewStaffuccessMessage: state.staffReducer.createNewStaffuccessMessage,
      edited: state.staffReducer.edited
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getStaffTable, 
        getStaffById, 
        resetSuccessMessage,
        resetEdited }
  )(StaffTable)
  )