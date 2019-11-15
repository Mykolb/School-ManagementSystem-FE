import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStudentById,  editStudentById, resetEdited} 
       from '../../../../../actions/adminDashboardActions/students/studentsActions';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Dropdown from 'react-dropdown'
import './StudentInfoTab.css';
import 'react-dropdown/style.css'

const FormWrap = styled.form`
border: 0px transparant;
border-radius: 3px;
font-size: 12px;
display: flex;
flex-direction: column;
transition: all 200ms ease;
`

const Label = styled.label`
color: #89878a;
`

const Data = styled.div`
color: black;
font-weight: 450;
`

const Input = styled.input`
outline: none;
border-radius: 3px;
background: white;
width: 100%;
height: 31px;
font-size: 14px;
font-weight: 400;
margin-left: -2px;
`

function StudentInfoTab(props) {
  const [student, setStudent] = useState({
                                          cpr: props.studentById.cpr, 
                                          registrationDate: props.studentById.registration_date, 
                                          firstName: props.studentById.first_name, 
                                          additionalNames: props.studentById.additional_names, 
                                          gender: props.studentById.gender, 
                                          birthdate: props.studentById.birthdate, 
                                          schoolGradeId: props.studentById.school_grade_id, 
                                          schoolGradeUpdated: props.studentById.grade_updated,
                                          schoolName: props.studentById.school_name, 
                                          homeTelephone: props.studentById.home_telephone, 
                                          mobileTelephone: props.studentById.mobile_telephone, 
                                          block: props.studentById.block_code, 
                                          road: props.studentById.road, 
                                          building: props.studentById.building, 
                                          flat: props.studentById.flat, 
                                          email: props.studentById.email, 
                                          notes: props.studentById.notes, 
                                          contactTypeId: props.studentById.preferred_contact_type_id, 
                                          locationId: props.studentById.location_id
                                        });
 
  // set arrays of foreign key values to use in the dropdown (except 'gender' array it's not a foreign key)
  // note: arrays exclude 'select' [0] index option when assigned to dropdown since its set as all fields required on registration form submit
  const genderArr = ['F', 'M'];
  const [gender, setGender] = useState('')
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [schoolGrade, setSchoolGrade] = useState('');
  const [block, setBlock] = useState('');

  //toggle visibility of cancel button
  const [displayCancelButton, setDisplayCancelButton] = useState('none');

  //toggle disable on/off of the form on click of the edit button
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [arrowVisibility, setArrowVisibility] = useState('Hidden')
  const [cancel, setCancel] = useState(false);

  //reload the component after successfull edit call so that changes show on the page
  const [edited, setEdited] = useState(props.edited);

  useEffect(() => {
    let options = { year: 'numeric', month: 'numeric', day: 'numeric' }; 
    let birthdate = new Date(props.studentById.birthdate).toLocaleDateString('en-US', options) 
    let registration_date = new Date(props.studentById.registration_date).toLocaleDateString('en-US', options)
    let schoolGradeUpdatedDate = new Date(props.studentById.grade_updated).toLocaleDateString('en-US', options)
 
    //display dropdown value based on the incoming data
    for (let i = 0; i < genderArr.length; i++) {
      if (props.studentById.gender === genderArr[i]) {
        setGender(genderArr[i]);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.locationIdLookup) {
      if (props.locationIdLookup[key] === props.studentById.location_id) {
        setLocation(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.blockIdLookup) {
      let getCodePart = key.split(' ');
     
      if (parseInt(getCodePart[0]) === props.studentById.block_code) {
        setBlock(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.schoolGradeIdLookup) {
      if (props.schoolGradeIdLookup[key] === props.studentById.school_grade_id) {
        setSchoolGrade(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.preferredContactMethodIdLookup) {
      if (props.preferredContactMethodIdLookup[key] === props.studentById.preferred_contact_type_id) {
        setContact(key);
      }
    }
 
    setStudent({
      cpr: props.studentById.cpr, 
      registrationDate: registration_date, 
      firstName: props.studentById.first_name, 
      additionalNames: props.studentById.additional_names, 
      gender: props.studentById.gender, 
      birthdate: birthdate, 
      schoolGradeId: props.studentById.school_grade_id, 
      schoolGradeUpdated: `${props.studentById.grade_updated ? schoolGradeUpdatedDate : ''}`,
      schoolName: props.studentById.school_name, 
      homeTelephone: props.studentById.home_telephone, 
      mobileTelephone: props.studentById.mobile_telephone, 
      block: props.studentById.block_code, 
      road: props.studentById.road, 
      building: props.studentById.building, 
      flat: props.studentById.flat, 
      email: props.studentById.email, 
      notes: props.studentById.notes, 
      contactTypeId: props.studentById.preferred_contact_type_id, 
      noCall: props.studentById.no_call, 
      delinquent: props.studentById.delinquent,
      expelled: props.studentById.expelled, 
      locationId: props.studentById.location_id
    })

  }, [cancel, edited])

  const handleEdit = () => {
    if (edit) {
      const birthdate = moment(student.birthdate).toDate();
      const birthdateISO = birthdate.toISOString();

      const schoolGradeUpdated = moment(student.birthdate).toDate();
      const schoolGradeUpdatedISO = schoolGradeUpdated.toISOString();

      const editStudent  = {
        id: props.studentById.id,
        cpr: student.cpr, 
        registration_date: props.studentById.registration_date, 
        first_name: student.firstName, 
        additional_names: student.additionalNames, 
        gender: student.gender, 
        birthdate: birthdateISO, 
        school_grade_id: student.schoolGradeId, 
        grade_updated: schoolGradeUpdatedISO,
        school_name: student.schoolName, 
        home_telephone: student.homeTelephone, 
        mobile_telephone: student.mobileTelephone, 
        block_code: student.block, 
        road: student.road, 
        building: student.building, 
        flat: student.flat, 
        email: student.email, 
        notes: student.notes, 
        preferred_contact_type_id: student.contactTypeId, 
        location_id: student.locationId
      }
      props.editStudentById(props.studentById.id, editStudent);
      setDisabled(true);
      setEdit(false);
      setDisplayCancelButton('none');
      setArrowVisibility('Hidden')
    } else {
      setDisabled(false);
      setEdit(true);
      setDisplayCancelButton('flex');
      setArrowVisibility('Visible')
      props.resetEdited();
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    setDisabled(true);
    setEdit(false);
    setDisplayCancelButton('none');
    setCancel(!cancel);
    setArrowVisibility('Hidden')
  }


  function handleChange(event) {
    setStudent({ ...student, [event.target.name]: event.target.value });
  }                                        

  function handleGenderDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < genderArr.length; i++) {
      if (genderArr[i] === e.value) {
        index = i;
      }
    }
    setStudent({...student, gender: e.value});
    setGender(genderArr[index]); 
  }
  
  function handleLocationDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.locationList.length; i++) {
      if (props.locationList[i] === e.value) {
        index = i;
      }
    }
    setStudent({...student, locationId: props.locationIdLookup[e.value]});
    setLocation(props.locationList[index]);
  }

  function handleContactMethodDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.preferredContactMethodList.length; i++) {
      if (props.preferredContactMethodList[i] === e.value) {
        index = i;
      }
    }
    setStudent({...student, contactTypeId: props.preferredContactMethodIdLookup[e.value]});
    setContact(props.preferredContactMethodList[index]);
  }

  function handleSchoolGradeDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.schoolGradeList.length; i++) {
      if (props.schoolGradeList[i] === e.value) {
        index = i;
      }
    }
    setStudent({...student, schoolGradeId: props.schoolGradeIdLookup[e.value]});
    setSchoolGrade(props.schoolGradeList[index]);
  }

  function handleBlockDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.blockList.length; i++) {
      if (props.blockList[i] === e.value) {
        index = i;
      }
    }
    setStudent({...student, block: props.blockIdLookup[e.value]});
    setBlock(props.blockList[index]);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div onClick={handleCancel} 
             style={{marginTop: '5px', 
             marginRight: '5px', cursor: 'pointer', 
             color: '#C73642', display: 'flex', 
             display: `${displayCancelButton}`}}>
          <FontAwesomeIcon icon={faTimesCircle} size='lg' color='#C73642' style={{marginRight: '8px'}}/> {''}
        </div>
        <div onClick={handleEdit} style={{alignSelf: 'flex-end', marginTop: '5px', marginRight: '40px', cursor: 'pointer', color: '#269FB0', display: 'flex'}}>
          <FontAwesomeIcon icon={edit ? faSave : faEdit} size='lg' color='#269FB0' style={{marginRight: '8px'}}/> {''}
          <div>
            {edit ? 'Save' : 'Edit'}
          </div>
        </div>
      </div>
    <FormWrap style={{marginTop: '20px', width: '100%'}}>
    <fieldset style={{border: '1px solid transparent'}}>
      <div style={{display: 'grid', textAlign: 'left', gridTemplateColumns: '1fr 1fr 1fr 1fr',gridGap: '35px 5px'}}>
        <div >
          <Label>CPR</Label>
          <Data>
            <Input 
              style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
              type="text"
              name="cpr"
              value={student.cpr}
              onChange={handleChange}
              disabled={disabled} />
          </Data>
        </div>
        <div>
          <Label>First Name</Label>
          <Data>
            <Input 
              style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              disabled={disabled} />
          </Data>
        </div>
        <div style={{gridColumn: 'span 2'}}>
          <Label>Additional names</Label>
          <Data>
            <Input 
              style={{width: '100%', border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
              type="text"
              name="additionalNames"
              value={student.additionalNames}
              onChange={handleChange}
              disabled={disabled} />
          </Data>
        </div>
      <div >
        <Label>Gender</Label>
        <Data>
          <Dropdown
            onChange={handleGenderDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={genderArr}   
            value={gender}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Email</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>School Name</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="schoolName"
            value={student.schoolName}
            onChange={handleChange}
            disabled={disabled}
          />
        </Data>
      </div>
      <div >
        <Label>Birth date</Label>
        <Data >
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type='text' 
            name="birthdate"
            value={student.birthdate}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Location</Label>
        <Data>
          <Dropdown 
            onChange={handleLocationDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`} 
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.locationList.slice(1)}   
            value={location}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Home Telephone</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="homeTelephone"
            value={student.homeTelephone}
            onChange={handleChange}
            disabled={disabled}
          />
        </Data>
      </div>
      <div>
        <Label>Mobile Telephone</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="mobileTelephone"
            value={student.mobileTelephone}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Preferred contact method</Label>
        <Data>
          <Dropdown 
            onChange={handleContactMethodDropdown}
            value={contact} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.preferredContactMethodList.slice(1)}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Block</Label>
        <Data>
          <Dropdown 
              onChange={handleBlockDropdown} 
              controlClassName={`myControlClassName editForm${arrowVisibility}`}
              className='dropdownRoot' 
              menuClassName='myMenuClassName dropdown-menu'
              options={props.blockList.slice(1)}   
              value={block}
              disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Road</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="road"
            value={student.road}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Building</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="building"
            value={student.building}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Flat</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="flat"
            value={student.flat}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>School grade</Label>
        <Data>
          <Dropdown 
            onChange={handleSchoolGradeDropdown} 
            value={schoolGrade} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.schoolGradeList.slice(1)}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>School grade updated</Label>
        <Data>
          <Input 
              style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
              type={disabled ? 'text' : student.schoolGradeUpdated ? 'text' : 'date'}
              name="schoolGradeUpdated"
              value={student.schoolGradeUpdated}
              onChange={handleChange}
              disabled={disabled} />
        </Data>
      </div>
      <div style={{position: 'relative'}}>
        <Label>Registration date</Label>
        <Data>
          <Input 
            style={{border: '1px solid transparent'}}
            type="text"
            name="registrationDate"
            value={student.registrationDate}
            onChange={handleChange}
            disabled={true} />
        </Data>
      </div>
      <div style={{gridColumn: 'span 4'}}>
        <Label>Notes</Label>
        <Data>
          <textarea 
            style={{width: '100%', height: '80px', outline: 'none', 
                    border: '1px solid transparent', borderRadius: '3px', 
                    fontSize: '14px', fontWeight: '400', marginLeft: '-2px',
                    border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="notes"
            value={student.notes}
            onChange={handleChange}
            disabled={disabled}
          />
        </Data>
      </div>
      </div>
    </fieldset>
  </FormWrap>
  </div>
  )
}

const mapStateToProps = state => {
  return {
      studentById: state.studentsReducer.studentById,
      locationList: state.studentsReducer.locationList,
      locationIdLookup: state.studentsReducer.locationIdLookup,
      preferredContactMethodList: state.studentsReducer.preferredContactMethodList,
      preferredContactMethodIdLookup: state.studentsReducer.preferredContactMethodIdLookup,
      schoolGradeList: state.studentsReducer.schoolGradeList,
      schoolGradeIdLookup: state.studentsReducer.schoolGradeIdLookup,
      blockList: state.studentsReducer.blockList,
      blockIdLookup: state.studentsReducer.blockIdLookup,
      edited: state.studentsReducer.edited
  };
};

export default withRouter(
  connect(
      mapStateToProps,
      { getStudentById, editStudentById, resetEdited }
  )(StudentInfoTab)
)