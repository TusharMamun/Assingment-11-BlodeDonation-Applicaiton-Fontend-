import React from 'react'
import Banner from './Banner'
import HomeFeature from '../components/common/HomeFeature'

const Home = () => {
  return (
   <div className="w-full max-w-[90%] mx-auto">
  <Banner />
  <HomeFeature></HomeFeature>
</div>
  )
}

export default Home