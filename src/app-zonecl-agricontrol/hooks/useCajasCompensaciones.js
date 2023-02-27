import { useState } from 'react';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { getAll } from '../services/cajaCompensacionesService';

const useCajasCompensaciones = () => {
	const [cajasCompensaciones, setCajasCompensaciones] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const loadCajasCompensaciones = async () => {
		setCajasCompensaciones(await callEndpoint(getAll()));
	};

	return {
		cajasCompensaciones,
		loadCajasCompensaciones,
	};
};

export default useCajasCompensaciones;
