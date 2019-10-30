import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getStudentById } from '../../actions';
import { withRouter, Link } from 'react-router-dom';
import './StudentInformationTab.css'



const StudentInformationTab = props => {
    useEffect(() => {
        props.getStudentById(props.match.params.id)
    }, [])

    return (
        <>
            <div className='grid-container'>
                <div className='row1'>
                    <h4>First Name</h4>
                    <p>{props.studentById.first_name}</p>
                    </div>
                <div className='row1'>
                    <h4>Additional Names</h4>
                    <p>{props.studentById.additional_names}</p>
                    </div>
                <div className='row1'>
                    <h4>Gender</h4>
                    <p>{props.studentById.gender}</p>
                    </div>
                <div className='row1'>
                    <h4>Birth date</h4>
                    <p>{props.studentById.birthdate}</p>
                    </div>

                <div className='row2'>
                    <h4>Home Telephone</h4>
                    <p>{props.studentById.home_telephone}</p>
                    </div>
                <div className='row2'>
                    <h4>Mobile Telephone</h4>
                    <p>{props.studentById.mobile_telephone}</p>
                </div>
                <div className='row2'>
                    <h4>Email</h4>
                    <p>{props.studentById.email}</p>
                    </div>
                <div className='row2'>
                    <h4>Preferred Contact Method</h4>
                    <p>{props.studentById.preferred_contact_method}</p>
                </div>

                <div className='row3'>
                    <h4>Location</h4>
                    <p>Not done</p>
                    </div>
                <div className='row3'>
                    <h4>Registration Date</h4>
                    <p>{props.studentById.registration_date}</p>
                    </div>
                <div className='row3'>
                    <h4>Block</h4>
                    <p>{props.studentById.block}</p>
                    </div>
                <div className='row3'>
                    <h4>Road</h4>
                    <p>{props.studentById.road}</p>
                    </div>
                <div className='row3'>
                    <h4>Flat</h4>
                    <p>{props.studentById.flat}</p>
                    </div>
                <div className='row3'>
                    <h4>Building</h4>
                    <p>{props.studentById.building}</p>
                    </div>

                <div className='row4'>
                    <h4>No Call</h4>
                    <p>{props.studentById.no_call}</p>
                    </div>
                <div className='row4'>
                    <h4>Delinquent Account</h4>
                    <p>{props.studentById.delinquent_account}</p>
                    </div>
                <div className='row4'>
                    <h4>Expelled</h4>
                    <p>{props.studentById.expelled}</p>
                    </div>

                <div className='row5'>
                    <h4>Notes</h4>
                    <p>{props.studentById.notes}</p>
                    </div>

                <div className='button-container'>
                    <button className='placement-button'>Placement Examination</button>
                </div>

            </div>
           
        </>
    )
}


const mapStateToProps = state => {
    return {
        isLoading: state.studentByIdReducer.isLoading,
        studentById: state.studentByIdReducer.studentById
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      { getStudentById }
  )(StudentInformationTab)
  )