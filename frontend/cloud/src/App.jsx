import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header      from './components/Header'
import Home        from './pages/Home'
import MyFiles     from './pages/MyFiles'
import Profile     from './pages/Profile'
import Login       from './pages/Login'
import Register    from './pages/Register'
import AuthContext from './context/AuthContext'

export default function App() {
  const user = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Header />

      <main style={{ padding: 20 }}>
        <Routes>
          {/* Главная — доступна всем */}
          <Route path="/" element={<Home />} />

          {/* Аутентификация */}
          <Route path="/login"    element={!user ? <Login />    : <Navigate to="/my-files" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/my-files" />} />

          {/* Защищённые */}
          <Route path="/my-files" element={user ? <MyFiles />   : <Navigate to="/login" />} />
          <Route path="/profile"  element={user ? <Profile />   : <Navigate to="/login" />} />

          {/* Любой другой маршрут */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
