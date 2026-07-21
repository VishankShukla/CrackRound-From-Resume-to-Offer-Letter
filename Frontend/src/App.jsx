import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.routes'
import { AuthProvider } from './features/auth/auth.context'


const App = () => {
  return (
    <div className='h-screen bg-gray-700 text-white '>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  )
}

export default App