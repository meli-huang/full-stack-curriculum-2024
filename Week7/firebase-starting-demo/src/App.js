import React, { useState } from 'react';
import './App.css';

import { auth, googleProvider } from "./firebaseConfig";

import { signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth';

function App() {
  // Separate state variables for login and signup
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: Add Firebase login with email/password functionality here.
    try {
      const userCredential = signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setUser(userCredential.user);
      console.log("LOGIN SUCCESSFUL: ", userCredential.user);
    } catch (error) {
      console.error("LOGIN ERROR: ", error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // TODO: Add Firebase signup with email/password functionality here.
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      setUser(userCredential.user);
      console.log("ACCOUNT CREATED: ", userCredential.user);
    } catch (error) {
      console.error("SIGNUP ERROR: ", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    // TODO: Add Firebase Google sign-in functionality here.
    try {
      const userCredential = signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      console.log("GOOGLE LOGIN SUCCESSFUL: ", userCredential.user);
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR: ", error.message);
    }
  };

  const handleLogout = async () => {
    // TODO: Add Firebase logout functionality here.
    try {
      await signOut(auth);
      setUser(null);
      console.log("LOGGED OUT SUCCESSFULLY");
    } catch (error) {
      console.error("SIGNOUT ERROR: ", error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Firebase Authentication Demo</h1>
        {!user ? (
          <>
            <form onSubmit={handleLogin}>
              <h3>Login</h3>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>

            <form onSubmit={handleSignup}>
              <h3>Sign Up</h3>
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
            </form>

            <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
          </>
        ) : (
          <div>
            <p>Welcome, {user?.displayName || user?.email}</p>
            <button onClick={handleLogout}>Sign Out</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;