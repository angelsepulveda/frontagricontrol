import CustomStore from 'devextreme/data/custom_store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { messageValidation } from '../../../shared/helpers/message';
import useModal from '../../../shared/hooks/useModal';
import { fetchCampos } from '../../../shared/store/slices/campos';
import { fetchEstados } from '../../../shared/store/slices/estados';
import cuadrillasService from '../../services/cuadrillasService';
import trabajadoresService from '../../services/trabajadoresService';
import useTrabajadores from '../trabajadores/useTrabajadores';
import useEquipos from '../useEquipos';

const cuadrilla = {
	codCampo: null,
	codCuadrilla: 0,
	codEstado: null,
	nemoTecnico: '',
	codJefeCuadrilla: '0',
	imeiEquipo: null,
	cuadrilla: '',
	trabajadores: null,
};

const useFormCuadrillas = (id) => {
	const navigate = useNavigate();

	const { list: estados } = useSelector((state) => state.estados);
	const dispatch = useDispatch();
	const { listSelect: campos } = useSelector((state) => state.campos);
	const { list: cuadrillas } = useSelector((state) => state.cuadrillas);
	const { equipos, loadEquiposActivos } = useEquipos();
	const { trabajadores, loadTrabajadoresActives } = useTrabajadores();
	const { open, handleOpen, handleClose } = useModal();

	const [formCuadrilla, setFormCuadrilla] = useState({});
	const [nombreJefeCuadrilla, setNombreJefeCuadrilla] = useState('');
	const [loading, setLoading] = useState(false);
	const [trabajadoresCuadrillas, setTrabajadoresCuadrillas] = useState([]);
	const [buttonAddGrid, setButtonAddGrid] = useState({});
	const [trabajadoresCuadrillasStore, setTrabajadoresCuadrillasStore] =
		useState([]);
	const [selectedTrabajadores, setSelectedTrabajadores] = useState([]);
	const [url, setUrl] = useState([]);

	useEffect(() => {
		loadDataForm(id);
	}, []);

	const loadDataForm = async (id) => {
		if (id === undefined) {
			loadingInit();
			setUrl([
				{ name: 'cuadrillas', url: '/cuadrillas' },
				{ name: 'nuevo', url: '/cuadrillas/nuevo' },
			]);
			await loadData(cuadrilla);
			loadTrabajadoresCuadrillas(cuadrilla.trabajadores);
			loadSelectedTrabajadores(cuadrilla.trabajadores);
			loadDataTrabajadoresCuadrillas();
		} else {
			loadingInit();
			setUrl([
				{ name: 'cuadrillas', url: '/cuadrillas' },
				{ name: 'actualizar', url: `/cuadrillas/acuatizar/${id}` },
			]);

			if (cuadrillas.length <= 0) {
				const data = await cuadrillasService.getOne(id);
				await loadData(data);
				loadTrabajadoresCuadrillas(data.trabajadores);
				loadSelectedTrabajadores(data.trabajadores);
				loadDataTrabajadoresCuadrillas(data.trabajadores);
			} else {
				const data = cuadrillas.find((item) => item.codCuadrilla === id);
				await loadData(data);
				const dataTrabajadores = await trabajadoresService.findByCodCuadrilla(
					id,
				);

				loadTrabajadoresCuadrillas(dataTrabajadores);
				loadSelectedTrabajadores(dataTrabajadores);
				loadDataTrabajadoresCuadrillas(dataTrabajadores);
			}
		}

		loadingEnd();
	};

	const loadData = async (cuadrilla) => {
		setFormCuadrilla(cuadrilla);
		if (estados.length <= 0) dispatch(fetchEstados());

		if (campos.length <= 0) dispatch(fetchCampos());

		await loadEquiposActivos(cuadrilla);
		await loadTrabajadoresActives(cuadrilla.codJefeCuadrilla);
	};

	const loadSelectedTrabajadores = (trabajadores) => {
		setSelectedTrabajadores(trabajadores);
	};

	const handleChangeCuadrilla = (e) => {
		setFormCuadrilla({
			...formCuadrilla,
			[e.event.target.name]: e.event.target.value,
		});
	};

	const handleChangeCampo = (e) => {
		setFormCuadrilla({
			...formCuadrilla,
			codCampo: e.value,
		});
	};

	const handleChangeEquipo = (e) => {
		setFormCuadrilla({
			...formCuadrilla,
			imeiEquipo: e.value,
		});
	};

	const handleChangeTrabajador = (e) => {
		setFormCuadrilla({
			...formCuadrilla,
			codJefeCuadrilla: e.value,
		});

		trabajadores.forEach((trabajador) => {
			if (trabajador.codTrabajador === e.value) {
				setNombreJefeCuadrilla(
					trabajador.nombres +
						' ' +
						trabajador.primerApellido +
						' ' +
						trabajador.segundoApellido,
				);
			}
		});
	};

	const loadTrabajadoresCuadrillas = (trabajadores) => {
		setTrabajadoresCuadrillas(trabajadores);
	};

	const handleChangeEstado = (e) => {
		setFormCuadrilla({
			...formCuadrilla,
			codEstado: e.value,
		});
	};

	const loadingInit = () => {
		setLoading(true);
	};

	const loadingEnd = () => {
		setLoading(false);
	};

	const clean = () => {
		setSelectedTrabajadores([]);
		navigate('/cuadrillas');
	};

	const loadDataTrabajadoresCuadrillas = async (trabajadores = null) => {
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
			setTrabajadoresCuadrillasStore(
				new CustomStore({
					key: 'codTrabajador',
					load: () => trabajadores || trabajadoresCuadrillas,
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();

		if (trabajadoresCuadrillas.length > 0) {
			if (
				formCuadrilla.codCuadrilla === 0 ||
				formCuadrilla.codCuadrilla === null
			) {
				loadingInit();
				await cuadrillasService.insert(formCuadrilla, trabajadoresCuadrillas);
				loadingEnd();
				clean();
			} else {
				loadingInit();
				await cuadrillasService.update(formCuadrilla, trabajadoresCuadrillas);
				loadingEnd();
				clean();
			}
		} else {
			const messages = [];
			messages.push({
				value: `Debe agregar al menos un trabajador a la cuadrilla`,
			});
			messageValidation(messages);
		}
	};
	return {
		loadData,
		formCuadrilla,
		estados,
		loading,
		handleChangeCuadrilla,
		handleChangeEstado,
		handleChangeCampo,
		campos,
		equipos,
		trabajadores,
		handleChangeTrabajador,
		nombreJefeCuadrilla,
		trabajadoresCuadrillas,
		handleClose,
		handleChangeEquipo,
		handleOpen,
		open,
		loadDataTrabajadoresCuadrillas,
		trabajadoresCuadrillasStore,
		buttonAddGrid,
		selectedTrabajadores,
		loadSelectedTrabajadores,
		setTrabajadoresCuadrillasStore,
		handleSave,
		loadTrabajadoresCuadrillas,
		navigate,
		url,
	};
};

export default useFormCuadrillas;
