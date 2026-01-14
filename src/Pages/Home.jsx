import React from 'react'
import Banner from './Banner'
import HomeFeature from '../components/common/HomeFeature'
import UrgentRequests from '../components/Uicomponent/UrgentRequests.JSX'
import Partners from '../components/Uicomponent/Partners'
import Testimonials from '../components/Uicomponent/Testimonials'
import BloodCompatibility from '../components/Uicomponent/BloodCompatibility'


const Home = () => {
  return (
   <div className="w-full max-w-[90%] mx-auto">
  <Banner />
  <HomeFeature></HomeFeature>
<UrgentRequests></UrgentRequests>
<BloodCompatibility></BloodCompatibility>
<Testimonials></Testimonials>
<Partners></Partners>
</div>
  )
}

export default Home