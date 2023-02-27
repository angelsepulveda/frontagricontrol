import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTiposEquipos from '../../app-zonecl-comun/hooks/useTiposEquipos';
import useFetchAndLoad from '../../shared/hooks/useFetchAndLoad';
import { fetchEstados } from '../../shared/store/slices/estados';
import equiposService, {
	findEquiposActivos,
	findSelect,
	getAll,
	getOneJefe,
} from '../services/equiposService';

const useEquipos = () => {
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const [equipos, setEquipos] = useState([]);
	const [equiposStore, setEquiposStore] = useState([]);
	const { callEndpoint } = useFetchAndLoad();
	const { tiposEquipos, loadTiposEquipos } = useTiposEquipos();

	const loadData = async () => {
		try {
			setEquiposStore(
				new CustomStore({
					key: 'codEquipo',
					load: () => loadDatGrid(),
					insert: (values) => equiposService.insert(values),
					update: (key, values) => equiposService.update(key, values),
					remove: (key) => equiposService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDatGrid = async () => {
		const data = await callEndpoint(getAll());

		if (estados.length <= 0) dispatch(fetchEstados());

		await loadTiposEquipos();
		return data;
	};

	const loadEquipos = async () => {
		setEquipos(await callEndpoint(findSelect()));
	};

	const loadEquiposActivos = async (cuadrilla) => {
		if (cuadrilla.codCuadrilla === 0) {
			const equipos = await callEndpoint(findEquiposActivos());
			setEquipos(equipos);
		} else {
			const equipos = await callEndpoint(findEquiposActivos());
			const data = await callEndpoint(getOneJefe(cuadrilla.imeiEquipo));
			setEquipos([...equipos, data]);
		}
	};

	return {
		equipos,
		loadEquipos,
		equiposStore,
		loadEquiposActivos,
		setEquipos,
		estados,
		tiposEquipos,
		loadData,
	};
};

export default useEquipos;
