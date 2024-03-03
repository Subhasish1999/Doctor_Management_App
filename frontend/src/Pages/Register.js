import React from 'react';
import'../Styles/Register.css';
import { Form, Input, message } from 'antd'
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../Redux/features/alertSlice";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //form handler

  const onfinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", value);
      dispatch(hideLoading())
      if(res.data.success){
        message.success('Register successfully')
        navigate("/login")
      }else{
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something Went Wrong')
    }
  }
  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
          <h3 className='text-center'>Register Form</h3>
          <Form.Item label = "Name" name = "name">
            <Input type='text' required />
          </Form.Item>
          <Form.Item label = "Email" name = "email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label = "Password" name = "password">
            <Input type='password' required />
          </Form.Item>
          <h6>Already User! <Link to = '/login' className='ms-2'>Login Here</Link></h6>
          <button className='btn btn-primary'>Register</button>
        </Form>
      </div>
    </>
  )
}

export default Register
