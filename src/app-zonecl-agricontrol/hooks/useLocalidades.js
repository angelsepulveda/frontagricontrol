import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { fetchEstados } from '../../shared/store/slices/estados';
import localidadesService, {
	getAll,
	getOne,
} from '../services/localidadesService';
import useComunas from './useComunas';

const useLocalidades = () => {
	const { callEndpoint } = useFetchAndLoad();
	const dispatch = useDispatch();
	const { comunas, loadComunas } = useComunas();
	const { list: estados } = useSelector((state) => state.estados);
	const [localidadesStore, setLocalidadesStore] = useState([]);

	const loadData = async () => {
		try {
			setLocalidadesStore(
				new CustomStore({
					key: 'codLocalidad',
					load: () => loadDataLocalidades(),
					insert: (values) => loadDataGetOne(),
					update: (key, values) => localidadesService.update(key, values),
					remove: (key) => localidadesService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataLocalidades = async () => {
		const data = await callEndpoint(getAll());
		await loadComunas();

		if (estados.length <= 0) dispatch(fetchEstados());

		return data;
	};

	const loadDataGetOne = async () => {
		return await callEndpoint(getOne());
	};

	return {
		estados,
		localidadesStore,
		comunas,
		loadData,
	};
};

export default useLocalidades;
