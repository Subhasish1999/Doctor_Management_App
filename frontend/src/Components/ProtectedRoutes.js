import React from "react"
import { Navigate } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

export default function ProtectedRoutes({children}) {

  const dispatch = useDispatch()
  // const (user) = useSelector(state => state.user)
  if(localStorage.getItem("token")){
    return children
  }else{
    return <Navigate to = "/login"/>
  }
}


