// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = form

    // Простая валидация
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля.')
      return
    }

    try {
      setLoading(true)
      // Попытка входа через Firebase
      await signInWithEmailAndPassword(auth, email, password)
      // При успешном входе редиректим на защищённую страницу
      navigate('/disk')
    } catch (err) {
      // Обработка ошибок Firebase
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Пользователь с таким email не найден.')
          break
        case 'auth/wrong-password':
          setError('Неверный пароль.')
          break
        case 'auth/invalid-email':
          setError('Неверный формат email.')
          break
        case 'auth/user-disabled':
          setError('Учётная запись заблокирована.')
          break
        default:
          setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 10 }}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              required
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>
            Пароль
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Пароль"
              required
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 10,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
