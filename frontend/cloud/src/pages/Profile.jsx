import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Временно — подставляем тестовые данные
    const demoUser = {
      name: 'Иван Иванов',
      email: 'ivan@example.com'
    }
    setUser(demoUser)

    // Когда появится настоящий API, раскомментируйте этот блок:
    /*
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/me')
        setUser(data.user)
      } catch {
        navigate('/login')
      }
    }
    fetchProfile()
    */
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  if (!user) return <p>Загрузка профиля…</p>

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h1>Профиль</h1>
      <p>
        <strong>Имя:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: 20,
          padding: '10px 20px',
          border: 'none',
          background: '#333',
          color: '#fff',
          cursor: 'pointer',
          borderRadius: 4
        }}
      >
        Выйти
      </button>
    </div>
  )
}
