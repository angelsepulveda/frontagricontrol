import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import { fetchCampos } from '../../../shared/store/slices/campos';
import { setCuadrillasList } from '../../../shared/store/slices/cuadrillas';
import { fetchEstados } from '../../../shared/store/slices/estados';
import cuadrillasService, { getAll } from '../../services/cuadrillasService';
import useTrabajadores from '../trabajadores/useTrabajadores';
import useEquipos from '../useEquipos';

const useCuadrillas = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: campos } = useSelector((state) => state.campos);
	const { callEndpoint } = useFetchAndLoad();
	const { equipos, loadEquipos } = useEquipos();
	const { trabajadores, loadTrabajadores } = useTrabajadores();

	const [cuadrillasStore, setCuadrillasStore] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});
	const [cuadrillas, setCuadrillas] = useState({
		codCampo: null,
		codCuadrilla: 0,
		codEstado: null,
		nemoTecnico: '',
		codJefeCuadrilla: '0',
		imeiEquipo: null,
		cuadrilla: '',
		trabajadores: null,
	});

	const [formVisible, setFormVisible] = useState(false);

	const loadData = async () => {
		try {
			setButtonAddGrid({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'add',
					onClick: () => {
						navigate('/cuadrillas/nuevo');
					},
				},
			});
			setCuadrillasStore(
				new CustomStore({
					key: 'codCuadrilla',
					load: () => loadDataGrid(),
					remove: (key) => cuadrillasService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGrid = async () => {
		const data = await callEndpoint(getAll());
		if (estados.length <= 0) dispatch(fetchEstados());

		dispatch(fetchCampos());

		await loadEquipos();
		await loadTrabajadores();
		dispatch(setCuadrillasList(data));
		return data;
	};

	const formVisibleChange = () => {
		setFormVisible(!formVisible);
	};

	const loadCuadrillas = async () => {
		setCuadrillas(await callEndpoint(getAll()));
	};

	return {
		campos,
		estados,
		equipos,
		trabajadores,
		cuadrillasStore,
		setCuadrillas,
		loadCuadrillas,
		loadData,
		buttonAddGrid,
		formVisible,
		cuadrillas,
		formVisibleChange,
		navigate,
	};
};

export default useCuadrillas;
