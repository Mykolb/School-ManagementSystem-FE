import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import AdminDashboard from './adminDashboard/components/index';
import ParentDashboard from './parentDashboard/components/index';
import StaffDashboard from './staffDashboard/components/index';

function Index(props) {

  {if (props.user.username === 'admin') {
      return (
        <AdminDashboard />
      )
  } else if (props.user.username === 'Parent Test') {
      return (
        <ParentDashboard />
      )
  } else if (props.user.username === 'staff') {
      return (
        <StaffDashboard />
      )
    } 
  }
}

const mapStateToProps = state => {
  return {
    user: state.authenticationReducer.user,
    logInIsLoading: state.authenticationReducer.logIn.isLoading
  };
};

export default withRouter(connect(
  mapStateToProps,
  {}
)(Index));