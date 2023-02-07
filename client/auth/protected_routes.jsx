import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
const Protected = ({user,children}) => {
    console.log(user);
    if(!user){
        return <Navigate to={'/login'} />
    }
    return children
}
 
export default Protected;