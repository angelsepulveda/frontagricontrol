import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import camposService, { getAll, select } from '../services/camposService';
import useEmpresas from './empresas/useEmpresas';

const useCampos = () => {
	const { callEndpoint } = useFetchAndLoad();
	const [camposStore, setCampoStore] = useState([]);
	const { empresas, loadEmpresas } = useEmpresas();
	const [buttonAdd, setButtonAdd] = useState(true);
	const [campo, setCampo] = useState(
		localStorage.getItem('codCampo') ? localStorage.getItem('codCampo') : '0',
	);

	const loadData = async () => {
		try {
			setCampoStore(
				new CustomStore({
					key: 'codCampo',
					load: () => loadDatagrid(),
					insert: (values) => camposService.insert(values),
					update: (key, values) => camposService.update(key, values),
					remove: (key) => camposService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};
	const [campos, setCampos] = useState([]);

	const loadCampos = async () => {
		setCampos(await callEndpoint(select()));
	};

	const loadDatagrid = async () => {
		const data = await callEndpoint(getAll());

		await loadEmpresas();
		loadUser();
		return data;
	};

	const loadUser = () => {
		const dataUser = localStorage.getItem('user');
		const userObject = JSON.parse(dataUser);

		if (userObject.role !== 2) {
			setButtonAdd(true);
		} else {
			setButtonAdd(false);
		}
	};

	const loadCamposDefault = async () => {
		if (campos.length === 0) {
			const { data } = await select().call;
			const campoDefault = { codCampo: '0', campo: 'TODOS LOS CAMPOS' };
			setCampos([...data, campoDefault]);
		}
	};

	const loadDatosCampos = async () => {
		const { data } = await select().call;
		setCampos(data);
	};

	return {
		empresas,
		camposStore,
		loadData,
		campos,
		loadCampos,
		loadEmpresas,
		loadCamposDefault,
		loadDatosCampos,
		campo,
		setCampo,
		buttonAdd,
	};
};
export default useCampos;
