import { useEffect, useState } from 'react';

import { findSelect } from '../../../../app-zonecl-agricontrol/services/calidadesService';
import { getAll as getAllCampos } from '../../../../app-zonecl-agricontrol/services/camposService';
import { getAll as getAllCuadrillas } from '../../../../app-zonecl-agricontrol/services/cuadrillasService';
import cuartelesService from '../../../../app-zonecl-agricontrol/services/cuartelesService';
import { findSelect as findSelectEquipos } from '../../../../app-zonecl-agricontrol/services/equiposService';
import { getAll as getAllEspecies } from '../../../../app-zonecl-agricontrol/services/especiesService';
import formatosCosechasService from '../../../../app-zonecl-agricontrol/services/formatos-cosechasService';
import { getAll as getAllSectores } from '../../../../app-zonecl-agricontrol/services/sectoresService';
import trabajadoresService, {
	getAll,
} from '../../../../app-zonecl-agricontrol/services/trabajadoresService';
import { getAll as getAllVariedades } from '../../../../app-zonecl-agricontrol/services/variedadesService';
import i18next from '../../../config/translation';
import { useWizardContext } from '../../../contexts/wizard';
import { messageError } from '../../../helpers/message';
import cosechaService from '../../../services/cosechaService';
import { getAll as getAllContratista } from '../,,/../../../../app-zonecl-agricontrol/services/contratistasService';

const dataProduccion = {
	campo: '0',
	cuadrilla: '0',
	fecha: new Date(),
	jefeCuadrilla: '',
	cuartel: '0',
	variedad: '0',
	formatoCosecha: '0',
	trabajador: '0',
	equipo: '0',
	contratista: '0',
	sector: '0',
	calidad: '0',
	especie: '0',
};

