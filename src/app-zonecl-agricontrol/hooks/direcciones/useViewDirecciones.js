import { useEffect } from 'react';

import useComunas from '../useComunas';

const useViewDirecciones = () => {
	const { comunas, loadComunas } = useComunas();

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		await loadComunas();
	};

	return { comunas };
};

export default useViewDirecciones;
