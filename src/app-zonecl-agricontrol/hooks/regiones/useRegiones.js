import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import useModal from '../../../shared/hooks/useModal';
import { fetchEstados } from '../../../shared/store/slices/estados';
import { fetchPaises } from '../../../shared/store/slices/paises';
import regionesService, {
	findSelect,
	getAll,
} from '../../services/regionesService';

const useRegiones = () => {
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: paises } = useSelector((state) => state.paises);
	const { open, handleOpen, handleClose } = useModal();
	const { callEndpoint } = useFetchAndLoad();
	const [regionesStore, setRegionesStore] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});
	const [regiones, setRegiones] = useState([]);

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
			setRegionesStore(
				new CustomStore({
					key: 'codRegion',
					load: () => loadDataGridRegion(),
					remove: (key) => regionesService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGridRegion = async () => {
		const data = await callEndpoint(getAll());

		dispatch(fetchPaises());

		if (estados <= 0) dispatch(fetchEstados());

		return data;
	};

	const loadRegiones = async () => {
		setRegiones(await callEndpoint(findSelect()));
	};

	return {
		paises,
		regionesStore,
		loadData,
		loadRegiones,
		open,
		handleOpen,
		handleClose,
		regiones,
		buttonAddGrid,
		estados,
	};
};

export default useRegiones;
