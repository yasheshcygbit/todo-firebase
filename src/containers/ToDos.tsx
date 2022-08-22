import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { PaperClipIcon } from '@heroicons/react/solid'
import { signInWithGoogle, updateUserProfile, createToDo, getAllTodos, updateToDo } from '../firebase';
import AddToDo from '../components/modals/AddTodo';

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { QueryDocumentSnapshot } from 'firebase/firestore';

function UserDetails() {
  const [open, setOpen] = useState(false)
  const [toDos, setToDos] = useState<QueryDocumentSnapshot[]>([]);
  const cancelButtonRef = useRef(null)
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
    getAllTodosDb();
  }, [])

  const getAllTodosDb = async () => {
    try {
      const resp = await getAllTodos();
      if (resp && Array.isArray(resp) && resp.length >= 0) {
        setToDos(resp);
      }
    } catch (error) {
      
    }
  }

  const addToDoToDb = async (todo: string) => {
    try {
      if (currentUser) {
        const resp = await createToDo(todo, currentUser.uid);
        setOpen(false);
        getAllTodosDb();
      }
    } catch (error) {
      
    }
  }

  const markAsComplete = async (todoId: string) => {
    try {
      const resp = await updateToDo(todoId, true);
      getAllTodosDb();
    } catch (error) {
      
    }
  }

  const markAsIncomplete = async (todoId: string) => {
    try {
      const resp = await updateToDo(todoId, false);
      getAllTodosDb();
    } catch (error) {
      
    }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <AddToDo addToDo={(todo) => addToDoToDb(todo)} open={open} setOpen={setOpen} />
      {currentUser ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">ToDos</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">All todos listed below</p>
            <button
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
              onClick={() => setOpen(true)}
            >
              Add a todo
            </button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              
              {toDos.map((todo: QueryDocumentSnapshot, index: number) => (
                <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{todo.get('title')}</dd>
                  {todo.get('isCompleted') ? (
                    <>
                      <dt className="text-sm font-medium text-gray-500"></dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <button
                          className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                          onClick={() => markAsIncomplete(todo.id)}
                        >
                          Mark as incomplete
                        </button>
                      </dd>
                    </>
                  ) : (
                    <>
                      <dt className="text-sm font-medium text-gray-500"></dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <button
                          className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-2"
                          onClick={() => markAsComplete(todo.id)}
                        >
                          Mark as complete
                        </button>
                      </dd>
                    </>
                  )}
                </div>
              ))}
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
