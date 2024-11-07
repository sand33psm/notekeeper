import React from 'react'
import Form from '../../components/Form/Form'
import Navbar from '../../components/Navbar/Navbar'

export default function Register() {
  return (
<div className="register">
      <Navbar />
      <Form route='api/register/' method='register'/>
    </div>  )
}
