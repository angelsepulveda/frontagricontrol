import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { messageValidation } from '../../../shared/helpers/message';
import useLoading from '../../../shared/hooks/useLoading';
import { fetchCajasCompensaciones } from '../../../shared/store/slices/cajasCompensaciones';
import { fetchEstados } from '../../../shared/store/slices/estados';
import { fetchMutualidades } from '../../../shared/store/slices/mutualidades';
import direccionesService from '../../services/direccionesService';
import empresasService from '../../services/empresasService';
import useDirecciones from '../direcciones/useDirecciones';
import useComunas from '../useComunas';

const useFormEmpresa = (id) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: mutualidades } = useSelector(
		(state) => state.mutualidades,
	);

	const { listSelect: cajasCompensaciones } = useSelector(
		(state) => state.cajasCompensaciones,
	);

	const { list: empresas } = useSelector((state) => state.empresas);

	const { comunas, loadComunas } = useComunas();
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
	const [formEmpresa, setFormEmpresa] = useState({});
	const [url, setUrl] = useState([]);

	useEffect(() => {
		loadData(id);
	}, []);

	const initFormEmpresa = async (id) => {
		if (id === undefined) {
			setFormEmpresa({
				codEmpresa: 0,
				razonSocial: '',
				dni: '',
				giro: '',
				nemoTecnico: '',
				dniRepLegal: '',
				repLegal: '',
				codMutualidad: null,
				codCajaCompensacion: null,
				factorCajaCompensacion: null,
				factorMutualidad: null,
				ajustarSueldoMinimo: 0,
				codEstado: null,
			});
			initDirecciones([]);
			setUrl([
				{ name: 'empresas', url: '/empresas' },
				{ name: 'nuevo', url: '/empresas/nuevo' },
			]);
		} else {
			if (empresas.length <= 0) {
				const empresa = await empresasService.getOne(id);
				setFormEmpresa({
					codEmpresa: empresa.codEmpresa,
					razonSocial: empresa.razonSocial,
					dni: empresa.dni,
					giro: empresa.giro,
					nemoTecnico: empresa.nemoTecnico,
					dniRepLegal: empresa.dniRepLegal,
					repLegal: empresa.repLegal,
					codMutualidad: empresa.codMutualidad,
					codCajaCompensacion: empresa.codCajaCompensacion,
					factorCajaCompensacion: empresa.factorCajaCompensacion,
					factorMutualidad: empresa.factorMutualidad,
					ajustarSueldoMinimo: empresa.ajustarSueldoMinimo,
					codEstado: empresa.codEstado,
				});
				initDirecciones(empresa.direcciones);
			} else {
				const empresa = empresas.find((empresa) => empresa.codEmpresa === id);
				setFormEmpresa({
					codEmpresa: empresa.codEmpresa,
					razonSocial: empresa.razonSocial,
					dni: empresa.dni,
					giro: empresa.giro,
					nemoTecnico: empresa.nemoTecnico,
					dniRepLegal: empresa.dniRepLegal,
					repLegal: empresa.repLegal,
					codMutualidad: empresa.codMutualidad,
					codCajaCompensacion: empresa.codCajaCompensacion,
					factorCajaCompensacion: empresa.factorCajaCompensacion,
					factorMutualidad: empresa.factorMutualidad,
					ajustarSueldoMinimo: empresa.ajustarSueldoMinimo,
					codEstado: empresa.codEstado,
				});

				const data = await direccionesService.getOne(id);
				initDirecciones(data);
			}

			setUrl([
				{ name: 'empresas', url: '/empresas' },
				{ name: 'actualizar', url: `/empresas/actualizar/${id}` },
			]);
		}
	};

	const loadData = async (id) => {
		try {
			showLoading();
			await initFormEmpresa(id);
			handleButtonAdd();

			if (estados.length <= 0) dispatch(fetchEstados());

			if (mutualidades.length <= 0) dispatch(fetchMutualidades());

			if (cajasCompensaciones.length <= 0) dispatch(fetchCajasCompensaciones());

			await loadComunas();
			hideLoading();
		} catch (error) {
			console.log('Mi error', error);
		}
	};
	const handleSave = async (e) => {
		e.preventDefault();

		let validation = true;

		if (direcciones.length < 0) {
			direcciones.forEach((direccion) => {
				if (direccion.predeterminada === 1) {
					validation = true;
				}
			});
		}

		if (!validation) {
			messageValidation([
				{ value: 'Debe ingresar al menos una dirección predeterminada' },
			]);
		} else {
			if (formEmpresa.codEmpresa === 0 || formEmpresa.codEmpresa === null) {
				showLoading();
				await empresasService.insert(formEmpresa, direcciones);
				hideLoading();
				navigate('/empresas');
			} else {
				showLoading();
				await empresasService.update(formEmpresa, direcciones);
				hideLoading();
				navigate('/empresas');
			}
		}
	};

	const handleChangeEmpresa = (e) => {
		setFormEmpresa({
			...formEmpresa,
			[e.event.target.name]: e.event.target.value,
		});
	};

	const handleChangeEstado = (e) => {
		setFormEmpresa({
			...formEmpresa,
			codEstado: e.value,
		});
	};

	const handleChangeAjustarSueldo = (e) => {
		console.log('pasa');
		setFormEmpresa({
			...formEmpresa,
			ajustarSueldoMinimo: e.value,
		});
	};

	const handleChangeMutualidad = (e) => {
		setFormEmpresa({
			...formEmpresa,
			codMutualidad: e.value,
		});
	};

	const handleChangeCajaCompensacion = (e) => {
		setFormEmpresa({
			...formEmpresa,
			codCajaCompensacion: e.value,
		});
	};

	return {
		loading,
		formEmpresa,
		handleChangeEmpresa,
		handleChangeCajaCompensacion,
		handleChangeMutualidad,
		handleChangeAjustarSueldo,
		handleChangeEstado,
		direcciones,
		isRemoveDireccion,
		isAddDireccion,
		handleRemove,
		handleAdd,
		handleChangeComuna,
		handleChangeDireccion,
		comunas,
		estados,
		mutualidades,
		cajasCompensaciones,
		handleChangePredeterminada,
		handleSave,
		isDisablePredeterminada,
		url,
	};
};

export default useFormEmpresa;