export const useHome = () => {
	const {
		dispatch,
		goNextPage,
		cuarteles: cuartelesContext,
		variedades: variedadesContext,
		sectores: sectoresContext,
		especies: especiesContext,
		formatoCosechas: formatoCosechasContext,
	} = useWizardContext();

	const [isLoading, setIsLoading] = useState(false);

	const [campos, setCampos] = useState([]);
	const [cuadrillas, setCuadrillas] = useState([]);
	const [trabajadores, setTrabajadores] = useState([]);
	const [variedades, setVariedades] = useState([]);
	const [formatoCosechas, setFormatoCosechas] = useState([]);
	const [contratistas, setContratistas] = useState([]);
	const [equipos, setEquipos] = useState([]);
	const [calidades, setCalidades] = useState([]);
	const [cuarteles, setCuarteles] = useState([]);
	const [sectores, setSectores] = useState([]);
	const [especies, setEspecies] = useState([]);
	const [messageValidation, setMessageValidation] = useState('');
	const [especie, setEspecie] = useState(undefined);
	const [campo, setCampo] = useState(undefined);

	const [produccion, setProduccion] = useState(dataProduccion);

	const loadData = async () => {
		setIsLoading(true);
		setMessageValidation('');
		await loadSectores();
		findMoreRecent();
		await loadEspecies();
		await loadCuadrillas();
		await loadCuarteles();
		await loadTrabajadores();
		await loadCalidades();
		await loadEquipos();
		await loadContratista();
		await loadVariedades();
		setIsLoading(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	const loadVariedades = async () => {
		const { data } = await getAllVariedades().call;
		dispatch({ type: 'LOAD_VARIEDADES', payload: data });
		setVariedades(data);
	};

	const loadCampos = async () => {
		const { data } = await getAllCampos().call;
		dispatch({ type: 'LOAD_CAMPOS', payload: data });
		setCampos(data);

		return data;
	};

	const loadCuarteles = async () => {
		const data = await cuartelesService.getAll();
		dispatch({ type: 'LOAD_CUARTELES', payload: data });
		setCuarteles(data);
	};

	const loadSectores = async () => {
		const { data } = await getAllSectores().call;
		dispatch({ type: 'LOAD_SECTORES', payload: data });
		setSectores(data);
	};

	const loadCuadrillas = async () => {
		const { data } = await getAllCuadrillas().call;
		dispatch({ type: 'LOAD_CUADRILLAS', payload: data });
		setCuadrillas(data);
	};

	const loadEspecies = async () => {
		const { data } = await getAllEspecies().call;
		dispatch({ type: 'LOAD_ESPECIES', payload: data });
		setEspecies(data);

		let codEspecie = null;
		let codCampo = null;
		for (let i = 0; i < 1; i++) {
			setEspecie(data[i].codEspecie);
			codEspecie = data[i].codEspecie;
		}

		const camposData = await loadCampos();

		for (let i = 0; i < 1; i++) {
			setCampo(camposData[i].codCampo);
			codCampo = camposData[i].codCampo;
		}

		const dataFormatoCosecha =
			await formatosCosechasService.formatoCosechasCamposAll(codCampo);
		dispatch({ type: 'LOAD_FORMATOS_COSECHAS', payload: dataFormatoCosecha });
		setFormatoCosechas(dataFormatoCosecha);

		setProduccion({ ...produccion, especie: codEspecie, campo: codCampo });
	};

	const loadTrabajadores = async () => {
		const { data } = await getAll().call;

		const result = data.map((item) => {
			return {
				codTrabajador: item.codTrabajador,
				codCuadrilla: item.codCuadrilla,
				codJefeCuadrilla: item.codTrabajador.toString(),
				nombreCompleto:
					item.codTrabajador +
					' - ' +
					item.nombres +
					' ' +
					item.primerApellido +
					' ' +
					item.segundoApellido,
				nombres: item.nombres,
				segundoApellido: item.segundoApellido,
				primerApellido: item.primerApellido,
			};
		});

		dispatch({ type: 'LOAD_TRABAJADORES', payload: result });
		setTrabajadores(result);
	};

	const loadCalidades = async () => {
		const { data } = await findSelect().call;
		dispatch({ type: 'LOAD_CALIDADES', payload: data });
		setCalidades(data);
	};

	const loadEquipos = async () => {
		const { data } = await findSelectEquipos().call;

		dispatch({ type: 'LOAD_EQUIPOS', payload: data });

		const result = data.map((item) => {
			return {
				codEquipo: item.codEquipo,
				equipo: item.macImei + ' - ' + item.descripcion,
			};
		});

		setEquipos(result);
	};

	const loadContratista = async () => {
		const { data } = await getAllContratista().call;
		dispatch({ type: 'LOAD_CONTRATISTAS', payload: data });
		setContratistas(data);
	};

	const handleChangeCampo = async (e) => {
		setProduccion({ ...produccion, campo: e.value });
		if (e.value !== 0) {
			const result = sectoresContext.filter(
				(item) => item.codCampo === e.value,
			);
			setSectores(result);

			const dataFormatoCosechas =
				await formatosCosechasService.formatoCosechasCamposAll(e.value);

			setFormatoCosechas(dataFormatoCosechas);

			if (result.length <= 0) {
				const reset = {
					variedad: '0',
					cuartel: '0',
				};
				setProduccion({ ...produccion, reset });
				setVariedades(variedadesContext);
				setEspecies(especiesContext);
				setFormatoCosechas(formatoCosechasContext);
				setCuarteles(cuartelesContext);
			}
		}
	};

	const handleSearchProduccion = async (e) => {
		i18next.setDefaultNamespace('global');
		if (
			produccion.fecha !== null &&
			produccion.campo !== '0' &&
			produccion.especie !== '0'
		) {
			setMessageValidation('');
			setIsLoading(true);
			const filter = {
				especie: produccion.especie,
				trabajador: produccion.trabajador,
				variedad: produccion.variedad,
				cuartel: produccion.cuartel,
				equipo: produccion.equipo,
				cuadrilla: produccion.cuadrilla,
				formatoCosecha: produccion.formatoCosecha,
				campo: produccion.campo,
				contratista: produccion.contratista,
				fecha: produccion.fecha,
			};

			const data = await cosechaService.searchProduccion(filter);

			if (data.length <= 0) {
				setIsLoading(false);
				messageError(i18next.t('common.sinResultados'));
			} else {
				dispatch({ type: 'PRODUCCION_FETCHED', payload: data });

				setIsLoading(false);
				goNextPage();
			}
		} else {
			setMessageValidation(
				i18next.t('cosechas.regularizacionProduccion.validacion'),
			);
		}
	};

	const handleChangeFormatoCosecha = (e) => {
		setProduccion({ ...produccion, formatoCosecha: e.value });
	};

	const handleChangeCuartel = async (e) => {
		const codCuartel = e.value;
		setProduccion({ ...produccion, cuartel: codCuartel });
		if (codCuartel !== 0 || codCuartel !== undefined) {
			const data = await cuartelesService.getCuartelesVariedades(codCuartel);
			for (const i in data) {
				const dataEspecie = especiesContext.filter(
					(item) => item.codEspecie === data[i].codEspecie,
				);

				setEspecies(dataEspecie);
			}

			setVariedades(data);
		} else {
			const data = {
				variedad: '0',
				formatoCosecha: '0',
				especie: '0',
			};
			setProduccion({ ...produccion, data });
			setVariedades(variedadesContext);
			setFormatoCosechas(formatoCosechasContext);
			setEspecies(especiesContext);
		}
	};

	const handleChangeVariedad = (e) => {
		setProduccion({ ...produccion, variedad: e.value });
	};

	const handleChangeCuadrilla = async (e) => {
		const codCuadrilla = e.value;
		let codTrabajador = '';
		if (codCuadrilla !== undefined) {
			for (const i in cuadrillas) {
				if (cuadrillas[i].codCuadrilla === codCuadrilla) {
					codTrabajador = cuadrillas[i].codJefeCuadrilla;
				}
			}
			const data = await trabajadoresService.getOneSelect(codTrabajador);

			setProduccion({
				...produccion,
				cuadrilla: codCuadrilla,
				jefeCuadrilla:
					data.nombres + ' ' + data.primerApellido + ' ' + data.segundoApellido,
			});
		} else {
			setProduccion({ ...produccion, cuadrilla: codCuadrilla });
		}
	};

	const findMoreRecent = async () => {
		//const data = await cosechaService.findMoreRecentDate();

		//const fechaCaptura = data.fechaCaptura !== null ? data.fechaCaptura : null;

		setProduccion({ ...produccion, fecha: new Date() });
	};

	const handleChangeTrabajador = (e) => {
		setProduccion({ ...produccion, trabajador: e.value });
	};

	const handleChangeCalidad = (e) => {
		setProduccion({ ...produccion, calidad: e.value });
	};

	const handleChangeEquipo = (e) => {
		setProduccion({ ...produccion, equipo: e.value });
	};

	const handleChangeContratista = (e) => {
		setProduccion({ ...produccion, contratista: e.value });
	};

	const handleChangeSector = (e) => {
		const codSector = e.value;
		if (e.value !== '0') {
			const result = cuartelesContext.filter(
				(item) => item.codSector === e.value,
			);
			setCuarteles(result);
		} else {
			const data = {
				cuartel: '0',
				variedad: '0',
				formatoCosecha: '0',
				especie: '0',
			};
			setProduccion({ ...produccion, data });
			setCuarteles(cuartelesContext);
			setEspecies(especiesContext);
			setFormatoCosechas(formatoCosechasContext);
			setVariedades(variedadesContext);
		}
		setProduccion({ ...produccion, sector: codSector });
	};

	const handleChangeEspecie = (e) => {
		const codEspecie = e.value;
		if (e.value !== '0') {
			const resultVariedades = variedadesContext.filter(
				(item) => item.codEspecie === codEspecie,
			);
			const resultFormatoCosecha = formatoCosechasContext.filter(
				(item) => item.codEspecie === codEspecie,
			);
			setFormatoCosechas(resultFormatoCosecha);
			setVariedades(resultVariedades);
		} else {
			const data = {
				variedad: '0',
				formatoCosecha: '0',
			};
			setProduccion({ ...produccion, data });
			setVariedades(variedadesContext);
			setFormatoCosechas(formatoCosechasContext);
		}
		setProduccion({ ...produccion, especie: e.value });
	};

	return {
		handleChangeCampo,
		handleChangeCuadrilla,
		handleChangeCuartel,
		handleChangeVariedad,
		handleChangeFormatoCosecha,
		handleChangeTrabajador,
		handleChangeCalidad,
		handleChangeEquipo,
		handleChangeContratista,
		handleSearchProduccion,
		isLoading,
		produccion,
		setProduccion,
		campos,
		cuarteles,
		variedades,
		formatoCosechas,
		trabajadores,
		calidades,
		equipos,
		cuadrillas,
		contratistas,
		sectores,
		handleChangeSector,
		especies,
		handleChangeEspecie,
		messageValidation,
		especie,
		campo,
	};
};
