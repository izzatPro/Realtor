import { getAuth, updateProfile} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {db} from '../firebase'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData;

  function onLogout(){
    auth.signOut();
    navigate('/');
  }

  function onChange(e){
    setFormData((prevState) =>({
      ...prevState,
      [e.target.id]: e.target.value

    }))
  }

 async function onSubmit(){
    try {
      // check name was changed or no
      if(auth.currentUser.displayName !== name){
        //Мы должны два раза обновить пользователя первое в авториации, второе же в базе данных.
        //update displayname in firebase auth
        await updateProfile(auth.currentUser, {
          displayName:name,
        })
        //update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success('Profile details updated');
    } catch(e){
      toast.error('Could  not update the profile details')
    }
  }


  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3 '>
        <form action="">
          {/* Name Input */}
          <input type="text" id="name" value={name} disabled={!changeDetail} onChange={onChange} 
          className={`w-full mb-6 px-4 py-2 text-xl text-gray text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out 
          ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>
    
          {/* Email Input */}
          <input type="email" id="email" value={email} disabled className='w-full mb-6 px-4 py-2 text-xl text-gray text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out'/>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center '>Do you want change your name?
            <span onClick={() => { changeDetail && onSubmit(); setChangeDetail((prevState) => !prevState)}} className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>{changeDetail ? 'Apply change' : 'Edit'}</span>
            </p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'>Sign out</p>
          </div>
        </form>
      </div>
    </section>
    </>
  )
}
