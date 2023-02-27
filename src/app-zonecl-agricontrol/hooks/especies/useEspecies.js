import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import useModal from '../../../shared/hooks/useModal';
import { fetchEstados } from '../../../shared/store/slices/estados';
import especiesService, {
	findSelect,
	getAll,
} from '../../services/especiesService';

const useEspecies = () => {
	const { open, handleOpen, handleClose } = useModal();
	const { callEndpoint } = useFetchAndLoad();

	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const [especiesStore, setEspeciesStore] = useState([]);
	const [especies, setEspecies] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});
	const [especie, setEspecie] = useState(
		localStorage.getItem('codEspecie')
			? localStorage.getItem('codEspecie')
			: '0',
	);

	async function loadData() {
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
			setEspeciesStore(
				new CustomStore({
					key: 'codEspecie',
					load: () => loadDataGrid(),
					remove: (key) => especiesService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	}

	const loadDataGrid = async () => {
		const data = await callEndpoint(getAll());
		if (estados.length <= 0) dispatch(fetchEstados());
		return data;
	};
	const loadEspecies = async () => {
		const { data } = await findSelect().call;
		setEspecies(data);

		return data;
	};

	const loadEspeciesDefault = async () => {
		if (especies.length === 0) {
			const { data } = await findSelect().call;
			const especieDefault = { codEspecie: '0', especie: 'TODAS LAS ESPECIES' };
			setEspecies([...data, especieDefault]);
		}
	};

	return {
		open,
		loadData,
		especiesStore,
		estados,
		handleClose,
		loadEspecies,
		loadEspeciesDefault,
		especies,
		buttonAddGrid,
		especie,
		setEspecie,
	};
};

export default useEspecies;
