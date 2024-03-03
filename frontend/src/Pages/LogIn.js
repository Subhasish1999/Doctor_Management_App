import React from "react";
import "../Styles/Login.css";
import { Form, Input, message } from "antd";
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../Redux/features/alertSlice";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const LogIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
   //form handler

   const onfinishHandler = async (value) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/login", value)
      dispatch(hideLoading())
      if(res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success("login Successfully");
        navigate("/");
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went wrong")
    }
  }
  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler} className='login-form'>
          <h3 className='text-center'>Login Form</h3>
          <Form.Item label = "Email" name = "email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label = "Password" name = "password">
            <Input type='password' required />
          </Form.Item>
          <h6>Not A User! <Link to = '/register' className='ms-2'>Register Here</Link></h6>
          <button className='btn btn-primary'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default LogIn
