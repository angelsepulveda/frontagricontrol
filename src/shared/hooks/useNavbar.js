import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { appContext } from '../layouts/LayoutAdmin';
import authService from '../services/authService';

const useNavbar = () => {
	const app = useContext(appContext);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorLanguage, setAnchorLanguage] = useState(null);
	const [user, setUser] = useState({});
	const [imageLanguage, setImageLanguage] = useState('');
	const { t, i18n } = useTranslation('global');

	useEffect(() => {
		languageValidation();
	}, []);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const languageValidation = () => {
		const lng = localStorage.getItem('language');

		if (lng !== null) {
			if (lng === 'es') {
				setImageLanguage(
					'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
				);
			} else {
				setImageLanguage(
					'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
				);
			}
		} else {
			setImageLanguage(
				'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
			);
		}
	};

	const handleOpenLanguageMenu = (event) => {
		setAnchorLanguage(event.currentTarget);
	};

	useEffect(() => {
		setUser(app.user);
	}, [user]);

	const changeLanguage = async (lng) => {
		await i18n.changeLanguage(lng);
		localStorage.setItem('language', lng);
		document.location.reload();
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleCloseLanguageMenu = () => {
		setAnchorLanguage(null);
	};

	const navigate = useNavigate();

	const settings = [
		{
			key: 0,
			text: t('common.perfil'),
			onClick: () => {
				handleCloseUserMenu();
			},
		},
		{
			key: 1,
			text: t('common.cerrarSesion'),
			onClick: async () => {
				await authService.logout();
				//handleCloseUserMenu();
				navigate('/login');
			},
		},
	];

	const languages = [
		{
			key: 0,
			text: t('lenguaje.es'),
			onClick: async () => {
				await changeLanguage('es');
			},
		},
		{
			key: 1,
			text: t('lenguaje.en'),
			onClick: async () => {
				await changeLanguage('en');
			},
		},
	];

	return {
		languages,
		settings,
		imageLanguage,
		handleOpenUserMenu,
		handleOpenLanguageMenu,
		handleCloseUserMenu,
		handleCloseLanguageMenu,
		anchorLanguage,
		anchorElUser,
		user,
		t,
	};
};

export default useNavbar;
