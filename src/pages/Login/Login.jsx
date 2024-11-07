import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import Navbar from '../../components/Navbar/Navbar'

const TodoAppLogin = () => {
  return (
    <div className="login">
      <Navbar />
      <Form route='api/token/' method='login'/>
    </div>
  );
};

export default TodoAppLogin;