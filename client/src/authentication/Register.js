import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { familyRegister } from "../actions/registrationActions";
import Dropdown from "react-dropdown";
import "./register.scss";
import { callbackify } from "util";
import { toggle } from "../actions/landingPageActions/landingPageActions";



function Register(props) {
  const [step, setStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");

  const locationArr = ["Select Location", "Bani Jamra", "Hamad Town"];
  const [location, setLocation] = useState(locationArr[0]);

  
  useEffect(() => {
    props.toggle();
  }, [props.success])

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    user_type: "parent"
  });

  const [family, setFamily] = useState({
    father_name: "",
    mother_name: "",
    primary_telephone: "",
    secondary_telephone: ""
  });

  const [student, setStudent] = useState({
    first_name: "",
    additional_names: "",
    cpr: "",
    email: "",
    birthdate: "",
    location_id: ""
  });

  function handleLocationDropdown(e) {
    let index;
    for (let i = 0; i < locationArr.length; i++) {
      if (locationArr[i] === e.value) {
        index = i;
      }
    }
    setStudent({ ...student, location_id: index });
    setLocation(locationArr[index]);
  }

  const handleUserChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFamilyChange = e => {
    setFamily({ ...family, [e.target.name]: e.target.value });
  };

  const handleStudentChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const nextStep = e => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = e => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.familyRegister(
      { user: user, family: family, student: student },
      props.history
    );
    console.log("REG OBJECT: ", {
      user: user,
      family: family,
      student: student
    });
  };

  {if (!props.success) {

  return (
    <div className="parent-reg">
      <div className="top-section">
        <div className="top-left">
          <h1>Register With Speak Out</h1>
          <p>How to Register with Speak Out</p>
          <p>
            1. Enter your information
            <br />
            2. Enter student information
            <br />
            3. Review &amp; Submit Registration
          </p>
          <p className="top-left-end">
            After submitting registration, you will choose <br />
            options for the student placement test(s).
          </p>
        </div>
        <div className="top-right">
          <h4>Register in Person</h4>
          <div className="contact-container">
            <div className="address">
              <p className="contact-first">Address</p>
              <p className="contact-second">
                Rd No 3949, Bani Jamra, Bahrain
                <br />
                6F66+65 Bani Jamra, Bahrain
              </p>
            </div>
            <div className="telephone">
              <p className="contact-first">Telephone</p>
              <p className="contact-second">+973 3561 7635</p>
            </div>
            <button>Schedule Appointment</button>
          </div>
        </div>
      </div>
      <div className="horiz-line" />
      <div className="progress-bar">
        <div className="circles">
          <div className={step >= 1 ? "active-register" : ""}>
            {step >= 1 ? "✔" : ""}
          </div>
          <div className={step >= 2 ? "active-register" : ""}>
            {step >= 2 ? "✔" : ""}
          </div>
          <div className={step >= 3 ? "active-register" : ""}>
            {step >= 3 ? "✔" : ""}
          </div>
        </div>
        <div className="circle-labels">
          <p>Your Information</p>
          <p>Student Information</p>
          <p>Submit Registration</p>
        </div>
      </div>
      <div className="reg-form">
        {step === 1 && <h4>Your Information</h4>}
        {step === 2 && <h4>Student Information</h4>}

        <form>
          {step === 1 && (
            <fieldset>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleUserChange}
              />
              <input
                type="text"
                name="father_name"
                placeholder="Father's Name"
                value={family.father_name}
                onChange={handleFamilyChange}
              />
              <input
                type="text"
                name="mother_name"
                placeholder="Mother's Name"
                value={family.mother_name}
                onChange={handleFamilyChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleUserChange}
              />
              <input
                type="text"
                name="primary_telephone"
                placeholder="Primary Telephone"
                value={family.primary_telephone}
                onChange={handleFamilyChange}
              />
              <input
                type="text"
                name="secondary_telephone"
                placeholder="Secondary Telephone"
                value={family.secondary_telephone}
                onChange={handleFamilyChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleUserChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handlePasswordChange}
              />
            </fieldset>
          )}
          {step === 2 && (
            <fieldset>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={student.first_name}
                onChange={handleStudentChange}
              />
              <input
                type="text"
                name="additional_names"
                placeholder="Surname"
                value={student.additional_names}
                onChange={handleStudentChange}
              />
              <input
                type="text"
                name="cpr"
                placeholder="Student CPR ID"
                value={student.cpr}
                onChange={handleStudentChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleStudentChange}
              />
              <input
                type="date"
                name="birthdate"
                placeholder="Student Birthday"
                value={student.birthdate}
                onChange={handleStudentChange}
              />
              <Dropdown
                onChange={handleLocationDropdown}
                controlClassName="myControlClassName"
                className="dropdownRoot"
                options={locationArr}
                value={location}
              />
            </fieldset>
          )}
          {step === 3 && (
            <fieldset>
              <h4>Your Information</h4>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleUserChange}
              />
              <input
                type="text"
                name="father_name"
                placeholder="Father's Name"
                value={family.father_name}
                onChange={handleFamilyChange}
              />
              <input
                type="text"
                name="mother_name"
                placeholder="Mother's Name"
                value={family.mother_name}
                onChange={handleFamilyChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleUserChange}
              />
              <input
                type="text"
                name="primary_telephone"
                placeholder="Primary Telephone"
                value={family.primary_telephone}
                onChange={handleFamilyChange}
              />
              <input
                type="text"
                name="secondary_telephone"
                placeholder="Secondary Telephone"
                value={family.secondary_telephone}
                onChange={handleFamilyChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleUserChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handlePasswordChange}
              />
              <h4>Student Information</h4>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={student.first_name}
                onChange={handleStudentChange}
              />
              <input
                type="text"
                name="additional_names"
                placeholder="Surname"
                value={student.additional_names}
                onChange={handleStudentChange}
              />
              <input
                type="text"
                name="cpr"
                placeholder="Student CPR ID"
                value={student.cpr}
                onChange={handleStudentChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleStudentChange}
              />
              <input
                type="date"
                name="birthdate"
                placeholder="Student Birthday"
                value={student.birthdate}
                onChange={handleStudentChange}
              />
              <Dropdown
                onChange={handleLocationDropdown}
                controlClassName="myControlClassName"
                className="dropdownRoot"
                options={locationArr}
                value={location}
              />
            </fieldset>
          )}
          {step === 2 && (
            <button onClick={prevStep}>Back: Your Information </button>
          )}
          {step === 3 && (
            <button onClick={prevStep}>Back: Student Information </button>
          )}
          {step === 1 && (
            <button onClick={nextStep}>Next: Student Information</button>
          )}
          {step === 2 && (
            <button onClick={nextStep}>Next: Review Registration </button>
          )}
          {step === 3 && (
            <button onClick={handleSubmit}>Submit Registration </button>
          )}
        </form>
      </div>
    </div>
  );
} else {
  return (
    <div className="success-message" style={{display: 'flex', flexDirection: 'column', 
                 textAlign: 'left', margin: '40px', 
                 alignItems: 'center',
                 height: 'calc(100vh - 282px)'}}>
      <h1>Congratulations, {props.student}!</h1>
      <h2>You've registered for Speak Out. Thank you!</h2>
      <Link to="/login" className="button">Sign In</Link>
    </div>
  )
}}
}

const mapStateToProps = state => {
  return {
    state: state,
    success: state.registrationReducer.familyRegister.success,
    student: state.registrationReducer.student.first_name,

  };
};

export default withRouter(
  connect(mapStateToProps, { familyRegister, toggle })(Register)
);