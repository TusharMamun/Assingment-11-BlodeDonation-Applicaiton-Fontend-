import React from 'react'
import useUserRole from '../Hooks/useUserRole'
import useAuth from '../Hooks/useAuth'
import Loading from '../components/Uicomponent/Loadding'


const VoletreeRoute = ({children}) => {
const {role,IsRoleLoadding} =useUserRole()
const{loading} =useAuth()
if(loading || IsRoleLoadding){
    return <Loading></Loading>
}
if(role !=="Voletree"){
    return <h1>forbidden componnent </h1>
}


return children
}

export default VoletreeRoute