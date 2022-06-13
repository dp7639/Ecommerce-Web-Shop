import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from './../components/Loader';
import { toast } from 'react-toastify';
function LoginPage() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading] = useState(false)
  const auth = getAuth();
  const login = async () => {

    try {
      setloading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('currentUser', JSON.stringify(result))
      setloading(false)
      toast.success('Login successfull')
      window.location.href = '/'

    } catch (error) {
      console.log(error)
      toast.error('Login failed')
      setloading(false)
    }

  }

  return (
    <div className='login-parent'>
      {loading && (<Loader />)}
      <div className='row justify-content-center'>
        <div className='col-md-4 z1'>
          <div className="login-form">

            <h2><b>Login</b></h2>
            <hr />
            <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} required />
            <input type="password" className="form-control" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} required />

            <button className='my-3' onClick={login}>Login</button>
            <hr />
            <Link to='/register'>Click Here To Register</Link>
          </div>
        </div>
        <div className='col-md-5 z1'>
          <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_hu9cd9.json" background="transparent" speed="1" loop autoplay></lottie-player>
        </div>



      </div>
      <div className='login-bottom'> </div>
    </div>
  );
}

export default LoginPage;
