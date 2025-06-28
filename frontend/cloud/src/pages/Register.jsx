import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // Отправляем запрос на ваш backend API
      await axios.post('/api/auth/register', {
        email,
        password,
        name
      })
      // После успешной регистрации — перенаправляем на логин
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Ошибка регистрации: ' + (err.response?.data?.message || err.message))
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
        <br />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  )
}
