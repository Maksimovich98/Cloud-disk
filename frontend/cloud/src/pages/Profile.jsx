// src/pages/Profile.jsx
import React, { useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

const db = getFirestore()

export default function Profile() {
  const user = useContext(AuthContext)
  const [form, setForm] = useState({
    displayName: user.displayName || '',
    email:       user.email,
    phone:      (user.phoneNumber) || '',
    currentPass: '',
    newPass:    '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage(''); setLoading(true)

    try {
      // 1) Обновляем displayName
      if (form.displayName !== user.displayName) {
        await updateProfile(user, { displayName: form.displayName })
      }

      // 2) Обновляем email
      if (form.email !== user.email) {
        await updateEmail(user, form.email)
      }

      // 3) Обновляем телефон — сохраняем в Firestore под документом uid
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, { phone: form.phone }, { merge: true })

      // 4) Обновляем пароль (если задан)
      if (form.currentPass && form.newPass) {
        // Сначала реаутентификация
        const cred = EmailAuthProvider.credential(user.email, form.currentPass)
        await reauthenticateWithCredential(user, cred)
        await updatePassword(user, form.newPass)
      }

      setMessage('Данные успешно обновлены.')
    } catch (err) {
      console.error(err)
      setMessage(`Ошибка: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Настройки профиля</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <label>
          Имя:
          <input name="displayName" value={form.displayName} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>

        <label>
          Телефон:
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>

        <hr/>

        <label>
          Текущий пароль (для смены пароля):
          <input type="password" name="currentPass" value={form.currentPass} onChange={handleChange} />
        </label>

        <label>
          Новый пароль:
          <input type="password" name="newPass" value={form.newPass} onChange={handleChange} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </form>
    </div>
  )
}
