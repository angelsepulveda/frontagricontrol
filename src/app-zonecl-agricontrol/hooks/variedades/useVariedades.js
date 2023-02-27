import CustomStore from 'devextreme/data/custom_store';
import { useContext, useState } from 'react';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import useModal from '../../../shared/hooks/useModal';
import { appContext } from '../../../shared/layouts/LayoutAdmin';
import variedadesService, {
	findSelect,
	getAll,
} from '../../services/variedadesService';
import useEspecies from '../especies/useEspecies';

const useVariedades = () => {
	const { open, handleOpen, handleClose } = useModal();
	const { callEndpoint } = useFetchAndLoad();
	const app = useContext(appContext);
	const [estados, setEstados] = useState([]);
	const { especies, loadEspecies } = useEspecies();
	const [variedades, setVariedades] = useState([]);
	const [variedadesStore, setVariedadesStore] = useState([]);
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
			setVariedadesStore(
				new CustomStore({
					key: 'codVariedad',
					load: () => loadDataGrid(),
					remove: (key) => variedadesService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadVariedades = async () => {
		setVariedades(await callEndpoint(findSelect()));
	};

	const loadDataGrid = async () => {
		const data = await callEndpoint(getAll());
		setEstados(app.estados);
		await loadEspecies();
		return data;
	};
	return {
		variedades,
		loadVariedades,
		estados,
		especies,
		loadData,
		variedadesStore,
		handleOpen,
		handleClose,
		open,
		buttonAddGrid,
	};
};

export default useVariedades;
