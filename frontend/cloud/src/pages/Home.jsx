// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // создайте рядом файл Home.css с вашими стилями

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Первый экран */}
      <section className="home__hero">
        <h1 className="home__title">SecureCloud</h1>
        <p className="home__subtitle">
          Ваш личный и корпоративный облачный диск — просто, надёжно, современно.
        </p>
        <div className="home__buttons">
          <button
            className="home__button home__button--primary"
            onClick={() => navigate('/register')}
          >
            Начать бесплатно
          </button>
          <button
            className="home__button home__button--secondary"
            onClick={() => navigate('/login')}
          >
            Войти в аккаунт
          </button>
        </div>
      </section>

      {/* Блок преимуществ */}
      <section className="home__features">
        <h2 className="home__features-title">Преимущества</h2>
        <div className="home__grid">
          <div className="home__card">
            <h3 className="home__card-title">Безопасность</h3>
            <p className="home__card-text">
              Шифрование данных на сервере и в транзите по HTTPS.
            </p>
          </div>
          <div className="home__card">
            <h3 className="home__card-title">Шаринг</h3>
            <p className="home__card-text">
              Делитесь файлами с коллегами и друзьями одним кликом.
            </p>
          </div>
          <div className="home__card">
            <h3 className="home__card-title">Мультиплатформенность</h3>
            <p className="home__card-text">
              Web, iOS, Android и десктоп в одном сервисе.
            </p>
          </div>
          <div className="home__card">
            <h3 className="home__card-title">Удобство</h3>
            <p className="home__card-text">
              Drag &amp; drop, предпросмотр без скачивания.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
