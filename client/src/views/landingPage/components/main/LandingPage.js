import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Special from './special/Special';
import Affordability from './affordability/Affordability';
import AgeGroups from './ageGroups/AgeGroups';
import Carousel from './carousel/Carousel';
import RegistrationInformation from './registrationInformation/RegistrationInformation';

function LandingPage() {

  return (
    <>
      <Header />
      <Special />
      <Affordability />
      <AgeGroups />
      <Carousel />
      <RegistrationInformation />
    </>
  )
}

export default LandingPage;