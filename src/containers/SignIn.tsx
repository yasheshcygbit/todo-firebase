import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react';
import '../App.css';
import { loginUserWithEmail, signInWithGoogle } from '../firebase';
import { FirebaseError } from 'firebase/app';
import TitleInput from '../components/TitleInput';
const auth = getAuth();
function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const googleSignIn = async () => {
    try {
      const response = await signInWithGoogle();
      console.log('[GOOGLE_SIGNIN response]', response);
    } catch (error) {
      console.log('[GOOGLE_SIGNIN error]', error);
    }
  };

  const loginUser = async () => {
    try {
      if (email && email !== '' && password && password !== '') {
        const response = await loginUserWithEmail(email, password);
        console.log('[GOOGLE_SIGNIN response]', response);
      } else {
        alert('Please enter all details')
      }
    } catch (error) {
      const errorO = error as FirebaseError;
      alert(errorO.message)
      console.log('[GOOGLE_SIGNIN error]', error);
    }
  };

  return (
    // <div className="App">
    //   <div>
    //     <h1>Login User</h1>
    //     <div>
    //       <button onClick={googleSignIn}>Google Login</button>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to={'/auth/sign-up'} className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <TitleInput
              id="email-address"
              name="email"
              type="email"
              title="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TitleInput
              id="password"
              name="current-password"
              type="password"
              title="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={loginUser}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>

          <div className='pt-2'>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={googleSignIn}
            >
              Sign in using google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
