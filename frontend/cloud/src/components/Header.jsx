// src/components/Header.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const isAuth = Boolean(localStorage.getItem('accessToken'))
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/')   // возвращаемся на главную
  }

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">SecureCloud</Link>
      </div>
      <nav className="header__nav">
        {isAuth ? (
          <>
            <button onClick={() => navigate('/disk')}>Моё хранилище</button>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  )
}
