import React, { useState, useEffect } from 'react';
import AddStars from "./add-stars.component";
import firebase from '../firebase'; // Importa la configuración de Firebase desde firebase.js

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const LoginWithGoogle = ({ currentStars }) => {
  const [user, setUser] = useState("");

  const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
      .then((data) => {
        const user = data.user;
        setUser(user);
        localStorage.setItem("user", data.user.displayName);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [])

  const signOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

return (
    <div className="login-container">
      {user ? (
        <>
          
          <button onClick={signOut}>Cerrar sesión</button>
          <AddStars></AddStars>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
      )}
    </div>
  );
};

export default LoginWithGoogle;
