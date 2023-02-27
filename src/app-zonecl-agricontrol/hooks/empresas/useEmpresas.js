import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import empresasService, { getAll } from '../../services/empresasService';

const useEmpresas = () => {
	const navigate = useNavigate();

	const [empresas, setEmpresas] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const [empresasStore, setEmpresasStore] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});

	const loadData = async () => {
		try {
			setButtonAddGrid({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'add',
					onClick: () => {
						navigate('/empresas/nuevo');
					},
				},
			});
			setEmpresasStore(
				new CustomStore({
					key: 'codEmpresa',
					load: () => loadDataGrid(),
					insert: (values) => empresasService.insert(values),
					update: (key, values) => empresasService.update(key, values),
					remove: (key) => empresasService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGrid = async () => {
		const data = await callEndpoint(getAll());
		setEmpresas(data);
		return data;
	};
	const loadEmpresas = async () => {
		setEmpresas(await callEndpoint(getAll()));
	};

	return {
		empresas,
		loadData,
		empresasStore,
		buttonAddGrid,
		loadEmpresas,
	};
};

export default useEmpresas;
