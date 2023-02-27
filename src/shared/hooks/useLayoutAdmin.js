import { useEffect, useState } from 'react';

import useEstados from '../../app-zonecl-comun/hooks/useEstados';
import useUsuarios from './usuarios/useUsuarios';

const useLayoutAdmin = () => {
	const { estados, loadEstados } = useEstados();
	const { user, loadUser } = useUsuarios();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	useEffect(() => {
		loadUser();
		loadEstados();
	}, []);

	return {
		estados,
		handleDrawerToggle,
		mobileOpen,
		user,
	};
};

export default useLayoutAdmin;
