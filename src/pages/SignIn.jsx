import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// This component is the same as SignUp, this component had be done first, then modified and replaced to SignUp and to forgotPassword
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {email,password} = formData;
  const navigate = useNavigate('/');

  function onChange(e){
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e){
    e.preventDefault();
    try{
      const auth = getAuth();
      //Если вход будет успешен он вернет true / false. Она сама сапостовляет с данными которые есть в твоей базе данных в Authorize
      const userCredentials = await signInWithEmailAndPassword(auth,email,password);
      //Если вернет true, то перенапрвь его на главную.
      if(userCredentials.user){
        navigate("/");
      }
    } catch(e){
      toast.error("Bad user credentials")
    }

  }


  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=3473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-full rounded-2xl' alt="key" />
          </div>
          <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
            <form action="" onSubmit={onSubmit}>
              <input className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="email" id="email" value={email} onChange={(e) => onChange(e)} placeholder='Email address'/>
              <div className='relative mb-6'>
              <input className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => onChange(e)} placeholder='Password'/>
              {showPassword ? 
              <IoMdEyeOff className='absolute right-3 top-3 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => 
                !prevState)}/> : 
              <IoMdEye className='absolute right-3 top-3 text-xl cursor-pointer'  onClick={() => setShowPassword((prevState) => 
                !prevState)}/>}
              </div>
              <div className='flex justify-between flex-wrap text-sm sm:text-lg'>
                <p className='mb-6'>Don't have a account?
                  <Link to="/sign-up" className='text-red-600 hover:text-red-700 transition duration-200 ease-out ml-3'>Register</Link>
                </p>
                <p>
                  <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-out'>Forgot password?</Link>
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit">Sign in</button>
            <div className='flex my-4 before:border-t before:flex-1 items-center before:border-gray-300 after:border-gray-300 after:flex-1 after:border-t'>
              <p className='text-center font-semibold mx-4 '>OR</p>
            </div>
            <OAuth/>
            </form>

          </div>
      </div>
    </section>
  )
}
