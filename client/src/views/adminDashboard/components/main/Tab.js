import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { resetForm } from '../../../../actions/adminDashboardActions/students/studentsActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faMap, faUserFriends} from '@fortawesome/free-solid-svg-icons';

const TabWrap = styled.div`
  width: 100%;
  height: 60px;
  line-height: 60px;
  vertical-alignment: center; 
  // color: #269FB0;
  // color: #B4B1B5;
  color: #89878a;
  margin: 0 0 20px 0;
  font-size: 18px;
`

function Tab(props) {
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (props.tab.key === 'Students') {
      setIcon(faUserGraduate);
    } else if (props.tab.key === 'Courses') {
      setIcon(faMap);
    } else if (props.tab.key === 'Staff') {
      setIcon(faUserFriends);
    }
  }, [])

  const handleClick = (tab) => {
    props.setSelected(tab.toLowerCase())
    props.setNavigation(tab.toLowerCase())
    props.resetForm();
  }
  return (
    <a style={{cursor: "pointer"}} onClick={() => handleClick(props.tab.key)}>
    <TabWrap style={{color: `${props.tab.key.toLowerCase() === props.selected ? "#269FB0" : "#89878a"}`, 
                     display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <FontAwesomeIcon icon={icon} size='lg' color='gray' style={{marginRight: '10px', 
                       color: `${props.tab.key.toLowerCase() === props.selected ? "#269FB0" : "#89878a"}`,
                       height: '15px', width: '15px'}}/>
      {props.tab.key}
    </TabWrap>
    </a>
  )
}


const mapStateToProps = state => {
  return {
      state: state
  };
};

export default withRouter(
  connect(
      mapStateToProps,
      { resetForm }
  )(Tab)
)