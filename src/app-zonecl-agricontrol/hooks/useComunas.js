import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import useModal from '../../shared/hooks/useModal';
import { fetchEstados } from '../../shared/store/slices/estados';
import comunasService, { findSelect, getAll } from '../services/comunasService';
import useRegiones from './regiones/useRegiones';

const useComunas = () => {
	const { open, handleOpen, handleClose } = useModal();
	const { callEndpoint } = useFetchAndLoad();
	const { regiones, loadRegiones } = useRegiones();
	const [comunas, setComunas] = useState([]);
	const [comunasStore, setComunasStore] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);

	const loadData = async () => {
		try {
			setButtonAddGrid({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'add',
					onClick: () => {
						handleOpen();
					},
				},
			});
			setComunasStore(
				new CustomStore({
					key: 'codComuna',
					load: () => loadDataGridComuna(),
					remove: (key) => comunasService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGridComuna = async () => {
		const data = await callEndpoint(getAll());

		if (estados.length <= 0) dispatch(fetchEstados());

		await loadRegiones();
		return data;
	};

	const loadComunas = async () => {
		setComunas(await callEndpoint(findSelect()));
	};

	return {
		comunas,
		comunasStore,
		buttonAddGrid,
		regiones,
		estados,
		open,
		loadData,
		handleOpen,
		handleClose,
		loadComunas,
	};
};

export default useComunas;
