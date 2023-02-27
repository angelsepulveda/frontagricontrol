import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchContratistas } from '../../../shared/store/slices/contratistas';
import { fetchCuadrillas } from '../../../shared/store/slices/cuadrillas';
import { fetchSexos } from '../../../shared/store/slices/sexos';

const useCargaMasivaTrabajadores = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { listSelect: cuadrillas } = useSelector((state) => state.cuadrillas);
	const { listSelect: contratistas } = useSelector(
		(state) => state.contratistas,
	);
	const { listSelect: sexos } = useSelector((state) => state.sexos);
	const { list: regiones } = useSelector((state) => state.regiones);

	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);

		if (cuadrillas.length <= 0) dispatch(fetchCuadrillas());

		if (contratistas.length <= 0) dispatch(fetchContratistas());

		if (sexos.length <= 0) dispatch(fetchSexos());

		setIsLoading(false);
	}, []);

	return {
		cuadrillas,
		contratistas,
		sexos,
		regiones,
		isLoading,
		setIsLoading,
	};
};

export default useCargaMasivaTrabajadores;
