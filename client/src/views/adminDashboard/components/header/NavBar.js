import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../../../assets/Logo.png';
import './navbar.scss';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { logOut } from '../../../../actions/authenticationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function NavBar(props) {
  const [display, setDisplay] = useState('none');

  const logout = () => {
    props.logOut(props.history);
  }

  const pushToHome = () => {
    props.history.push('/');
  }

  const displayDropdown = () => {
    if (display === 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  }

  const removeDropdown = () => {
    setDisplay('none');
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, removeDropdown);

  return (
    <div className="nav-admin">
      <div className="navbar-left">
        <a onClick={pushToHome} className="logo"><img className="logo-image" src={Logo}></img></a>
      </div>
      <div className="navbar-right">
      <div class="dropdown" ref={wrapperRef}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {/* <div style={{marginRight: '10px'}}>Hello, Victoria</div> */}
          <FontAwesomeIcon onClick={displayDropdown} icon={faUserCircle} size='lg' color='gray' style={{marginRight: '20px', width: '50px', height: '50px', color: '#b1afb1'}}/> 
        </div>
        <div id="myDropdown" class="dropdown-content" style={{display: display}} >
          <a onClick={logout}>Sign out</a>
        </div>
      </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default withRouter(connect(
  mapStateToProps,
  { logOut }
)(NavBar));


/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, removeDropdown) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      removeDropdown();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
