import { useState } from 'react';

import tiposRecoleccionesService from '../services/tiposRecoleccionesService';

const useTiposRecolecciones = () => {
	const [tiposRecolecciones, setTiposRecolecciones] = useState([]);

	const loadTiposRecolecciones = async () => {
		setTiposRecolecciones(await tiposRecoleccionesService.getAll());
	};

	return {
		tiposRecolecciones,
		loadTiposRecolecciones,
	};
};

export default useTiposRecolecciones;
