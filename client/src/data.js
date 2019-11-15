export const adminDashboardTabs = [
  // {key: "Main"},
  {key: "Students"},
  // {key: "Parents"},
  {key: "Courses"},
  // {key: "Calendar"},
  // {key: "Schedule"},
  {key: "Staff"},
  // {key: "Tables"},
  // {key: "Queries"},
  // {key: "Documents"},
]
export const parentDashboardTabs = [
  {key: "Main"},
  {key: "Courses"},
  // {key: "Schedule"},
  {key: "Payments"},
]
export const staffDashboardTabs = [
  {key: "Main"},
  {key: "Students"},
  {key: "Courses"},
  // {key: "Work Log"},
]
export const studentCardTabs = [
  {key: "Student Information"},
  {key: "Courses"},
  {key: "Progress"},
  {key: "Billing"}
]
export const studentTableColumns = [
  {
    title: 'Student ID',
    dataIndex: 'id',
    key: 1,
  },
  {
    title: 'CPR',
    dataIndex: 'cpr',
    key: 2,
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 4,
  },
  {
    title: 'Additional Name',
    dataIndex: 'additional_names',
    key: 5,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile_telephone',
    key: 6,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 7,
  }
];
export const courseCardTabs = [
  {key: "Course Information"},
  {key: "Enrolled Students"}
]
export const courseTableColumns = [
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
        title: 'School Grade',
        dataIndex: 'school_grade',
        key: 3,
      },
      {
        title: 'Level',
        dataIndex: 'level',
        key: 4,
      },
      {
        title: 'Course Schedule',
        dataIndex: 'course_schedule',
        key: 5,
      },{
        title: 'Teacher',
        dataIndex: 'teacher',
        key: 6,
      },
];
export const staffTableColumns = [
  {
    title: 'Staff ID',
    dataIndex: 'id',
    key: 1,
  },
  {
    title: 'CPR',
    dataIndex: 'cpr',
    key: 2,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 3,
  },
  {
    title: 'Short Name',
    dataIndex: 'short_name',
    key: 4,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'mobile_number',
    key: 5,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 7,
  }
]
export const staffCardTabs = [
  {key: "Staff Information"},
  {key: "Courses"},
  // {key: "Work Log"}
]


