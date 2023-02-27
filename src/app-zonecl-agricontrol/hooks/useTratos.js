import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { fetchEstados } from '../../shared/store/slices/estados';
import tratoService, { getAll } from '../services/tratoService';
import useCampos from './useCampos';
import useFormatosCosechas from './useFormatosCosechas';

const useTratos = () => {
	const { campos, loadCampos } = useCampos();
	const { formatosCosechas, loadFormatosCosechas } = useFormatosCosechas();
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);

	const [tratosStore, setTratoStore] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const loadData = async () => {
		try {
			setTratoStore(
				new CustomStore({
					key: 'codTrato',
					load: () => loadDataGrid(),
					insert: (values) => tratoService.insert(values),
					update: (key, values) => tratoService.update(key, values),
					remove: (key) => tratoService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGrid = async () => {
		const data = await callEndpoint(getAll());
		await loadCampos();

		if (estados.length <= 0) dispatch(fetchEstados());

		await loadFormatosCosechas();
		return data;
	};
	return {
		estados,
		campos,
		formatosCosechas,
		tratosStore,
		loadData,
	};
};
export default useTratos;
