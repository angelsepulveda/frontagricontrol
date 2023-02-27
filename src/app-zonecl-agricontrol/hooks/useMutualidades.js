import { useState } from 'react';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { getAll } from '../services/mutualidadesService';

const useMutualidades = () => {
	const [mutualidades, setMutualidades] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const loadMutualidades = async () => {
		setMutualidades(await callEndpoint(getAll()));
	};

	return { mutualidades, loadMutualidades };
};

export default useMutualidades;
