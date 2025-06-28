// src/components/Header.jsx
import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { signOut }             from 'firebase/auth'
import { auth }                from '../firebase'
import AuthContext             from '../context/AuthContext'

export default function Header() {
  const user = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* Новая ссылка «Главная» */}
        <NavLink to="/" exact style={styles.link} activeStyle={styles.active}>
          Главная
        </NavLink>
        <NavLink to="/my-files" style={styles.link} activeStyle={styles.active}>
          Мои файлы
        </NavLink>
        <NavLink to="/profile" style={styles.link} activeStyle={styles.active}>
          Профиль
        </NavLink>
      </nav>

      {user && (
        <button onClick={handleLogout} style={styles.logout}>
          Выйти
        </button>
      )}
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
  },
  nav: {
    display: 'flex',
    gap: 20,
  },
  link: {
    textDecoration: 'none',
    color: '#444',
  },
  active: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  logout: {
    background: 'transparent',
    border: '1px solid #1976d2',
    padding: '5px 15px',
    cursor: 'pointer',
  },
}
