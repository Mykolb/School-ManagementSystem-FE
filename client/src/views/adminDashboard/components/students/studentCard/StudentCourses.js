import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getCoursesByStudent } from '../../../../../actions/adminDashboardActions/students/studentsActions';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// import '../mainStyle/mainCard.scss'

const StudentCourses = props => {
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(false);


  useEffect(() => {
    props.getCoursesByStudent(props.id);
  }, [])

  const handleCancelButtonOnForm = () => {
    setForm(false);
  }

  const handleSearchInput = () => {

  }

  const handleAddButton = () => {
    setForm(!form);
  }

  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'id',
      key: 1,
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 2,
    },
    {
      title: 'Course Type',
      dataIndex: 'course_type',
      key: 4,
    },
    {
      title: 'Group Type',
      dataIndex: 'group_type',
      key: 5,
    },
    {
      title: 'School Grade',
      dataIndex: 'school_grade',
      key: 6,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 7,
    },
    {
      title: 'Course Schedule',
      dataIndex: 'course_schedule',
      key: 8,
    },{
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 9,
    },
  ];

  // const studentData = props.studentList.sort((a, b) => {
  //   return b.id - a.id
  // }
  // )

  return (
    <div>
      
      {props.isLoading ? (
        <Spin style={{ marginTop: '150px' }} size="large" />
      ) : (
          <Table
            className="rowHover"
            dataSource={props.courseList}
            columns={columns}
            pagination={{ pageSize: 15 }}
            rowKey='id'
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  // props.setCourseView('courseCardView')
                  // props.setCourseID(record.id)
                }
              };
            }}
          />
        )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.studentsReducer.courseListIsLoading,
    courseList: state.studentsReducer.courseList,
    // error: state.coursesReducer.error,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getCoursesByStudent }
  )(StudentCourses)
)

