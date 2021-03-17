import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser);
        // console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }
  const handleSignOut = () => {
    firebase.auth()
      .signOut()
      .then(res => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          email: '',
          photo: '',
        }
        setUser(signOutUser);
      })
      .catch(err => {

      })
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if(user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

    }
    e.preventDefault();
  }
  const handleBlur = (e) => {
    // debugger;
  // console.log(e.target.name, e.target.value);
  let isFieldValid = true;

  if(e.target.name === 'email') {
     isFieldValid =  /\S+@\S+\.\S+/.test(e.target.value);
    // console.log(isEmailValid);
  }
  if (e.target.name === 'password') {
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber = /\d{1}/.test(e.target.value);
    isFieldValid = isPasswordValid && passwordHasNumber
  }
  if (isFieldValid) {
    const newUserInfo = {...user} ;
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }
  }

  return (
    <div className="App">
      <br />
      <br />
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
     
        <h1>Our Own Authentication</h1>
        <form onSubmit={handleSubmit}>
         <input type="text" onBlur={handleBlur} placeholder= "Your Name"/>
        <br/>
        <input type="email" onBlur={handleBlur} name="email: " placeholder="Write Your Email" required />
        <br/>
        <input type="password" onBlur={handleBlur} name="password: " placeholder="Your  Password" required />
        <br/>
        <input type="submit" value="Submit"/>
      </form>

    </div>
  );
}

export default App;
