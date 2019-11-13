import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createNewCourse } from '../../../../../actions/adminDashboardActions/courses/courseAction';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
// import './StudentTable.css';
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


function CourseRegistrationForm(props) {
  const [course, setCourse] = useState({
                                          term_id: '', 
                                          course_type_id: '', 
                                          group_type_id: '', 
                                          school_grade_id: '', 
                                          level_id: '', 
                                          section: '', 
                                          subsection: '', 
                                          hourly_rate: '',
                                          course_schedule_id: '', 
                                          room_id: '', 
                                          start_time: '', 
                                          end_time: '', 
                                          teacher_id: '', 
                                          notes: '', 
                                          status: '', 
                                          textbook: '' //should be added but it's not yet added into db
                                        });

 
  // set arrays of foreign key values to use in the dropdown (except 'statusArr' array it's not a foreign key)
  const [term, setTerm] = useState(props.termList[0])
  const [courseType, setCourseType] = useState(props.courseTypeList[0]);
  const [groupType, setGroupType] = useState(props.groupTypeList[0]);
  const [schoolGrade, setSchoolGrade] = useState(props.schoolGradeList[0]);
  const [level, setLevel] = useState(props.levelList[0]);
  const [courseSchedule, setCourseSchedule] = useState(props.courseScheduleList[0]);
  const [room, setRoom] = useState(props.roomList[0]);
  const statusArr = ['select', 'active', 'waitlist', 'completed', 'cancelled'];
  const [status, setStatus] = useState(statusArr[0]);
  const [teacher, setTeacher] = useState(props.teacherList[0]);

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
    setCourse({ ...course, [event.target.name]: event.target.value });
  }   

  function handleSubmit(event) {
    event.preventDefault();

    // check for required fields
    if (course.term_id === '' || course.course_type_id === '' || 
        course.group_type_id === '' || course.school_grade_id === '' ||
        course.level_id === '' || course.section === '' || 
        course.subsection === '' || course.hourly_rate === '' ||
        course.course_schedule_id === '' || course.room_id === '' || 
        course.start_time === '' || course.end_time === '' ||
        course.teacher_id === '' || course.notes === '' || course.status === '') 
      { 
        // highlight all that were missed
        if (course.term_id === '') {
          setErrorBorderCpr('#ef6570');
        } 
        if (course.course_type_id === '') {
          setErrorBorderFirstName('#ef6570');
        } 
        if (course.group_type_id === '') {
          setErrorBorderAdditionalNames('#ef6570');
        }
        if (course.school_grade_id === '') {
          setErrorBorderGender('#ef6570');
        }
        if (course.level_id === '') {
          setErrorBorderBirthdate('#ef6570');
        }
        if (course.section === '') {
          setErrorBorderSchoolGrade('#ef6570');
        }
        if (course.subsection === '') {
          setErrorBorderSchoolName('#ef6570');
        }
        if (course.hourly_rate === '') {
          setErrorBorderHomeTelephone('#ef6570');
        }
        if (course.course_schedule_id === '') {
          setErrorBorderMobileTelephone('#ef6570');
        }
        if (course.room_id === '') {
          setErrorBorderBlock('#ef6570');
        }
        if (course.start_time === '') {
          setErrorBorderRoad('#ef6570');
        }
        if (course.end_time === '') {
          setErrorBorderBuilding('#ef6570');
        }
        if (course.teacher_id === '') {
          setErrorBorderFlat('#ef6570');
        }
        if (course.notes === '') {
          setErrorBorderEmail('#ef6570');
        }
        if (course.status === '') {
          setErrorBorderNotes('#ef6570');
        }
    
    } else {

        const newCourse = {
          term_id: course.term_id, 
          course_type_id: course.course_type_id, 
          group_type_id: course.group_type_id, 
          school_grade_id: course.school_grade_id, 
          level_id: course.level_id, 
          section: course.section, 
          subsection: course.subsection, 
          hourly_rate: course.hourly_rate,
          course_schedule_id: course.course_schedule_id, 
          room_id: course.room_id, 
          start_time: course.start_time, 
          end_time: course.end_time, 
          teacher_id: course.teacher_id, 
          notes: course.notes, 
          status: course.status
        }

        props.createNewCourse(newCourse, props.setNewRecord, props.newRecord, 
                              props.displaySuccessMessageTimeout, props.setSavePrevState);

        // reset form fields
        setCourse({
                    term_id: '', 
                    course_type_id: '', 
                    group_type_id: '', 
                    school_grade_id: '', 
                    level_id: '', 
                    section: '', 
                    subsection: '', 
                    hourly_rate: '',
                    course_schedule_id: '', 
                    room_id: '', 
                    start_time: '', 
                    end_time: '', 
                    teacher_id: '', 
                    notes: '', 
                    status: ''
                   });

        // hide the form by reusing the cancel button method
        props.handleCancelButtonOnForm();
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    props.handleCancelButtonOnForm();
  }                                     

  function handleTermDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.termList.length; i++) {
      if (props.termList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, term_id: props.termIdLookup[e.value]});
    setTerm(props.termList[index]); 
  }
  
  function handleCourseTypeDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.courseTypeList.length; i++) {
      if (props.courseTypeList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, course_type_id: props.courseTypeIdLookup[e.value]});
    setCourseType(props.courseTypeList[index]);
  }

  function handleGroupTypeDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.groupTypeList.length; i++) {
      if (props.groupTypeList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, group_type_id: props.groupTypeIdLookup[e.value]});
    setGroupType(props.groupTypeList[index]);
  }

  function handleSchoolGradeDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.schoolGradeList.length; i++) {
      if (props.schoolGradeList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, school_grade_id: props.schoolGradeIdLookup[e.value]});
    setSchoolGrade(props.schoolGradeList[index]);
  }

  function handleLevelDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.levelList.length; i++) {
      if (props.levelList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, level_id: props.levelListIdLookup[e.value]});
    setLevel(props.levelList[index]);
  }

  function handleCourseScheduleDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.courseScheduleList.length; i++) {
      if (props.courseScheduleList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, course_schedule_id: props.courseScheduleIdLookup[e.value]});
    setCourseSchedule(props.courseScheduleList[index]);
  }

  function handleRoomDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.roomList.length; i++) {
      if (props.roomList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, room_id: props.roomIdLookup[e.value]});
    setRoom(props.roomList[index]);
  }

  function handleStatusDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < statusArr.length; i++) {
      if (statusArr[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, status: e.value});
    setStatus(statusArr[index]); 
  }

  function handleTeacherDropdown(e) {
    //reassign the dropdown value to the one selected
    let index;
    for (let i = 0; i < props.teacherList.length; i++) {
      if (props.teacherList[i] === e.value) {
        index = i;
      }
    }
    setCourse({...course, teacher_id: props.teacherIdLookup[e.value]});
    setTeacher(props.teacherList[index]);
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
                <label>Term</label>
                <div style={{border: `1px solid ${errorBorderCpr}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleTermDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.termList}   
                    value={term}/>
                </div>
              </div>
              <div>
                <label>Course Type</label>
                <div style={{border: `1px solid ${errorBorderFirstName}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleCourseTypeDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.courseTypeList}   
                    value={courseType}/>
                </div>
              </div>
              <div>
                <label>Group Type </label>
                <div style={{border: `1px solid ${errorBorderAdditionalNames}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleGroupTypeDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.groupTypeList}   
                    value={groupType}/>
                </div>
              </div>
              <div>
                <label>School Grade</label>
                <div style={{border: `1px solid ${errorBorderGender}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleSchoolGradeDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.schoolGradeList}   
                    value={schoolGrade}/>
                </div>
              </div>
              <div>
                <label>Level</label>
                <div style={{border: `1px solid ${errorBorderEmail}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleLevelDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.levelList}   
                    value={level}/>
                </div>
              </div>
              <div>
                <label>Section</label>
                <div style={{border: `1px solid ${errorBorderSchoolName}`, borderRadius: '3px'}}>
                  <Input 
                    type="text"
                    name="section"
                    value={course.section}
                    onChange={handleChange}/>
                </div>
              </div>
              <div >
                <label>Subsection</label>
                <div style={{border: `1px solid ${errorBorderBirthdate}`, borderRadius: '3px'}}>
                  <Input 
                    type='text' 
                    name="subsection"
                    value={course.subsection}
                    onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>Hourly Rate</label>
                <div style={{border: `1px solid ${errorBorderLocation}`, borderRadius: '3px'}}>
                  <Input 
                    type='text' 
                    name="hourly_rate"
                    value={course.hourly_rate}
                    onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>Course Schedule</label>
                <div style={{border: `1px solid ${errorBorderHomeTelephone}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleCourseScheduleDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.courseScheduleList}   
                    value={courseSchedule}/>
                </div>
              </div>
              <div>
                <label>Teacher</label>
                <div style={{border: `1px solid ${errorBorderMobileTelephone}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleTeacherDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.teacherList}   
                    value={teacher}/>
                </div>
              </div>
              <div>
                <label>Room</label>
                <div style={{border: `1px solid ${errorBorderContactType}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleRoomDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={props.roomList}   
                    value={room}/>
                </div>
              </div>
              <div>
                <label>Start Time</label>
                <div style={{border: `1px solid ${errorBorderBlock}`, borderRadius: '3px'}}>
                  <Input 
                    type="time"
                    name="start_time"
                    value={course.start_time}
                    onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>End Time</label>
                <div style={{border: `1px solid ${errorBorderRoad}`, borderRadius: '3px'}}>
                  <Input 
                    type="time"
                    name="end_time"
                    value={course.end_time}
                    onChange={handleChange}/>
                </div>
              </div>
              <div>
                <label>Status</label>
                <div style={{border: `1px solid ${errorBorderBuilding}`, borderRadius: '3px'}}>
                  <Dropdown
                    onChange={handleStatusDropdown} 
                    controlClassName='myControlClassName'
                    className='dropdownRoot' 
                    menuClassName='myMenuClassName'
                    options={statusArr}   
                    value={status}/>
                </div>
              </div>
              <div style={{gridColumn: 'span 4'}}>
                <label>Notes</label>
                <div style={{border: `1px solid ${errorBorderFlat}`, borderRadius: '3px'}}>
                  <textarea 
                    style={{width: '100%', height: '80px', outline: 'none', 
                            border: '1px solid transparent', borderRadius: '3px', 
                            fontSize: '14px', fontWeight: '400', marginLeft: '-2px'}}
                    type="text"
                    name="notes"
                    value={course.notes}
                    onChange={handleChange}/>
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
    courseById: state.coursesReducer.courseById,
    termList: state.coursesReducer.termList,
    termIdLookup: state.coursesReducer.termIdLookup,
    courseTypeList: state.coursesReducer.courseTypeList,
    courseTypeIdLookup: state.coursesReducer.courseTypeIdLookup,
    groupTypeList: state.coursesReducer.groupTypeList,
    groupTypeIdLookup: state.coursesReducer.groupTypeIdLookup,
    schoolGradeList: state.coursesReducer.schoolGradeList,
    schoolGradeIdLookup: state.coursesReducer.schoolGradeIdLookup,
    levelList: state.coursesReducer.levelList,
    levelListIdLookup: state.coursesReducer.levelListIdLookup,
    courseScheduleList: state.coursesReducer.courseScheduleList,
    courseScheduleIdLookup: state.coursesReducer.courseScheduleIdLookup,
    roomList: state.coursesReducer.roomList,
    roomIdLookup: state.coursesReducer.roomIdLookup,
    teacherList: state.coursesReducer.teacherList,
    teacherIdLookup: state.coursesReducer.teacherIdLookup
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { createNewCourse }
)(CourseRegistrationForm)
);