import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, redirect, Route, Routes } from 'react-router-dom'
import './App.less'
import MainLayout from './layouts/MainLayout'
import Login from './pages/login'
import Users from './pages/users'
import commonService from './services/CommonService'

function App() {
  const [isAuthenicated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!commonService._token)
  }, [commonService._token])

  if (!isAuthenicated) {
    return (
      <Login
        onSuccess={() => setIsAuthenticated(true)}
        onError={() => setIsAuthenticated(false)}
      />
    )
  }

  return (
    <BrowserRouter>
      <MainLayout onLogout={() => setIsAuthenticated(false)}>
        <Routes>
          <Route
            path='/'
            element={<Navigate to={'/users'} />}
            loader={() => {
              if (!isAuthenicated) return redirect('/login');

              return { isAuthenicated };
            }}
          />
          <Route index path='/users' element={<Users />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
