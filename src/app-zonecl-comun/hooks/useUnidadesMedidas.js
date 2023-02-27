import { useState } from 'react';

import unidadesMedidasService from '../services/unidadesMedidasService';

const useUnidadesMedidas = () => {
	const [unidadesMedidas, setUnidadesMedidas] = useState([]);

	const loadUnidadesMedidas = async () => {
		setUnidadesMedidas(await unidadesMedidasService.getAll());
	};

	return {
		unidadesMedidas,
		loadUnidadesMedidas,
	};
};

export default useUnidadesMedidas;

