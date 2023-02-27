import { useState } from 'react';

import tiposEquiposService from '../services/tiposEquiposService';

const useTiposEquipos = () => {
	const [tiposEquipos, setTiposRecolecciones] = useState([]);

	const loadTiposEquipos = async () => {
		setTiposRecolecciones(await tiposEquiposService.getAll());
	};

	return {
		tiposEquipos,
		loadTiposEquipos,
	};
};

export default useTiposEquipos;
