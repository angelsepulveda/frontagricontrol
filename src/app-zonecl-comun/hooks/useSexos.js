import { useState } from 'react';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { getAll } from '../services/sexosService';

const useSexos = () => {
	const [sexos, setSexos] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const loadSexos = async () => {
		setSexos(await callEndpoint(getAll()));
	};

	return {
		sexos,
		loadSexos,
	};
};

export default useSexos;
