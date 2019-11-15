import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourseById, resetForm } 
       from '../../../../../actions/adminDashboardActions/courses/courseAction';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import { courseCardTabs } from '../../../../../data';
import DisplayContent from './DisplayContent';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-dropdown/style.css'


const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-self: flex-start;
  
`

const TitleWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 60px;
`

const TabsWrap = styled.div`
  display: flex;
  flex-direction: flex-start;
`

const DisplayWrap = styled.div`
  display: flex;
`

const CourseCard = props => {
  const [navigation, setNavigation] = useState('Course Information');
  const [selected, setSelected] = useState(navigation);
  const [resetForm, setResetForm] = useState(false);
  const [displayTerm, setDisplayTerm] = useState('');
  const [displayLevel, setDisplayLevel] = useState('');
  const [displayTeacher, setDisplayTeacher] = useState('');
  const [displayCourseSchedule, setDisplayCourseSchedule] = useState('');

  
  useEffect(() => {
    props.getCourseById(props.id);

    //display the value of foreign key term
    for (let key in props.termIdLookup) {
      if (props.termIdLookup[key] === props.courseById.term_id) {
        let split = key.split(' ');
        let combine = split.slice(0, 2).join(' ');
        setDisplayTerm(combine);
      }
    }

    for (let key in props.levelListIdLookup) {
      if (props.levelListIdLookup[key] === props.courseById.level_id) {
        setDisplayLevel(key);
      }
    }

    for (let key in props.teacherIdLookup) {
      if (props.teacherIdLookup[key] === props.courseById.teacher_id) {
        setDisplayTeacher(key);
      }
    }

    for (let key in props.courseScheduleIdLookup) {
      if (props.courseScheduleIdLookup[key] === props.courseById.course_schedule_id) {
        setDisplayCourseSchedule(key);
      }
    }
  }, [])

  const goBack = () => {
      props.setCourseId(undefined);
      props.resetForm();
      setResetForm(true);
  }



    return (
        <CardWrap>
            <ButtonWrap onClick={goBack} style={{cursor:"pointer", paddingTop: '20px'}}>
                <FontAwesomeIcon icon={faAngleLeft} size='lg' color='gray' style={{marginRight: '5px'}}/> {''}
                BACK
            </ButtonWrap>
            <TitleWrap>
                <div style={{width: '130px', height: '130px', borderRadius: '50%', background: '#d6d5d6'}}>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', textAlign: 'left'}}>
                  
                  <h1 style={{fontSize: '34px', marginBottom: '0px'}}>{displayLevel}</h1>
                  <div style={{display: 'grid', textAlign: 'center', gridTemplateColumns: '1fr 1fr',
                         gridGap: '10px'}}>
                    <p style={{backgroundColor: '#CDD5E9', padding: '5px 10px 5px 10px', marginBottom: '0px', fontWeight: '500'}}>{displayTerm}</p>
                    <p style={{backgroundColor: '#CDD5E9', padding: '5px 10px 5px 10px', marginBottom: '0px', fontWeight: '500'}}>{displayTeacher}</p>
                  <p style={{backgroundColor: '#CDD5E9', padding: '5px 10px 5px 10px', fontWeight: '500'}}>{displayCourseSchedule}</p>
                  </div>
                </div>
            </TitleWrap>
            <TabsWrap>
              <TabList tabs={courseCardTabs} setNavigation={setNavigation} setSelected={setSelected} 
                       selected={selected} setCourseId={props.setCourseId}/>
            </TabsWrap>
            <DisplayWrap>
              <DisplayContent setNavigation={setNavigation} navigation={navigation} courseData={props.courseById} />
            </DisplayWrap>
        </CardWrap>
        
    )
}



function TabList({tabs, setNavigation, setSelected, selected, setCourseId }) {

  return (
    <div style={{display: 'flex'}}>
      {tabs.map((tab, index) => {
        return <Tab key={index} tab={tab} selected={selected} setNavigation={setNavigation} 
                setSelected={setSelected}  setCourseId={setCourseId}/>
      })}
    </div>
  )
}

function Tab(props) {

  const handleTabClick = () => {
    props.setSelected(props.tab.key);
    props.setNavigation(props.tab.key);
  }
  return (
    <a onClick={handleTabClick} style={{marginRight: '60px', fontSize: '22px', color: '#269FB0', cursor: 'pointer', borderBottom: `${props.selected === props.tab.key ? '2px solid #269FB0' : '2px solid transparent'}`}}>
      {props.tab.key}
    </a>
  )
}

const mapStateToProps = state => {
  return {
      courseById: state.coursesReducer.courseById,
      termIdLookup: state.coursesReducer.termIdLookup,
      levelListIdLookup: state.coursesReducer.levelListIdLookup,
      teacherIdLookup: state.coursesReducer.teacherIdLookup,
      courseScheduleIdLookup: state.coursesReducer.courseScheduleIdLookup
  };
};

export default withRouter(
  connect(
      mapStateToProps,
      { getCourseById, resetForm }
  )(CourseCard)
)