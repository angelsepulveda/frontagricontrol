import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchCampos } from '../../../shared/store/slices/campos';
import { setCuartelesList } from '../../../shared/store/slices/cuarteles';
import { fetchEstados } from '../../../shared/store/slices/estados';
import cuartelesService from '../../services/cuartelesService';
import useSectores from '../useSectores';

const useCuarteles = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: campos } = useSelector((state) => state.campos);
	const { listSelect: cuarteles } = useSelector((state) => state.cuarteles);
	const { sectores, loadSectores } = useSectores();

	const [cuartelesStore, setCuartelesStore] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});
	const loadData = async () => {
		try {
			setButtonAddGrid({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'add',
					onClick: () => {
						navigate(`/cuarteles/nuevo`);
					},
				},
			});
			setCuartelesStore(
				new CustomStore({
					key: 'codCuartel',
					load: () => loadDataGrid(),
					insert: (values) => cuartelesService.insert(values),
					update: (key, values) => cuartelesService.update(key, values),
					remove: (key) => cuartelesService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGrid = async () => {
		const data = await cuartelesService.getAll();
		if (estados <= 0) {
			dispatch(fetchEstados());
		}
		dispatch(fetchCampos());
		await loadSectores();
		dispatch(setCuartelesList(data));
		return data;
	};

	return {
		estados,
		campos,
		sectores,
		loadData,
		cuartelesStore,
		buttonAddGrid,
		navigate,
		cuarteles,
		dispatch,
	};
};

export default useCuarteles;
