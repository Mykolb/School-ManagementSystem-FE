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
  background: #D1D9DA;
  text-align: center;
  color: white;
`


function StaffRegistrationForm(props) {
  const [staff, setStaff] = useState({cpr: '', registrationDate: '', firstName: '', additionalNames: '', 
                                          gender: '', birthdate: '', schoolGradeId: '', schoolName: '', 
                                          gradeUpdated: '', homeTelephone: '', mobileTelephone: '', 
                                          block: '', road: '', building: '', flat: '', email: '', 
                                          notes: '', contactTypeId: '', noCall: false, delinquent: false,
                                          expelled: false, locationId: ''});

 
  // set arrays of foreign key values to use in the dropdown (except 'gender' array it's not a foreign key)
  const genderArr = ['select', 'F', 'M'];
  const [gender, setGender] = useState(genderArr[0])
  const [location, setLocation] = useState(props.locationList[0]);
  const [contact, setContact] = useState(props.preferredContactMethodList[0]);
  const [schoolGrade, setSchoolGrade] = useState(props.schoolGradeList[0]);
  const [block, setBlock] = useState(props.blockList[0]);

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
    if (staff.cpr === '' || staff.firstName === '' || 
        staff.additionalNames === '' || staff.gender === '' ||
        staff.birthdate === '' || staff.schoolGradeId === '' || 
        staff.schoolName === '' || staff.homeTelephone === '' ||
        staff.mobileTelephone === '' || staff.block === '' || 
        staff.road === '' || staff.building === '' ||
        staff.flat === '' || staff.email === '' || 
        staff.notes === '' || staff.contactTypeId === '' ||
        staff.locationId === '') 
      { 
        // highlight all that were missed
        if (staff.cpr === '') {
          setErrorBorderCpr('#ef6570');
        } 
        if (staff.firstName === '') {
          setErrorBorderFirstName('#ef6570');
        } 
        if (staff.additionalNames === '') {
          setErrorBorderAdditionalNames('#ef6570');
        }
        if (staff.gender === '') {
          setErrorBorderGender('#ef6570');
        }
        if (staff.birthdate === '') {
          setErrorBorderBirthdate('#ef6570');
        }
        if (staff.schoolGradeId === '') {
          setErrorBorderSchoolGrade('#ef6570');
        }
        if (staff.schoolName === '') {
          setErrorBorderSchoolName('#ef6570');
        }
        if (staff.homeTelephone === '') {
          setErrorBorderHomeTelephone('#ef6570');
        }
        if (staff.mobileTelephone === '') {
          setErrorBorderMobileTelephone('#ef6570');
        }
        if (staff.block === '') {
          setErrorBorderBlock('#ef6570');
        }
        if (staff.road === '') {
          setErrorBorderRoad('#ef6570');
        }
        if (staff.building === '') {
          setErrorBorderBuilding('#ef6570');
        }
        if (staff.flat === '') {
          setErrorBorderFlat('#ef6570');
        }
        if (staff.email === '') {
          setErrorBorderEmail('#ef6570');
        }
        if (staff.notes === '') {
          setErrorBorderNotes('#ef6570');
        }
        if (staff.contactTypeId === '') {
          setErrorBorderContactType('#ef6570');
        }
        if (staff.locationId === '') {
          setErrorBorderLocation('#ef6570');
        }
    
    } else {

        const newDate = moment();
        const newDateISOFormat = newDate.toISOString();
        const birthdateDate = moment(staff.birthdate).toDate();
        const birthdateISO = birthdateDate.toISOString()

        const newStaff = {
          "cpr": staff.cpr.toString(),
          "registration_date": newDateISOFormat,
          "first_name": staff.firstName,
          "additional_names": staff.additionalNames,
          "gender": staff.gender,
          "birthdate": birthdateISO,
          "school_grade_id": staff.schoolGradeId,
          "school_name": staff.schoolName,
          "home_telephone": staff.homeTelephone.toString(),
          "mobile_telephone": staff.mobileTelephone.toString(),
          "block_code": parseInt(staff.block),
          "road": staff.road.toString(),
          "building": staff.building.toString(),
          "flat": staff.flat.toString(),
          "email": staff.email,
          "notes": staff.notes,
          "preferred_contact_type_id": staff.contactTypeId,
          "no_call": false,
          "delinquent": false,
          "expelled": false,
          "location_id": staff.locationId,
        }

        props.createNewStaff(newStaff, props.setNewRecord, props.newRecord, 
                              props.displaySuccessMessageTimeout, props.setSavePrevState);

        // reset form fields
        setStaff({cpr: '', registrationDate: '', firstName: '', additionalNames: '', 
                    gender: '', birthdate: '', schoolGradeId: '', schoolName: '', 
                    gradeUpdated: '', homeTelephone: '', mobileTelephone: '', 
                    block: '', road: '', building: '', flat: '', email: '', 
                    notes: '', contactTypeId: '', noCall: false, delinquent: false,
                    expelled: false, locationId: ''
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
  
  function handleLocationDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.locationList.length; i++) {
      if (props.locationList[i] === e.value) {
        index = i;
      }
    }
    setStaff({...staff, locationId: props.locationIdLookup[e.value]});
    setLocation(props.locationList[index]);
    console.log('LOCATION DROPDOWN: ', props.locationIdLookup[e.value], props.locationIdLookup)
  }

  function handleContactMethodDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.preferredContactMethodList.length; i++) {
      if (props.preferredContactMethodList[i] === e.value) {
        index = i;
      }
    }
    setStaff({...staff, contactTypeId: props.preferredContactMethodIdLookup[e.value]});
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
    setStaff({...staff, schoolGradeId: props.schoolGradeIdLookup[e.value]});
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
    setStaff({...staff, block: props.blockIdLookup[e.value]});
    setBlock(props.blockList[index]);
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
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>First Name</label>
                <div style={{border: `1px solid ${errorBorderFirstName}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="firstName"
                    value={staff.firstName}
                    onChange={handleChange} />
                </div>
              </div>
              <div style={{gridColumn: 'span 2'}}>
                <label>Additional names</label>
                <div style={{border: `1px solid ${errorBorderAdditionalNames}`, borderRadius: '3px'}}>
                  <Input 
                    style={{width: '100%'}}
                    type="text"
                    name="additionalNames"
                    value={staff.additionalNames}
                    onChange={handleChange} />
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
                <label>School Name</label>
                <div style={{border: `1px solid ${errorBorderSchoolName}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="schoolName"
                    value={staff.schoolName}
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
                <label>Location</label>
                <div style={{border: `1px solid ${errorBorderLocation}`, borderRadius: '3px'}}>
                  <Dropdown 
                    onChange={handleLocationDropdown} 
                    value={location} 
                    controlClassName='myControlClassName' 
                    className='dropdownRoot' 
                    options={props.locationList} />
                </div>
              </div>
              <div>
                <label>Home Telephone</label>
                <div style={{border: `1px solid ${errorBorderHomeTelephone}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="homeTelephone"
                    value={staff.homeTelephone}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Mobile Telephone</label>
                <div style={{border: `1px solid ${errorBorderMobileTelephone}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="mobileTelephone"
                    value={staff.mobileTelephone}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Preferred contact method</label>
                <div style={{border: `1px solid ${errorBorderContactType}`, borderRadius: '3px'}}>
                  <Dropdown 
                    onChange={handleContactMethodDropdown} 
                    value={contact} 
                    controlClassName='myControlClassName' 
                    className='dropdownRoot' 
                    options={props.preferredContactMethodList} />
                </div>
              </div>
              <div>
                <label>Block</label>
                <div style={{border: `1px solid ${errorBorderBlock}`, borderRadius: '3px'}}>
                  <Dropdown 
                    onChange={handleBlockDropdown} 
                    controlClassName='myControlClassName' 
                    className='dropdownRoot' 
                    options={props.blockList}   
                    value={block} />
                </div>
              </div>
              <div>
                <label>Road</label>
                <div style={{border: `1px solid ${errorBorderRoad}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="road"
                    value={staff.road}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Building</label>
                <div style={{border: `1px solid ${errorBorderBuilding}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="building"
                    value={staff.building}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Flat</label>
                <div style={{border: `1px solid ${errorBorderFlat}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="flat"
                    value={staff.flat}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>School grade</label>
                <div style={{border: `1px solid ${errorBorderSchoolGrade}`, borderRadius: '3px'}}>
                  <Dropdown 
                    onChange={handleSchoolGradeDropdown} 
                    value={schoolGrade} 
                    controlClassName='myControlClassName' 
                    className='dropdownRoot' 
                    options={props.schoolGradeList} />
                </div>
              </div>
              <div style={{gridColumn: 'span 4'}}>
                <label>Notes</label>
                <div style={{border: `1px solid ${errorBorderNotes}`, borderRadius: '3px'}}>
                  <textarea 
                    style={{width: '100%', height: '80px', outline: 'none', 
                            border: '1px solid transparent', borderRadius: '3px'}}
                    type="text"
                    name="notes"
                    value={staff.notes}
                    onChange={handleChange} />
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