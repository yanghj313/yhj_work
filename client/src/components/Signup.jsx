import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();

	const handleSignup = async e => {
		e.preventDefault();
		setErrorMsg('');

		try {
			await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/local/register`, {
				username,
				email,
				password,
			});
			alert('회원가입이 정상적으로 완료되었습니다.');
			navigate('/');
		} catch (err) {
			if (err.response?.data?.error?.message.includes('Email')) {
				setErrorMsg('이미 사용 중인 이메일입니다.');
			} else if (err.response?.data?.error?.message.includes('Username')) {
				setErrorMsg('이미 사용 중인 닉네임입니다.');
			} else {
				setErrorMsg('회원가입 실패! 다시 시도해 주세요.');
			}
		}
	};

	return (
		<form onSubmit={handleSignup}>
			<h2>Join</h2>
			{errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
			<input type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} />
			<input type="email" placeholder="E-Main" value={email} onChange={e => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
			<button type="submit">Join</button>
		</form>
	);
};

export default Signup;
