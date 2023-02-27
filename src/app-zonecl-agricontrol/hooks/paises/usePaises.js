import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import useModal from '../../../shared/hooks/useModal';
import { fetchEstados } from '../../../shared/store/slices/estados';
import paisesService, {
	findSelect,
	getAll,
} from '../../services/paisesService';

const usePaises = () => {
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { open, handleOpen, handleClose } = useModal();
	const { callEndpoint } = useFetchAndLoad();
	const [paisesStore, setPaisesStore] = useState([]);
	const [paises, setPaises] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});

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
			setPaisesStore(
				new CustomStore({
					key: 'codPais',
					load: () => loadDataGridPaises(),
					remove: (key) => paisesService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGridPaises = async () => {
		const data = await callEndpoint(getAll());

		if (estados.length <= 0) {
			dispatch(fetchEstados());
		}

		return data;
	};

	const loadPaises = async () => {
		setPaises(await callEndpoint(findSelect()));
	};

	return {
		estados,
		paisesStore,
		open,
		buttonAddGrid,
		loadData,
		handleOpen,
		handleClose,
		paises,
		loadPaises,
	};
};

export default usePaises;
