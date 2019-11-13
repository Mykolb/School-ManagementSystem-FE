import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/Logo.png';
import './navbar.scss';
import { withRouter } from "react-router";
import { resetNav } from '../../../../actions/landingPageActions/landingPageActions';
import { connect } from 'react-redux';

function NavBar(props) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {

  }, [selected])

  const handleLogo = () => {
    props.history.push('/')
    setSelected(false);
  }

  const signIn = () => {
    props.history.push('/login');
  }

  const handleCourse = () => {
    //handle reset when the 'course' is clicked while inner tab is selected
    if (selected === 'course') {
      props.resetNav(true);
    } else {
      setSelected('course');
    }
  }

  const handleRegistration = () => {
    setSelected('registration');
  }

  const handleAbout = () => {
    setSelected('about');
  }

  const handleContact = () => {
    setSelected('contact');
  }

  return (
    <div className="nav">
      <div className="navbar-left">
        <a onClick={handleLogo} className="logo"><img className="logo-image" src={Logo}></img></a>
      </div>
      <div className="navbar-right">
        <Link to='/course-structure' onClick={handleCourse} style={{borderBottom: `${selected === 'course' ? '2px solid #C73642' : '2px solid transparent'}`}}>Course Structure</Link>
        <Link to='/registration-information' onClick={handleRegistration} style={{borderBottom: `${selected === 'registration' ? '2px solid #C73642' : '2px solid transparent'}`}}>Registration Information</Link>
        <Link to='/about-us' onClick={handleAbout} style={{borderBottom: `${selected === 'about' ? '2px solid #C73642' : '2px solid transparent'}`}}>About Us</Link>
        <Link to='/contact-us' onClick={handleContact} style={{borderBottom: `${selected === 'contact' ? '2px solid #C73642' : '2px solid transparent'}`}}>Contact Us</Link>
        <button onClick={signIn}>Sign In</button>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    reset: state.landingPageReducer.reset
  };
};

export default withRouter(
  connect(
      mapStateToProps,
      { resetNav }
  )(NavBar)
)