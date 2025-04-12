import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setIdentifier(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/local`, {
        identifier,
        password,
      });
      const { jwt, user } = res.data;
      localStorage.setItem('token', jwt);
      if (remember) {
        localStorage.setItem('savedEmail', user.email);
      } else {
        localStorage.removeItem('savedEmail');
      }
      onLogin(user);
      alert(`${user.username}님, 환영합니다!`);
      navigate(from, { replace: true });
    } catch (err) {
      alert('로그인 실패!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디 또는 이메일"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        아이디 저장
      </label>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
