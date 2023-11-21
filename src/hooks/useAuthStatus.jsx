import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
//Этот хук нужен для того, чтобы убедится вошел ли кто нибудь под своим логином или нет, чтобы отображать Profile или не отображать.
export function useAuthStatus() {

    const [loggedIn, setLoggedin] = useState(false);
    //lading
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(()=>{
        const auth = getAuth();
        //Этот метод дает нам текущего авторизованного пользователя, который сейчас вошел в систему, если никто не входил вернется false
        onAuthStateChanged(auth, (user) =>{
            if(user){
                //Пользователь вошел
                setLoggedin(true)
            }
            //loading заканчивается если пользователя он обнаружил
            setCheckingStatus(false);
        })
    },[])

  return {
    loggedIn, checkingStatus
  }
}
