import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './App.css';
import UserDetails from './containers/UserDetails';
import ToDos from './containers/ToDos';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './containers/SignIn';
import Register from './containers/Register';
import DefaultLayout from './layouts/DefaultLayout';
import Default from './containers/Default';
const auth = getAuth();
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<Register />} />
        </Route>
        <Route path="/default" element={<DefaultLayout />}>
          <Route path="user-details" element={<UserDetails />} />
          <Route path="todos" element={<ToDos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
