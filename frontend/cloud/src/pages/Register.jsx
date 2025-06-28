// src/pages/Register.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth'
import { auth } from '../firebase'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
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
    const { name, email, password, passwordConfirm } = form

    // Простая валидация
    if (!name || !email || !password || !passwordConfirm) {
      setError('Пожалуйста, заполните все поля.')
      return
    }
    if (password !== passwordConfirm) {
      setError('Пароли не совпадают.')
      return
    }

    try {
      setLoading(true)
      // 1. Регистрируем пользователя в Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // 2. Обновляем displayName (имя пользователя)
      await updateProfile(userCredential.user, { displayName: name })

      // 3. Перенаправляем на защищённую страницу
      navigate('/disk')
    } catch (err) {
      // Обрабатываем возможные ошибки
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Этот email уже зарегистрирован.')
          break
        case 'auth/invalid-email':
          setError('Неверный формат email.')
          break
        case 'auth/weak-password':
          setError('Пароль должен быть не менее 6 символов.')
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
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 10 }}>
          <label>
            Имя
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>

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

        <div style={{ marginBottom: 10 }}>
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

        <div style={{ marginBottom: 20 }}>
          <label>
            Повторите пароль
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="Повтор пароля"
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
          {loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}
