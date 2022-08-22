import { getAuth } from 'firebase/auth';
import { Link } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react';
import '../App.css';
import { createUserWithEmail, signInWithGoogle } from '../firebase';
import { FirebaseError } from 'firebase/app';
import TitleInput from '../components/TitleInput';
const auth = getAuth();
function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const googleSignIn = async () => {
    try {
      const response = await signInWithGoogle();
      console.log('[GOOGLE_SIGNIN response]', response);
    } catch (error) {
      console.log('[GOOGLE_SIGNIN error]', error);
    }
  };

  const registerUser = async () => {
    try {
      if (email && email !== '' && password && password !== '' && confirmPassword && confirmPassword !== '') {
        if (confirmPassword === password) {
          const response = await createUserWithEmail(email, password);
          console.log('[GOOGLE_SIGNIN response]', response);
        } else {
          alert('Password and confirm password should match');
        }
      } else {
        alert('Please enter all details')
      }
    } catch (error) {
      const errorO = error as FirebaseError;
      if (errorO.code === 'auth/email-already-in-use') {
        alert('This email seems to be registered already, try signing in again using google');
      }
      console.log('[GOOGLE_SIGNIN error]', error);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to={'/auth/sign-in'} className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
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
            <TitleInput
              id="confirm-password"
              name="confirm-password"
              type="password"
              title="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onClick={registerUser}
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

export default Register;
