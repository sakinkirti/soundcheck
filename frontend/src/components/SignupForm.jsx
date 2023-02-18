import { Formik, Form, Field } from 'formik'
import React from 'react'
import TextField from './TextField'
import * as Yup from 'yup'
import Button from './Button'


const SignupForm = ({signUp}) => {

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required.')
      .min(2, 'Too short.')
      .max(30, 'Too long.'),
    username: Yup.string()
      .required('Username is required.')
      .min(2, 'Too short.')
      .max(30, 'Too long.'),
    email: Yup.string()
      .email('Invalid email.')
      .required('Email is required.'),
  })

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        username: '',
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        signUp(values);
        setSubmitting(false);
      }}
    >
      {({isSubmitting, isValid}) => (
        <div style={{textAlign: 'center', paddingBottom:'20px'}}>
          <Form>
            <Field type='email' name='email' placeholder='Email' component={TextField}/>
            <Field type='name' name='name' placeholder='Name' component={TextField}/>
            <Field type='username' name='username' placeholder='Username' component={TextField}/>
            <Button button={!isValid} type='submit'>Submit</Button>
          </Form>
        </div>
      )}
    </Formik>
    
  )
}

export default SignupForm