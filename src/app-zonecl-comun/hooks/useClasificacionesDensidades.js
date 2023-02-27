import { useState } from 'react';
import clasificacionesDensidadesServices from '../services/clasificacionesDensidadesServices';

const useClasificacionesDensidades = () => {
	const [clasificacionesDensidades, setClasificacionesDensidades] = useState(
		[],
	);

	const loadClasificacionesDensidades = async () => {
		setClasificacionesDensidades(
			await clasificacionesDensidadesServices.getAll(),
		);
	};

	return {
		clasificacionesDensidades,
		loadClasificacionesDensidades,
	};
};

export default useClasificacionesDensidades;
