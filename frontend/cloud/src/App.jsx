import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home     from './pages/Home';
import Login    from './pages/Login';
import Register from './pages/Register';
import Disk     from './pages/Disk';
import Profile  from './pages/Profile';
import Header   from './components/Header';
import Footer   from './components/Footer';


export default function App() {
  const isAuth = Boolean(localStorage.getItem('accessToken'));

  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/disk" replace /> : <Home />}
          />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/disk"
            element={isAuth ? <Disk /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}