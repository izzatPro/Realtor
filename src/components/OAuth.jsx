import React from 'react'
import { getAuth, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import {db} from '../firebase';
import {doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import { useNavigate } from 'react-router';

const OAuth = () => {
 const navigate = useNavigate();

  async function onGoogleClick(){
     try {
      //Чтобы зайти через гугл, нужно инициализировать вход
      const auth = getAuth();
      //Экземпляр объекта всего провайдера гугл 
      const provider = new GoogleAuthProvider();
      //Чтобы открылось дополнительное окно, чтобы войти из гугл, требует инициализацию а так же провайдер - говорит именно через почту. через что будем входить.
      //Так как у гугла есть разные способы войти в аккаунт, в том числе и по почте,по поролю, фейс айди и тд.
      //Если человек войдет, то туда придут данные о человеке, в качестве объекта с доп данными, если нет, то перейдет в блок catch
      const result = await signInWithPopup(auth,provider);
      //Данные о человеке
      const user = result.user;
      // сheck for the user
      //Нам нужно создать запись в базе данных, если пользователь зашел с гугл аккаунта.
      //Сейчас у нас в firestore - сохраняется только те данные, которые вошли при помощи пороля и почты, с гугл аккаунта в FireStore, не сохраняются данные о пользователе
      // Берем и создаем в столбце users в Firestore нового человек при помощи его айди
      const  docRef = doc(db, "users", user.uid);
      // docSnap - обычно так называется переменная, помещаем объект который создается для нового человека, в Firestore.
      const docSnap = await getDoc(docRef);
      //Если записи не существует, для нашего нового пользователя который зашел через гугл, тогда зайди в условие
      //setDoc - записывает в столбец нового пользователя информацию о нем, через глобальный объект docRef - который нам дает гугл
      //Там есть информация о пользователе который прдоставил нам гугл, мы же эту информацию предоставленной гуглом помещаем уже в нашу базу данных при помощи функции setDoc
      if(!docSnap.exists()){
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
        navigate('/');
      }
      console.log(docSnap);

     } catch{
      toast.error("Could not authorize with Google")
     }
  }

  return (
    <button type="button" onClick={onGoogleClick} className='flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition-150 ease-in-out rounded'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
        Continue with Google
    </button>
  )   
}

export default OAuth