import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStaffById,  editStaffById, resetEdited} 
       from '../../../../../actions/adminDashboardActions/staff/staffActions';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Dropdown from 'react-dropdown'
import './StaffInfoTab.css';
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

function StaffInfoTab(props) {
  const [staff, setStaff] = useState({
                                        cpr: props.staffById.cpr, 
                                        registrationDate: props.staffById.registrationDate, 
                                        name: props.staffById.name, 
                                        shortName: props.staffById.short_name, 
                                        gender: props.staffById.gender, 
                                        birthdate: props.staffById.birthdate,    
                                        mobileTelephone: props.staffById.mobile_number,  
                                        email: props.staffById.email, 
                                        notes: props.staffById.notes, 
                                        admin: props.staffById.admin,  
                                        teaching_rate: props.staffById.teaching_rate,
                                        active: props.staffById.active,
                                        accent: props.staffById.accent
                                      });
 
  // set arrays of foreign key values to use in the dropdown (except 'gender' array it's not a foreign key)
  // note: arrays exclude 'select' [0] index option when assigned to dropdown since its set as all fields required on registration form submit
  const genderArr = ['F', 'M'];
  const [gender, setGender] = useState('');
  const accentArr = ['North American', 'British', 'Irish', 'Australian', 'Scottish', 'South African',
                     'French/Brit', 'Local', 'Other'];
  const [accent, setAccent] = useState('');


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
    let birthdate = new Date(props.staffById.birthdate).toLocaleDateString('en-US', options) 
 
    //display dropdown value based on the incoming data
    for (let i = 0; i < genderArr.length; i++) {
      if (props.staffById.gender === genderArr[i]) {
        setGender(genderArr[i]);
      }
    }

    //display dropdown value based on the incoming data
    for (let i = 0; i < accentArr.length; i++) {
      if (props.staffById.accent === accentArr[i]) {
        setAccent(accentArr[i]);
      }
    }

    setStaff({
      cpr: props.staffById.cpr, 
      name: props.staffById.name, 
      shortName: props.staffById.short_name, 
      gender: props.staffById.gender, 
      birthdate: birthdate,    
      mobileTelephone: props.staffById.mobile_number,  
      email: props.staffById.email, 
      notes: props.staffById.notes, 
      admin: props.staffById.admin,  
      teaching_rate: props.staffById.teaching_rate,
      active: props.staffById.active,
      accent: props.staffById.accent
    })

  }, [cancel, edited])

  const handleEdit = () => {
    if (edit) {
      const birthdate = moment(staff.birthdate).toDate();
      const birthdateISO = birthdate.toISOString();

      const editStaff  = {
        id: props.staffById.id,
        cpr: staff.cpr, 
        created_at: props.staffById.created_at, 
        name: staff.name, 
        short_name: staff.shortName, 
        gender: staff.gender, 
        birthdate: birthdateISO, 
        mobile_number: staff.mobileTelephone, 
        email: staff.email, 
        notes: staff.notes, 
        admin: staff.admin, 
        teaching_rate: staff.teaching_rate,
        active: staff.active,
        accent: staff.accent
      }
      props.editStaffById(props.staffById.id, editStaff);
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
    setStaff({ ...staff, [event.target.name]: event.target.value });
  }                                        

  function handleGenderDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < genderArr.length; i++) {
      if (genderArr[i] === e.value) {
        index = i;
      }
    }
    setStaff({...staff, gender: e.value});
    setGender(genderArr[index]); 
  }
 
  function handleAccentDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < accentArr.length; i++) {
      if (accentArr[i] === e.value) {
        index = i;
      }
    }
    setStaff({...staff, accent: e.value});
    setAccent(accentArr[index]); 
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
              value={staff.cpr}
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
              name="name"
              value={staff.name}
              onChange={handleChange}
              disabled={disabled} />
          </Data>
        </div>
        <div>
          <Label>Short name</Label>
          <Data>
            <Input 
              style={{width: '100%', border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
              type="text"
              name="shortName"
              value={staff.shortName}
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
            value={staff.email}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Admin</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="boolean"
            name="admin"
            value={staff.admin}
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
            value={staff.birthdate}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Teaching Rate</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="teaching_rate"
            value={staff.teaching_rate}
            onChange={handleChange}
            disabled={disabled}
          />
        </Data>
      </div>
      <div>
        <Label>Active</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="boolean"
            name="active"
            value={staff.active}
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
            value={staff.mobileTelephone}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div >
        <Label>Accent</Label>
        <Data>
          <Dropdown
            onChange={handleAccentDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={accentArr}   
            value={accent}
            disabled={disabled} />
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
      staffById: state.staffReducer.staffById,
      edited: state.staffReducer.edited
  };
};

export default withRouter(
  connect(
      mapStateToProps,
      { getStaffById, editStaffById, resetEdited }
  )(StaffInfoTab)
)