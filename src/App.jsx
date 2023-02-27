import './App.css';

import { loadMessages, locale } from 'devextreme/localization';
import esMessages from 'devextreme/localization/messages/es.json';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import routes from './shared/config/routes';
import LayoutAdmin from './shared/layouts/LayoutAdmin';
import Login from './shared/pages/Login';
import NotFound from './shared/pages/NotFound';
import authService from './shared/services/authService';
import store from './shared/store';

export default function App() {
	// configuracion devXtreme
	loadMessages(esMessages);
	// location
	const location = useLocation();
	// eslint-disable-next-line no-unused-vars
	const { t, i18n } = useTranslation('global');

	const [isAuthenticated, setIsAuthenticated] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('token');
		// si el token esta en el localstorage, se verifica que sea valido y agrega a axios para las peticiones
		if (token && !authService.isTokenExpired(token)) {
			setIsAuthenticated(true);
		} else {
			// delete axios.defaults.headers.Authorization;
			// localStorage.removeItem('token');
			setIsAuthenticated(false);
		}

		changeLanguage();
	}, [location]);

	const changeLanguage = async () => {
		const lng = localStorage.getItem('language');
		if (lng !== null) {
			locale(lng);
			await i18n.changeLanguage(lng);
		} else {
			locale('es');
			await i18n.changeLanguage('es');
			localStorage.setItem('language', 'es');
		}
	};

	return (
		<Provider store={store}>
			<Routes>
				<Route
					exact
					path="/login"
					element={
						isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
					}
				/>
				<Route
					exact
					path="/"
					element={isAuthenticated ? <LayoutAdmin /> : <Navigate to="/login" />}
				>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							element={<route.component />}
						/>
					))}
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Provider>
	);
}
