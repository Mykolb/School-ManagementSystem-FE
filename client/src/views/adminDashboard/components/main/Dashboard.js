import React, { useState } from 'react';
import styled from 'styled-components';
import { adminDashboardTabs } from '../../../../data';
import TabList from './TabList';
import Display from './Display';

const DashboardWrap = styled.div`
  display: flex;
  padding: 0px 0 0 0;
`

const TabsWrap = styled.div`
  width: 15%;
  height: 100vh;
  overflow: scroll;
  // background: #269FB0;
  // color: #269FB0;
  border-right: 0.2px solid #B4B1B5;
`
const DisplayWrap = styled.div`
  width: 85%;
  height: 100vh;
  // overflow: scroll;
  overflow-y: scroll;
`

function Dashboard() {
const [navigation, setNavigation] = useState("students");
const [tabColor, setTabColor] = useState("transparent");


  return (
    <DashboardWrap>
      <TabsWrap>
        <TabList tabs={adminDashboardTabs} navigation={navigation} setNavigation={setNavigation} tabColor={tabColor} setTabColor={setTabColor} />
      </TabsWrap>

      <DisplayWrap>
          <div>
            <Display  navigation={navigation}/>
          </div>
      </DisplayWrap>

    </DashboardWrap>
  )
}


export default Dashboard;