import { useState } from 'react';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { getAll } from '../services/estadosCivilesService';

const useEstadosCiviles = () => {
	const [estadosCiviles, setEstadosCiviles] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const loadEstadosCiviles = async () => {
		setEstadosCiviles(await callEndpoint(getAll()));
	};

	return {
		estadosCiviles,
		loadEstadosCiviles,
	};
};

export default useEstadosCiviles;
