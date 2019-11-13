import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourseById, resetForm } 
       from '../../../../../actions/adminDashboardActions/courses/courseAction';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
// import './StudentCard.css';
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

  
  useEffect(() => {
    props.getCourseById(props.id)  
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
                  <h1 style={{fontSize: '34px', marginBottom: '0px'}}>{props.courseById.level}</h1>
                  <p>TERM: {props.courseById.term}</p>
                  <p>Course ID: {props.courseById.id}</p>
                </div>
            </TitleWrap>
            <TabsWrap>
              <TabList tabs={courseCardTabs} setNavigation={setNavigation} setSelected={setSelected} 
                       selected={selected} setCourseId={props.setCourseId}/>
            </TabsWrap>
            <DisplayWrap>
              <DisplayContent navigation={navigation} courseData={props.courseById} />
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
      // cardIsLoading: state.courseReducer.cardIsLoading,
      courseById: state.coursesReducer.courseById,
      // cardIsEditing: state.courseReducer.cardIsEditting,
      // resetForm: state.courseReducer.resetForm,
  };
};

export default withRouter(
  connect(
      mapStateToProps,
      { getCourseById, resetForm }
  )(CourseCard)
)