import React from 'react'
import Card from '../components/HomeCard'
import LoginCard from '../components/LoginCard'
import { useSelector } from 'react-redux'

const Home = () => {
    const { userInfo } = useSelector((state) => state.auth)

    return (
      <> 
          {userInfo ? 
            <LoginCard/>
            :
            <Card/>
          }
      </>
    )
}

export default Home