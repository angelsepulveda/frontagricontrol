import axios from 'axios';

import i18next from '../config/translation';
import { messageError, messageValidation } from '../helpers/message';
import authService from '../services/authService';

axios.defaults.baseURL = 'http://localhost:4000/api'; //process.env.REACT_APP_URL_API_SERVER;
// axios.defaults.withCredentials = true;

const token = localStorage.getItem('token');

axios.defaults.headers.Authorization =
	token && !authService.isTokenExpired(token) ? `Bearer ${token}` : null;

axios.interceptors.request.use(
	function (config) {
		config.headers['Accept-Language'] = localStorage.getItem('language');
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.code === 'ERR_CANCELED') {
			return;
		}
		if (error.response.status === 401) {
			//window.location.replace("/login");
		}

		if (error.response.status === 404) {
			messageError(error.response.data.errores);
		}

		if (error.response.status === 500) {
			i18next.setDefaultNamespace('global');
			messageError(i18next.t('common.errorConexion'));
		}
		if (error.response.status === 422) {
			const errores = error.response.data.errores;
			const erroresArray = Object.values(errores);

			messageValidation(erroresArray);
		}

		return Promise.reject(error);
	},
);
