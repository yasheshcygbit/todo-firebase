import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/solid'
import { signInWithGoogle, updateUserProfile } from '../firebase';
function UserDetails() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string | null>(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
      console.log('[onAuthStateChanged user]', user);
    })
  }, [])
  
  const saveProfile = async () => {
    try {
      const response = await updateUserProfile(currentUser as User, { displayName: fullName });
      console.log('[UPDATE_PROPFILE response]', response);
      setEditMode(false);
    } catch (error) {
      console.log('[UPDATE_PROPFILE error]', error);
      setEditMode(false);
    }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      {currentUser ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
            {editMode ? (
              <button
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                onClick={() => saveProfile()}
              >
                Save
              </button>
            ) : (
              <button
                className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
            
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                {editMode ? (
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="fullName"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Fullname"
                      value={fullName && fullName !== '' ? fullName : currentUser.displayName || ''}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.displayName}</dd>
                )}
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Photo</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img src={currentUser.photoURL || ''} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                </dd>
              </div>
            </dl>
          </div>
        </div>

      ) : (
        null
      )}
    </div>
  );
}

export default UserDetails;
