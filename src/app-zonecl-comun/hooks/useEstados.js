import { useState } from 'react';

import estadosService from '../services/estadosService';

const useEstados = () => {
	const [estados, setEstados] = useState([]);

	const loadEstados = async () => {
		setEstados(await estadosService.getAll());
	};

	return { estados, loadEstados };
};

export default useEstados;
