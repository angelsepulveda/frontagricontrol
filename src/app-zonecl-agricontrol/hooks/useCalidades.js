import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { fetchEstados } from '../../shared/store/slices/estados';
import calidadesService, {
	findSelect,
	getAll,
} from '../services/calidadesService';

const useCalidades = () => {
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { callEndpoint } = useFetchAndLoad();
	const [calidadesStore, setCalidadesStore] = useState([]);
	const [calidades, setCalidades] = useState([]);

	const loadData = async () => {
		try {
			setCalidadesStore(
				new CustomStore({
					key: 'codCalidad',
					load: () => loadDataGrid(),
					update: (key, values) => calidadesService.update(key, values),
					remove: (key) => calidadesService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGrid = async () => {
		const data = await callEndpoint(getAll());

		if (estados.length <= 0) dispatch(fetchEstados());

		return data;
	};

	const loadCalidades = async () => {
		setCalidades(await callEndpoint(findSelect()));
	};

	return {
		estados,
		calidades,
		calidadesStore,
		loadData,
		loadCalidades,
	};
};

export default useCalidades;
