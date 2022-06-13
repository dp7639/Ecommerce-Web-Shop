import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from './../components/Loader';
import { toast } from 'react-toastify';


function RegisterPage() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [loading, setloading] = useState(false)
  const auth = getAuth();
  const register = async () => {

    try {
      setloading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log(result)
      setloading(false)
      toast.success('Registration successfull')
      setemail('')
      setpassword('')
      setconfirmpassword('')
      window.location.href = '/login'

    } catch (error) {
      console.log(error)
      toast.error('Registration failed')
      setloading(false)
    }

  }
  return (
    <div className='register-parent'>
      {loading && (<Loader />)}
      <div className='register-top'></div>
      <div className='row justify-content-center'>
        <div className='col-md-5 z1'>
          <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_yr6zz3wv.json" background="transparent" speed="1" loop autoplay></lottie-player>
        </div>
        <div className='col-md-4 z1'>
          <div className="register-form">

            <h2><b>Register</b></h2>
            <hr />

            <input type="text" className="form-control" placeholder="email"
              value={email} onChange={(e) => { setemail(e.target.value) }} required />
            <input type="password" className="form-control" placeholder="password"
              value={password} onChange={(e) => { setpassword(e.target.value) }} required />
            <input type="password" className="form-control" placeholder="confirm password"
              value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }} required />
            <button className='my-3' onClick={register}>REGISTER</button>
            <hr />
            <Link to='/login'>Click Here To Login</Link>
          </div>
        </div>


      </div>

    </div>
  );
}

export default RegisterPage;