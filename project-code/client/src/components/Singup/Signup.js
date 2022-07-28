import React from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { TextField } from './TextField';
import * as Yup from 'yup';

import {useNavigate ,Link} from 'react-router-dom'

export const Signup = () => {
  let navigate = useNavigate();
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
  })
  
  return (
    
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={ async ({firstName,lastName,email,password},{resetForm}) => {
       await axios.post('http://localhost:7000/api/auth/register',({firstName,lastName,email,password}))
      resetForm();     
      }} 
     
    >
      {formik => (
        <>
           <div className=" container-fluid "> 
           <div className="row">
             <div className="col-md-5" style={{marginTop:"-15px"}}>    
        <div>
          <h1 className="my-3 font-weight-bold .display-2">Sign Up</h1>
          <Form style={{marginLeft: "10px"}} onSubmit={formik.handleSubmit}>
            <TextField 
            label="First Name" 
            name="firstName" 
            placeholder="First Name"
            type="text" 
            value={formik.values.firstName}
            onChange={formik.handleChange}
            />
            <TextField 
            label="Last Name"
             name="lastName"
             placeholder="Last Name"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
               />
            <TextField
             label="Email" 
             name="email" 
             placeholder="xyz@gmail.com"
             type="email" 
             value={formik.values.email}
             onChange={formik.handleChange}
             />
            <TextField 
            label="Password"
             name="password"
             placeholder="Password"
            type="password" 
            value={formik.values.password}
            onChange={formik.handleChange}
            />
            <TextField 
            label="Confirm Password"
            placeholder="Confirm Password"
             name="confirmPassword" 
             type="password" 
             value={formik.values.confirmPassword}
             onChange={formik.handleChange}
             />
             <p>If already have an account <Link style={{textDecoration:'none'}} to='/Signin' > signin </Link></p>
            <button  className="btn btn-dark mt-3" type="submit" >Register</button>
          </Form>
        
        </div>
        </div>
      </div> 
    </div>
    </>
      )} 
    </Formik>

  )
}