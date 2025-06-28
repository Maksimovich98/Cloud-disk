// src/pages/Home.jsx
import React, { useContext } from 'react'
import { useNavigate }      from 'react-router-dom'
import AuthContext          from '../context/AuthContext'

// массив данных для блока «Преимущества»
const features = [
  {
    icon: '🔒',
    title: 'Безопасное хранилище',
    desc: 'Ваши файлы шифруются на стороне клиента и хранятся в защищённом облаке.',
  },
  {
    icon: '⚡',
    title: 'Высокая скорость',
    desc: 'Молниеносная загрузка и скачивание благодаря CDN и оптимальным настройкам.',
  },
  {
    icon: '📱',
    title: 'Доступ с любого устройства',
    desc: 'Работайте с файлами на компьютере, планшете или смартфоне без ограничений.',
  },
]

export default function Home() {
  const user = useContext(AuthContext)
  const navigate = useNavigate()

  const goRegister = () => navigate('/register')
  const goLogin    = () => navigate('/login')

  return (
    <div>
      {/* Hero-блок */}
      <section style={styles.hero}>
        <h1 style={styles.title}>SecureCloud</h1>
        <p style={styles.subtitle}>
          Ваш личный и корпоративный облачный диск — просто, надёжно, современно.
        </p>

        {!user && (
          <div style={styles.buttons}>
            <button style={styles.primary} onClick={goRegister}>
              Начать бесплатно
            </button>
            <button style={styles.secondary} onClick={goLogin}>
              Войти в аккаунт
            </button>
          </div>
        )}
      </section>

      {/* Блок преимуществ */}
      <section style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Наши преимущества</h2>
        <div style={styles.featuresGrid}>
          {features.map((f, idx) => (
            <div key={idx} style={styles.featureCard}>
              <div style={styles.icon}>{f.icon}</div>
              <h3 style={styles.featureName}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const styles = {
  hero: {
    textAlign: 'center',
    padding: '80px 20px 60px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '0.5em',
    color: '#1976d2',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '1.5em',
    color: '#555',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
  },
  primary: {
    padding: '10px 20px',
    backgroundColor: '#1976d2',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: 4,
  },
  secondary: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    color: '#333',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: 4,
  },

  featuresSection: {
    maxWidth: 1000,
    margin: '0 auto',
    padding: '60px 20px',
  },
  featuresTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '40px',
    color: '#333',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '30px',
  },
  featureCard: {
    textAlign: 'center',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: 15,
  },
  featureName: {
    fontSize: '1.25rem',
    marginBottom: 10,
    color: '#1976d2',
  },
  featureDesc: {
    fontSize: '1rem',
    color: '#555',
  },
}
