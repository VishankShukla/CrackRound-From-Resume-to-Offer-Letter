import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.routes'
import { AuthProvider } from './features/auth/auth.context'
import { InterviewReportProvider } from './features/interviewReport/interviewReport.context'

const App = () => {
  return (
    <AuthProvider>
      <InterviewReportProvider>
        <RouterProvider router={router} />
      </InterviewReportProvider>
    </AuthProvider>
  )
}

export default App
