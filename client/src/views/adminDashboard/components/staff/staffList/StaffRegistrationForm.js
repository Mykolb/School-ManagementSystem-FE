import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createNewStaff } from '../../../../../actions/adminDashboardActions/staff/staffActions';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './StaffTable.css';
import moment from 'moment';
import { Spin } from 'antd';

const FormWrap = styled.form`
  border: 0px transparant;
  border-radius: 3px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  transition: all 200ms ease;
`

const Input = styled.input`
  outline: none;
  border-radius: 3px;
  border: 1px solid transparent;
  background: white;
  width: 100%;
  height: 26px;
`

const Button = styled.button`
  width: 120px;
  height: 25px;
  border-radius: 3px;
  margin: 10px 5px 10px 10px;
  background: #26ABBD;
  text-align: center;
  color: white;
`


function StaffRegistrationForm(props) {
  const [staff, setStaff] = useState({
                                        cpr: '', 
                                        name: '', 
                                        short_name: '', 
                                        gender: '', 
                                        birthdate: '',    
                                        mobile_number: '',  
                                        email: '', 
                                        admin: '',  
                                        teaching_rate: '',
                                        active: '',
                                        accent: ''
                                      });

 
  // set arrays of foreign key values to use in the dropdown (except 'gender' array it's not a foreign key)
  const genderArr = ['select', 'F', 'M'];
  const [gender, setGender] = useState(genderArr[0]);
  const accentArr = ['North American', 'British', 'Irish', 'Australian', 'Scottish', 'South African',
                     'French/Brit', 'Local', 'Other'];
  const [accent, setAccent] = useState('');

  // handle required fields (make them all required for now)
  const [errorBorderCpr, setErrorBorderCpr] = useState('transparent'); //error #C73642
  const [errorBorderFirstName, setErrorBorderFirstName] = useState('transparent'); //error #C73642
  const [errorBorderAdditionalNames, setErrorBorderAdditionalNames] = useState('transparent'); //error #C73642
  const [errorBorderGender, setErrorBorderGender] = useState('transparent'); //error #C73642
  const [errorBorderBirthdate, setErrorBorderBirthdate] = useState('transparent'); //error #C73642
  const [errorBorderSchoolGrade, setErrorBorderSchoolGrade] = useState('transparent'); //error #C73642
  const [errorBorderSchoolName, setErrorBorderSchoolName] = useState('transparent'); //error #C73642
  const [errorBorderHomeTelephone, setErrorBorderHomeTelephone] = useState('transparent'); //error #C73642
  const [errorBorderMobileTelephone, setErrorBorderMobileTelephone] = useState('transparent'); //error #C73642
  const [errorBorderBlock, setErrorBorderBlock] = useState('transparent'); //error #C73642
  const [errorBorderRoad, setErrorBorderRoad] = useState('transparent'); //error #C73642
  const [errorBorderBuilding, setErrorBorderBuilding] = useState('transparent'); //error #C73642
  const [errorBorderFlat, setErrorBorderFlat] = useState('transparent'); //error #C73642
  const [errorBorderEmail, setErrorBorderEmail] = useState('transparent'); //error #C73642
  const [errorBorderNotes, setErrorBorderNotes] = useState('transparent'); //error #C73642
  const [errorBorderContactType, setErrorBorderContactType] = useState('transparent'); //error #C73642
  const [errorBorderLocation, setErrorBorderLocation] = useState('transparent'); //error #C73642

  // display a spinner on isLoading when posting a new record
  const [loading, setLoading] = useState(props.createNewStaffIsLoading);


  useEffect(() => {

  }, [loading])


  function handleChange(event) {
    setStaff({ ...staff, [event.target.name]: event.target.value })
  }                                        

  function handleSubmit(event) {
    event.preventDefault();

    // check for required fields
    if (staff.cpr === '' || staff.name === '' || 
        staff.short_name === '' || staff.gender === '' ||
        staff.birthdate === '' || staff.mobile_number === '' || 
        staff.email === '' || staff.notes === '' ||
        staff.admin === '' || staff.teaching_rate === '' || 
        staff.active === '' || staff.accent === '') 
      { 
        // highlight all that were missed
        if (staff.cpr === '') {
          setErrorBorderCpr('#ef6570');
        } 
        if (staff.name === '') {
          setErrorBorderFirstName('#ef6570');
        } 
        if (staff.short_name === '') {
          setErrorBorderAdditionalNames('#ef6570');
        }
        if (staff.gender === '') {
          setErrorBorderGender('#ef6570');
        }
        if (staff.birthdate === '') {
          setErrorBorderBirthdate('#ef6570');
        }
        if (staff.mobile_number === '') {
          setErrorBorderSchoolGrade('#ef6570');
        }
        if (staff.email === '') {
          setErrorBorderSchoolName('#ef6570');
        }
        if (staff.notes === '') {
          setErrorBorderHomeTelephone('#ef6570');
        }
        if (staff.admin === '') {
          setErrorBorderMobileTelephone('#ef6570');
        }
        if (staff.teaching_rate === '') {
          setErrorBorderBlock('#ef6570');
        }
        if (staff.active === '') {
          setErrorBorderRoad('#ef6570');
        }
        if (staff.accent === '') {
          setErrorBorderRoad('#ef6570');
        }
    } else {

        const birthdateDate = moment(staff.birthdate).toDate();
        const birthdateISO = birthdateDate.toISOString();

        const newStaff = {
          "cpr": staff.cpr.toString(),
          "name": staff.name,
          "short_name": staff.short_name,
          "gender": staff.gender,
          "birthdate": birthdateISO,
          "mobile_number": staff.mobile_number.toString(),
          "email": staff.email,
          "admin": staff.admin,
          "teaching_rate": staff.teaching_rate.toString(),
          "active": staff.active,
          "accent": staff.accent
        }

        props.createNewStaff(newStaff, props.setNewRecord, props.newRecord, 
                              props.displaySuccessMessageTimeout, props.setSavePrevState);

        // reset form fields
        setStaff({
                  cpr: '', 
                  name: '', 
                  short_name: '', 
                  gender: '', 
                  birthdate: '',    
                  mobile_number: '',  
                  email: '', 
                  admin: '',  
                  teaching_rate: '',
                  active: '',
                  accent: ''
                });

        // hide the form by reusing the cancel button method
        props.handleCancelButtonOnForm();
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    props.handleCancelButtonOnForm();
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

  {if (props.createNewStaffIsLoading) {
    return <Spin style={{marginTop: '90px'}}size="large" />
  } else {
      return (
        <FormWrap onSubmit={handleSubmit} style={{margin: '30px 10px 20px 10px'}}>
          <fieldset style={{border: '1px solid transparent', margin: '10px 5px 0px 5px',  background: '#E0EBF0'}}>
            <div style={{display: 'grid', textAlign: 'left', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                         gridGap: '15px', margin: '10px'}}>
              <div >
                <label>CPR</label>
                <div style={{border: `1px solid ${errorBorderCpr}`, borderRadius: '3px'}}>
                <Input 
                  type="text"
                  name="cpr"
                  value={staff.cpr}
                  onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>First Name</label>
                <div style={{border: `1px solid ${errorBorderFirstName}`, borderRadius: '3px'}}>
                <Input 
                  type="text"
                  name="name"
                  value={staff.name}
                  onChange={handleChange}/>
                </div>
              </div>
              <div style={{gridColumn: 'span 2'}}>
                <label>Short Name</label>
                <div style={{border: `1px solid ${errorBorderAdditionalNames}`, borderRadius: '3px'}}>
                <Input 
                  type="text"
                  name="short_name"
                  value={staff.shortName}
                  onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div style={{border: `1px solid ${errorBorderGender}`, borderRadius: '3px'}}>
                  <Dropdown 
                    onChange={handleGenderDropdown} 
                    controlClassName='myControlClassName' 
                    className='dropdownRoot' 
                    options={genderArr}   
                    value={gender} />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div style={{border: `1px solid ${errorBorderEmail}`, borderRadius: '3px'}}>
                  <Input
                    type="email"
                    name="email"
                    value={staff.email}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Admin</label>
                <div style={{border: `1px solid ${errorBorderSchoolName}`, borderRadius: '3px'}}>
                  <Input 
                    type="boolean"
                    name="admin"
                    value={staff.admin}
                    onChange={handleChange} />
                </div>
              </div>
              <div >
                <label>Birth date</label>
                <div style={{border: `1px solid ${errorBorderBirthdate}`, borderRadius: '3px'}}>
                  <Input
                    type="date"
                    name="birthdate"
                    value={staff.birthdate}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Teaching Rate</label>
                <div style={{border: `1px solid ${errorBorderLocation}`, borderRadius: '3px'}}>
                <Input 
                  type="text"
                  name="teaching_rate"
                  value={staff.teaching_rate}
                  onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>Active</label>
                <div style={{border: `1px solid ${errorBorderHomeTelephone}`, borderRadius: '3px'}}>
                  <Input 
                    type="boolean"
                    name="active"
                    value={staff.active}
                    onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>Mobile Telephone</label>
                <div style={{border: `1px solid ${errorBorderMobileTelephone}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="mobile_number"
                    value={staff.mobileTelephone}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Accent</label>
                <div style={{border: `1px solid ${errorBorderGender}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleAccentDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={accentArr}   
                    value={accent}/>
                </div>
              </div>
            </div>
          </fieldset>
          <div style={{alignSelf: 'flex-end'}}>
            <Button onClick={handleCancel} style={{background: '#C73642', width: '80px'}}>
              Cancel
            </Button>
            <Button type="submit">
              Add staff
            </Button>
          </div>
        </FormWrap>
      )

    }
  }
}

const mapStateToProps = state => {
  return {
    locationList: state.staffReducer.locationList,
    locationIdLookup: state.staffReducer.locationIdLookup,
    preferredContactMethodList: state.staffReducer.preferredContactMethodList,
    preferredContactMethodIdLookup: state.staffReducer.preferredContactMethodIdLookup,
    schoolGradeList: state.staffReducer.schoolGradeList,
    schoolGradeIdLookup: state.staffReducer.schoolGradeIdLookup,
    blockList: state.staffReducer.blockList,
    blockIdLookup: state.staffReducer.blockIdLookup,
    createNewStaffIsLoading: state.staffReducer.createNewStaffIsLoading
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { createNewStaff }
)(StaffRegistrationForm)
);