import { useState } from 'react';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { getAll } from '../services/bancosService';

const useBancos = () => {
	const [bancos, setBancos] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const loadBancos = async () => {
		setBancos(await callEndpoint(getAll()));
	};

	return {
		bancos,
		loadBancos,
	};
};

export default useBancos;
