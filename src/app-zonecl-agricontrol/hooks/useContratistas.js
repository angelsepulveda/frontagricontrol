import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { fetchEstados } from '../../shared/store/slices/estados';
import contratistasService, {
	findSelect,
	getAll,
} from '../services/contratistasService';

const useContratistas = () => {
	const { callEndpoint } = useFetchAndLoad();
	const [contratistasStore, setContratistasStore] = useState([]);
	const [contratistas, setContratistas] = useState([]);
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);

	const loadData = async () => {
		try {
			setContratistasStore(
				new CustomStore({
					key: 'codContratista',
					load: () => loadDataGrid(),
					insert: (values) => contratistasService.insert(values),
					update: (key, values) => contratistasService.update(key, values),
					remove: (key) => contratistasService.del(key),
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
	const loadContratistas = async () => {
		setContratistas(await callEndpoint(findSelect()));
	};

	return {
		estados,
		contratistasStore,
		loadData,
		contratistas,
		loadContratistas,
	};
};

export default useContratistas;
