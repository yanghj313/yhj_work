import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/local`, {
        identifier,
        password,
      });
      const { jwt, user } = res.data;
      localStorage.setItem('token', jwt);
      onLogin(user);
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
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
