import React, { useEffect } from 'react'
import OtherNav from '../components/OtherNav'
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import '../styles/Authenticate.css'
import { useNavigate } from 'react-router-dom';

const Authenticate = () => {

  const navigate = useNavigate()

  
  useEffect(() => {

    if (localStorage.getItem('email') ==="ieiklc@ieikadapa.org"  ) {
      window.location.href = '/admin';
    }
  }, [localStorage]);



  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const login = () => {
    if(email === 'ieiklc@ieikadapa.org' && password === 'IEIKLC@2024') {
      localStorage.setItem("email", email)
      alert('Logged in')
      navigate("/admin")
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div>
      <OtherNav />
      <div className="authentication-page">

      <div className="auth-component">

            <h3>Sign In</h3>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInputauth4" placeholder='Email' onChange={(e)=> setEmail(e.target.value)} />
              <label htmlFor="floatingInputauth4">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingInputauth5" placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />
              <label htmlFor="floatingInputauth5">Password</label>
            </div>

            <button className='btn btn-primary' onClick={login}>Login</button>

            </div>

        </div>
    </div>
  )
}

export default Authenticate