import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createNewStudent } from '../../../../../actions/adminDashboardActions/students/studentsActions';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './StudentTable.css';
import moment from 'moment';
import { Spin } from 'antd';

const FormWrap = styled.form`
  // background: #EDEEEF;
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


function StudentRegistrationForm(props) {
  const [student, setStudent] = useState({cpr: '', registrationDate: '', firstName: '', additionalNames: '', 
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
  const [loading, setLoading] = useState(props.createNewStudentIsLoading);


  useEffect(() => {

  }, [loading])


  function handleChange(event) {
    setStudent({ ...student, [event.target.name]: event.target.value })
  }                                        

  function handleSubmit(event) {
    event.preventDefault();

    // check for required fields
    if (student.cpr === '' || student.firstName === '' || 
        student.additionalNames === '' || student.gender === '' ||
        student.birthdate === '' || student.schoolGradeId === '' || 
        student.schoolName === '' || student.homeTelephone === '' ||
        student.mobileTelephone === '' || student.block === '' || 
        student.road === '' || student.building === '' ||
        student.flat === '' || student.email === '' || 
        student.notes === '' || student.contactTypeId === '' ||
        student.locationId === '') 
      { 
        // highlight all that were missed
        if (student.cpr === '') {
          setErrorBorderCpr('#ef6570');
        } 
        if (student.firstName === '') {
          setErrorBorderFirstName('#ef6570');
        } 
        if (student.additionalNames === '') {
          setErrorBorderAdditionalNames('#ef6570');
        }
        if (student.gender === '') {
          setErrorBorderGender('#ef6570');
        }
        if (student.birthdate === '') {
          setErrorBorderBirthdate('#ef6570');
        }
        if (student.schoolGradeId === '') {
          setErrorBorderSchoolGrade('#ef6570');
        }
        if (student.schoolName === '') {
          setErrorBorderSchoolName('#ef6570');
        }
        if (student.homeTelephone === '') {
          setErrorBorderHomeTelephone('#ef6570');
        }
        if (student.mobileTelephone === '') {
          setErrorBorderMobileTelephone('#ef6570');
        }
        if (student.block === '') {
          setErrorBorderBlock('#ef6570');
        }
        if (student.road === '') {
          setErrorBorderRoad('#ef6570');
        }
        if (student.building === '') {
          setErrorBorderBuilding('#ef6570');
        }
        if (student.flat === '') {
          setErrorBorderFlat('#ef6570');
        }
        if (student.email === '') {
          setErrorBorderEmail('#ef6570');
        }
        if (student.notes === '') {
          setErrorBorderNotes('#ef6570');
        }
        if (student.contactTypeId === '') {
          setErrorBorderContactType('#ef6570');
        }
        if (student.locationId === '') {
          setErrorBorderLocation('#ef6570');
        }
    
    } else {

        const newDate = moment();
        const newDateISOFormat = newDate.toISOString();
        const birthdateDate = moment(student.birthdate).toDate();
        const birthdateISO = birthdateDate.toISOString()

        const newStudent = {
          "cpr": student.cpr.toString(),
          "registration_date": newDateISOFormat,
          "first_name": student.firstName,
          "additional_names": student.additionalNames,
          "gender": student.gender,
          "birthdate": birthdateISO,
          "school_grade_id": student.schoolGradeId,
          "school_name": student.schoolName,
          "home_telephone": student.homeTelephone.toString(),
          "mobile_telephone": student.mobileTelephone.toString(),
          "block_code": parseInt(student.block),
          "road": student.road.toString(),
          "building": student.building.toString(),
          "flat": student.flat.toString(),
          "email": student.email,
          "notes": student.notes,
          "preferred_contact_type_id": student.contactTypeId,
          "no_call": false,
          "delinquent": false,
          "expelled": false,
          "location_id": student.locationId,
        }

        props.createNewStudent(newStudent, props.setNewRecord, props.newRecord, 
                              props.displaySuccessMessageTimeout, props.setSavePrevState);

        // reset form fields
        setStudent({cpr: '', registrationDate: '', firstName: '', additionalNames: '', 
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

  {if (props.createNewStudentIsLoading) {
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
                    value={student.cpr}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>First Name</label>
                <div style={{border: `1px solid ${errorBorderFirstName}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="firstName"
                    value={student.firstName}
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
                    value={student.additionalNames}
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
                    value={student.email}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>School Name</label>
                <div style={{border: `1px solid ${errorBorderSchoolName}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="schoolName"
                    value={student.schoolName}
                    onChange={handleChange} />
                </div>
              </div>
              <div >
                <label>Birth date</label>
                <div style={{border: `1px solid ${errorBorderBirthdate}`, borderRadius: '3px'}}>
                  <Input
                    type="date"
                    name="birthdate"
                    value={student.birthdate}
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
                    value={student.homeTelephone}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Mobile Telephone</label>
                <div style={{border: `1px solid ${errorBorderMobileTelephone}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="mobileTelephone"
                    value={student.mobileTelephone}
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
                    value={student.road}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Building</label>
                <div style={{border: `1px solid ${errorBorderBuilding}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="building"
                    value={student.building}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label>Flat</label>
                <div style={{border: `1px solid ${errorBorderFlat}`, borderRadius: '3px'}}>
                  <Input
                    type="text"
                    name="flat"
                    value={student.flat}
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
                    value={student.notes}
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
              Add student
            </Button>
          </div>
        </FormWrap>
      )

    }
  }
}

const mapStateToProps = state => {
  return {
    locationList: state.studentsReducer.locationList,
    locationIdLookup: state.studentsReducer.locationIdLookup,
    preferredContactMethodList: state.studentsReducer.preferredContactMethodList,
    preferredContactMethodIdLookup: state.studentsReducer.preferredContactMethodIdLookup,
    schoolGradeList: state.studentsReducer.schoolGradeList,
    schoolGradeIdLookup: state.studentsReducer.schoolGradeIdLookup,
    blockList: state.studentsReducer.blockList,
    blockIdLookup: state.studentsReducer.blockIdLookup,
    createNewStudentIsLoading: state.studentsReducer.createNewStudentIsLoading
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { createNewStudent }
)(StudentRegistrationForm)
);