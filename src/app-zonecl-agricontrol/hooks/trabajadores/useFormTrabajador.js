import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { messageValidation } from '../../../shared/helpers/message';
import useLoading from '../../../shared/hooks/useLoading';
import { fetchBancos } from '../../../shared/store/slices/bancos';
import { fetchContratistas } from '../../../shared/store/slices/contratistas';
import { fetchCuadrillas } from '../../../shared/store/slices/cuadrillas';
import { fetchEstados } from '../../../shared/store/slices/estados';
import { fetchEstadosCiviles } from '../../../shared/store/slices/estadosCiviles';
import { fetchPaises } from '../../../shared/store/slices/paises';
import { fetchSexos } from '../../../shared/store/slices/sexos';
import {
	dataFormasPagos,
	dataGrupoBins,
	trabajador,
} from '../../data/trabajadores';
import direccionesService from '../../services/direccionesService';
import trabajadoresService from '../../services/trabajadoresService';
import useDirecciones from '../direcciones/useDirecciones';
import useComunas from '../useComunas.js';

const useFormTrabajador = (id) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { comunas, loadComunas } = useComunas();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: contratistas } = useSelector(
		(state) => state.contratistas,
	);
	const { listSelect: sexos } = useSelector((state) => state.sexos);
	const { listSelect: bancos } = useSelector((state) => state.bancos);
	const { listSelect: paises } = useSelector((state) => state.paises);
	const { listSelect: estadosCiviles } = useSelector(
		(state) => state.estadosCiviles,
	);

	const { listSelect: cuadrillas } = useSelector((state) => state.cuadrillas);

	const { list: trabajadores } = useSelector((state) => state.trabajadores);
	const { loading, showLoading, hideLoading } = useLoading();
	const {
		initDirecciones,
		handleButtonAdd,
		direcciones,
		isRemoveDireccion,
		isAddDireccion,
		handleRemove,
		handleAdd,
		handleChangeComuna,
		handleChangeDireccion,
		handleChangePredeterminada,
		isDisablePredeterminada,
	} = useDirecciones();
	const [formTrabajador, setFormTrabajador] = useState({});

	const [formasPagos, setFormatosPago] = useState([]);
	const [gruposBins, setGruposBins] = useState([]);
	const [url, setUrl] = useState([]);
	const [idTrabajador, setIdTrabajador] = useState(undefined);

	useEffect(() => {
		loadData(id);
		setFormatosPago(dataFormasPagos);
		setGruposBins(dataGrupoBins);
	}, []);

	const initFormTrabajador = (trabajador) => {
		setFormTrabajador(trabajador);
	};

	const loadData = async (id) => {
		try {
			if (id === undefined) {
				showLoading();
				setUrl([
					{ name: 'trabajadores', url: '/trabajadores' },
					{ name: 'nuevo', url: '/trabajadores/nuevo' },
				]);
				initFormTrabajador(trabajador);
				initDirecciones(trabajador.direcciones);
				setIdTrabajador(undefined);
			} else {
				showLoading();
				setUrl([
					{ name: 'trabajadores', url: '/trabajadores' },
					{ name: 'actualizar', url: `/trabajadores/actualizar/${id}` },
				]);

				//se valida si el trabajador ya se encuentra en el store
				if (trabajadores.length <= 0) {
					const trabajadores = await trabajadoresService.getOne(id);
					initFormTrabajador(trabajadores);
					initDirecciones(trabajadores.direcciones);
				} else {
					const trabajador = trabajadores.find(
						(trabajador) => trabajador.codTrabajador === id,
					);
					initFormTrabajador(trabajador);
					const data = await direccionesService.getOne(id);
					initDirecciones(data);
				}

				setIdTrabajador(id);
			}

			//carga de los datos de los selects
			handleButtonAdd();

			await loadComunas();

			dispatch(fetchEstadosCiviles());

			if (paises.length <= 0) dispatch(fetchPaises());

			dispatch(fetchBancos());

			dispatch(fetchSexos());

			if (contratistas.length <= 0) dispatch(fetchContratistas());

			if (cuadrillas.length <= 0) dispatch(fetchCuadrillas());

			if (estados.length <= 0) dispatch(fetchEstados());

			hideLoading();
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const handleSave = async (e) => {
		e.preventDefault();

		let validation = true;

		if (direcciones.length > 0) {
			direcciones.forEach((direccion) => {
				if (direccion.predeterminada === 1) {
					validation = true;
				}
			});
		}

		if (!validation) {
			messageValidation([{ value: t('direcciones.validation') }]);
		} else {
			if (idTrabajador === undefined) {
				await trabajadoresService.insert(formTrabajador, direcciones);
				hideLoading();
				navigate('/trabajadores');
			} else {
				showLoading();
				await trabajadoresService.update(formTrabajador, direcciones);
				hideLoading();
				navigate('/trabajadores');
			}
		}
	};
	const handleChangeTrabajador = (e) => {
		setFormTrabajador({
			...formTrabajador,
			[e.event.target.name]: e.event.target.value,
		});
	};

	const handleChangeEstado = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codEstado: e.value,
		});
	};

	const handleChangeObjetado = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codObjetado: e.value,
		});
	};

	const handleChangeFechaNacimiento = (e) => {
		setFormTrabajador({
			...formTrabajador,
			fechaNacimiento: e.value,
		});
	};

	const handleChangeGrupoBins = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codGrupoBins: e.value,
		});
	};

	const handleChangeContratista = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codContratista: e.value,
		});
	};

	const handleChangeCuadrilla = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codCuadrilla: e.value,
		});
	};

	const handleChangeSexo = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codSexo: e.value,
		});
	};
	const handleChangePais = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codPais: e.value,
		});
	};

	const handleChangeEstadoCivil = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codEstadoCivil: e.value,
		});
	};

	const handleChangeBanco = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codBanco: e.value,
		});
	};

	const handleChangeFormatosPagos = (e) => {
		setFormTrabajador({
			...formTrabajador,
			codFormaPago: e.value,
		});
	};
	return {
		loading,
		formTrabajador,
		handleChangeTrabajador,
		handleChangeObjetado,
		handleChangeGrupoBins,
		handleChangeContratista,
		handleChangeEstado,
		handleChangeCuadrilla,
		handleChangeSexo,
		handleChangeEstadoCivil,
		handleChangeBanco,
		handleChangeFormatosPagos,
		direcciones,
		isRemoveDireccion,
		isAddDireccion,
		handleRemove,
		handleAdd,
		handleChangeComuna,
		handleChangeDireccion,
		handleChangeFechaNacimiento,
		handleChangePais,
		comunas,
		estados,
		cuadrillas,
		contratistas,
		sexos,
		paises,
		estadosCiviles,
		bancos,
		formasPagos,
		gruposBins,
		handleChangePredeterminada,
		handleSave,
		isDisablePredeterminada,
		navigate,
		url,
	};
};
export default useFormTrabajador;
