import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourseById, resetEdited, editCourseById } 
       from '../../../../../actions/adminDashboardActions/courses/courseAction';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Dropdown from 'react-dropdown'
import './CourseInfoTab.css';
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

function CourseInfoTab(props) {
  const [course, setCourse] = useState({
                                          term_id: props.courseById.term_id, 
                                          course_type_id: props.courseById.course_type_id, 
                                          group_type_id: props.courseById.group_type_id, 
                                          school_grade_id: props.courseById.school_grade_id, 
                                          level_id: props.courseById.level_id, 
                                          section: props.courseById.section, 
                                          subsection: props.courseById.subsection, 
                                          hourly_rate: props.courseById.hourly_rate,
                                          course_schedule_id: props.courseById.course_schedule_id, 
                                          room_id: props.courseById.room_id, 
                                          start_time: props.courseById.start_time, 
                                          end_time: props.courseById.end_time, 
                                          teacher_id: props.courseById.teacher_id, 
                                          notes: props.courseById.notes, 
                                          status: props.courseById.status, 
                                          textbook: ''
                                        });
 
  // set arrays of foreign key values to use in the dropdown (except 'gender' array it's not a foreign key)
  // note: arrays exclude 'select' [0] index option when assigned to dropdown since its set as all fields required on registration form submit
  const [term, setTerm] = useState('')
  const [courseType, setCourseType] = useState('');
  const [groupType, setGroupType] = useState('');
  const [schoolGrade, setSchoolGrade] = useState('');
  const [level, setLevel] = useState('');
  const [courseSchedule, setCourseSchedule] = useState('');
  const [room, setRoom] = useState('');
  const statusArr = ['active', 'waitlist', 'completed', 'cancelled'];
  const [status, setStatus] = useState('');
  const [teacher, setTeacher] = useState('');


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
    // let options = { year: 'numeric', month: 'numeric', day: 'numeric' }; 
    // let birthdate = new Date(props.studentById.birthdate).toLocaleDateString('en-US', options) 
    // let registration_date = new Date(props.studentById.registration_date).toLocaleDateString('en-US', options)
    // let schoolGradeUpdatedDate = new Date(props.studentById.grade_updated).toLocaleDateString('en-US', options)
 
    //display dropdown value based on the incoming data
    for (let i = 0; i < statusArr.length; i++) {
      if (props.courseById.status === statusArr[i]) {
        setStatus(statusArr[i]);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.termIdLookup) {
      if (props.termIdLookup[key] === props.courseById.term_id) {
        setTerm(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.courseTypeIdLookup) {
      if (props.courseTypeIdLookup[key] === props.courseById.course_type_id) {
        setCourseType(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.schoolGradeIdLookup) {
      if (props.schoolGradeIdLookup[key] === props.courseById.school_grade_id) {
        setSchoolGrade(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.groupTypeIdLookup) {
      if (props.groupTypeIdLookup[key] === props.courseById.group_type_id) {
        setGroupType(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.levelListIdLookup) {
      if (props.levelListIdLookup[key] === props.courseById.level_id) {
        setLevel(key);
      }
    }

    console.log('HERE LEVEL: ', props.courseById.level_id, props.levelListIdLookup)

    //display dropdown value based on the incoming data
    for (let key in props.courseScheduleIdLookup) {
      if (props.courseScheduleIdLookup[key] === props.courseById.course_schedule_id) {
        setCourseSchedule(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.teacherIdLookup) {
      if (props.teacherIdLookup[key] === props.courseById.teacher_id) {
        setTeacher(key);
      }
    }

    //display dropdown value based on the incoming data
    for (let key in props.roomIdLookup) {
      if (props.roomIdLookup[key] === props.courseById.room_id) {
        setRoom(key);
      }
    }
 
    setCourse({
      term_id: props.courseById.term_id, 
      course_type_id: props.courseById.course_type_id, 
      group_type_id: props.courseById.group_type_id, 
      school_grade_id: props.courseById.school_grade_id, 
      level_id: props.courseById.level_id, 
      section: props.courseById.section, 
      subsection: props.courseById.subsection, 
      hourly_rate: props.courseById.hourly_rate,
      course_schedule_id: props.courseById.course_schedule_id, 
      room_id: props.courseById.room_id, 
      start_time: props.courseById.start_time, 
      end_time: props.courseById.end_time, 
      teacher_id: props.courseById.teacher_id, 
      notes: props.courseById.notes, 
      status: props.courseById.status, 
      textbook: ''
    })

  }, [cancel, edited])

  const handleEdit = () => {
    if (edit) {
      // const birthdate = moment(student.birthdate).toDate();
      // const birthdateISO = birthdate.toISOString();

      // const schoolGradeUpdated = moment(student.birthdate).toDate();
      // const schoolGradeUpdatedISO = schoolGradeUpdated.toISOString();

      const editCourse  = {
        id: props.courseById.id,
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
        status: course.status, 
      }
      props.editCourseById(props.courseById.id, editCourse);
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
    setCourse({ ...course, [event.target.name]: event.target.value });
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
    setCourse({...course, level_id: props.levelIdLookup[e.value]});
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
  

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div onClick={handleCancel} 
             style={{alignSelf: 'flex-end', marginTop: '5px', 
             marginRight: '40px', cursor: 'pointer', 
             color: '#C73642', display: 'flex', 
             display: `${displayCancelButton}`}}>
          <FontAwesomeIcon icon={faTimesCircle} size='lg' color='#C73642' style={{marginRight: '8px'}}/> {''}
          <div>
            Cancel
          </div>
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
          <Label>Term</Label>
          <Data>
            <Dropdown
              onChange={handleTermDropdown} 
              controlClassName={`myControlClassName editForm${arrowVisibility}`}
              className='dropdownRoot' 
              menuClassName='myMenuClassName dropdown-menu'
              options={props.termList.slice(1)}   
              value={term}
              disabled={disabled} />
          </Data>
        </div>
        <div>
          <Label>Course Type</Label>
          <Data>
            <Dropdown
              onChange={handleCourseTypeDropdown} 
              controlClassName={`myControlClassName editForm${arrowVisibility}`}
              className='dropdownRoot' 
              menuClassName='myMenuClassName dropdown-menu'
              options={props.courseTypeList.slice(1)}   
              value={courseType}
              disabled={disabled} />
          </Data>
        </div>
        <div>
          <Label>Group Type</Label>
          <Data>
            <Dropdown
              onChange={handleGroupTypeDropdown} 
              controlClassName={`myControlClassName editForm${arrowVisibility}`}
              className='dropdownRoot' 
              menuClassName='myMenuClassName dropdown-menu'
              options={props.groupTypeList.slice(1)}   
              value={groupType}
              disabled={disabled} />
          </Data>
        </div>
      <div >
        <Label>School Grade</Label>
        <Data>
          <Dropdown
            onChange={handleSchoolGradeDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.schoolGradeList.slice(1)}   
            value={schoolGrade}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Level</Label>
        <Data>
          <Dropdown
            onChange={handleLevelDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.levelList.slice(1)}   
            value={level}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Section</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="text"
            name="section"
            value={course.section}
            onChange={handleChange}
            disabled={disabled}
          />
        </Data>
      </div>
      <div >
        <Label>Subsection</Label>
        <Data >
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type='text' 
            name="subsection"
            value={course.subsection}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Hourly Rate</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type='text' 
            name="hourly_rate"
            value={course.hourly_rate}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Course Schedule</Label>
        <Data>
          <Dropdown
            onChange={handleCourseScheduleDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.courseScheduleList.slice(1)}   
            value={courseSchedule}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Teacher</Label>
        <Data>
          <Dropdown
            onChange={handleTeacherDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.teacherList.slice(1)}   
            value={teacher}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Room</Label>
        <Data>
          <Dropdown
            onChange={handleRoomDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={props.roomList.slice(1)}   
            value={room}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Start Time</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="time"
            name="start_time"
            value={course.start_time}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>End Time</Label>
        <Data>
          <Input 
            style={{border: `${edit ? '1px solid #dedbdb' : '1px solid transparent'}`}}
            type="time"
            name="end_time"
            value={course.end_time}
            onChange={handleChange}
            disabled={disabled} />
        </Data>
      </div>
      <div>
        <Label>Status</Label>
        <Data>
          <Dropdown
            onChange={handleStatusDropdown} 
            controlClassName={`myControlClassName editForm${arrowVisibility}`}
            className='dropdownRoot' 
            menuClassName='myMenuClassName dropdown-menu'
            options={statusArr}   
            value={status}
            disabled={disabled} />
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
            value={course.notes}
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
      { getCourseById, resetEdited, editCourseById }
  )(CourseInfoTab)
)