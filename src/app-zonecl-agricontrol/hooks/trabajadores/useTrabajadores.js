import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import { fetchComunas } from '../../../shared/store/slices/comunas';
import { fetchContratistas } from '../../../shared/store/slices/contratistas';
import { fetchCuadrillas } from '../../../shared/store/slices/cuadrillas';
import { fetchEstados } from '../../../shared/store/slices/estados';
import { fetchPaises } from '../../../shared/store/slices/paises';
import { setTrabajadoresList } from '../../../shared/store/slices/trabajadores';
import { dataFormasPagos, dataGrupoBins } from '../../data/trabajadores';
import trabajadoresService, {
	findTrabajadoresActives,
	getAll,
} from '../../services/trabajadoresService';

const useTrabajadores = () => {
	const navigate = useNavigate();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: contratistas } = useSelector(
		(state) => state.contratistas,
	);
	const { listSelect: cuadrillas } = useSelector((state) => state.cuadrillas);
	const { listSelect: paises } = useSelector((state) => state.paises);
	const { listSelect: comunas } = useSelector((state) => state.comunas);
	const dispatch = useDispatch();
	const { callEndpoint } = useFetchAndLoad();
	const [trabajadores, setTrabajadores] = useState([]);
	const [trabajadoresStore, setTrabajadoresStore] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});

	const loadData = async () => {
		try {
			setButtonAddGrid({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'add',
					onClick: () => {
						navigate('/trabajadores/nuevo');
					},
				},
			});
			setTrabajadoresStore(
				new CustomStore({
					key: 'codTrabajador',
					load: () => loadDataGrid(dataFormasPagos, dataGrupoBins),
					insert: (values) => trabajadoresService.insert(values),
					remove: (key) => trabajadoresService.del(key),
				}),
			);
			//await loadCuadrillas();
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadCargaMasiva = () => {
		navigate('/trabajadores/carga-masiva');
	};

	const loadDataGrid = async (dataFormasPagos, dataGrupoBins) => {
		const data = await callEndpoint(getAll());

		if (estados.length <= 0) dispatch(fetchEstados());

		dispatch(fetchCuadrillas());
		dispatch(fetchPaises());
		dispatch(fetchContratistas());
		dispatch(setTrabajadoresList(data));
		dispatch(fetchComunas());
		return data;
	};
	const loadTrabajadores = async () => {
		setTrabajadores(await callEndpoint(getAll()));
	};

	const loadTrabajadoresActives = async (codTrabajador) => {
		setTrabajadores(await callEndpoint(findTrabajadoresActives(codTrabajador)));
	};

	return {
		trabajadores,
		buttonAddGrid,
		trabajadoresStore,
		paises,
		contratistas,
		cuadrillas,
		estados,
		loadData,
		loadTrabajadores,
		loadTrabajadoresActives,
		navigate,
		loadCargaMasiva,
		comunas,
	};
};

export default useTrabajadores;
