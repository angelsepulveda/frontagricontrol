import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { fetchCampos } from '../../shared/store/slices/campos';
import { fetchEstados } from '../../shared/store/slices/estados';
import sectoresService, {
	findSelect,
	getAll,
	search,
} from '../services/sectoresService';

const useSectores = () => {
	const dispatch = useDispatch();
	const [sectoresStore, setSectoresStore] = useState([]);
	const [sectores, setSectores] = useState([]);
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: campos } = useSelector((state) => state.campos);
	const { callEndpoint } = useFetchAndLoad();

	const loadData = async () => {
		try {
			setSectoresStore(
				new CustomStore({
					key: 'codSector',
					load: () => loadDataGrid(),
					insert: (values) => sectoresService.insert(values),
					update: (key, values) => sectoresService.update(key, values),
					remove: (key) => sectoresService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGrid = async () => {
		const data = await callEndpoint(getAll());

		dispatch(fetchCampos());

		if (estados.length <= 0) dispatch(fetchEstados());

		return data;
	};

	const loadSectores = async () => {
		setSectores(await callEndpoint(findSelect()));
	};

	const searchSectores = async (codCampo) => {
		setSectores(await callEndpoint(search(codCampo)));
	};

	return {
		sectores,
		loadSectores,
		searchSectores,
		estados,
		campos,
		sectoresStore,
		loadData,
	};
};

export default useSectores;
