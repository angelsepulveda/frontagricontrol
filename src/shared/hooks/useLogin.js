import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../services/authService';
import useLoading from './useLoading';

const useLogin = () => {
	const [email, setEmail] = useState('diegomunozparra@gmail.com');
	const [password, setPassword] = useState('123456');
	const { loading, showLoading, hideLoading } = useLoading();

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			showLoading();
			await authService.login(email, password);
			setEmail('');
			setPassword('');
			hideLoading();
			navigate('/dashboard', { replace: true });
		} catch (exception) {
			console.log(exception);
			//const error = axiosError(exception);
		}
	};
	return {
		email,
		setEmail,
		password,
		setPassword,
		handleSubmit,
		loading,
	};
};

export default useLogin;
