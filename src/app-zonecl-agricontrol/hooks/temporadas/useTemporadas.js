import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useModal from '../../../shared/hooks/useModal';
import { fetchEspecies } from '../../../shared/store/slices/especies';
import { fetchEstados } from '../../../shared/store/slices/estados';
import temporadasService from '../../services/temporadasService';

const useTemporadas = () => {
	const { list: estados } = useSelector((state) => state.estados);
	const [temporadasStore, setTemporadasStore] = useState([]);
	const { listSelect: especies } = useSelector((state) => state.especies);
	const { open, handleOpen, handleClose } = useModal();
	const [formModal, setFormModal] = useState(false);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [temporada, setTemporada] = useState({
		codTemporada: 0,
		codEspecie: 0,
		inicio: null,
		termino: null,
		codEstado: null,
	});

	const [buttonAddGrid, setButtonAddGrid] = useState({});

	const loadData = async () => {
		try {
			setFormModal(false);
			setButtonAddGrid({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'add',
					onClick: () => {
						setFormModal(true);
						handleOpen();
					},
				},
			});
			setTemporadasStore(
				new CustomStore({
					key: 'codTemporada',
					load: () => dataGridLoad(),
					insert: (values) => temporadasService.insert(values),
					update: (key, values) => temporadasService.update(key, values),
					remove: (key) => temporadasService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const dataGridLoad = async () => {
		const data = await temporadasService.getAll();

		if (estados.length <= 0) dispatch(fetchEstados());

		dispatch(fetchEspecies());
		return data;
	};
	const handleUpdate = async (codTemporada) => {
		setLoading(true);

		const data = await temporadasService.getOne(codTemporada);
		setTemporada((temporada) => {
			return {
				codTemporada: data.codTemporada,
				codEspecie: data.codEspecie,
				inicio: data.inicio,
				termino: data.termino,
				codEstado: data.codEstado,
				temporada: data.temporada,
			};
		});
		setLoading(false);
		setFormModal(true);
		handleOpen();
	};

	return {
		estados,
		temporadasStore,
		especies,
		loadData,
		open,
		handleClose,
		buttonAddGrid,
		loading,
		temporada,
		handleUpdate,
		setTemporada,
		formModal,
		setFormModal,
	};
};

export default useTemporadas;
