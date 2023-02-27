import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useClasificacionesDensidades from '../../../app-zonecl-comun/hooks/useClasificacionesDensidades';
import useTiposCoberturas from '../../../app-zonecl-comun/hooks/useTiposCoberturas';
import { fetchCampos } from '../../../shared/store/slices/campos';
import { fetchEstados } from '../../../shared/store/slices/estados';
import cuartelesService from '../../services/cuartelesService';
import cuartelesVariedadesService from '../../services/cuartelesVariedadesService';
import useSectores from '../useSectores';
import useVariedades from '../variedades/useVariedades';
import useCuartelesVariedades from './useCuartelesVariedades';

const useFormCuarteles = (id) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: campos } = useSelector((state) => state.campos);
	const { list: cuarteles } = useSelector((state) => state.cuarteles);
	const { variedades, loadVariedades } = useVariedades();
	const { tiposCoberturas, loadTiposCoberturas } = useTiposCoberturas();
	const { clasificacionesDensidades, loadClasificacionesDensidades } =
		useClasificacionesDensidades();
	const { sectores, searchSectores } = useSectores();
	const {
		cuartelesVariedades,
		initCuartelesVariedades,
		handleAddCuartelVariedad,
		handleRemoveCuartelVariedad,
		handleChangeCuartelVariedad,
		handleChangeFinalizaCosecha,
		handleVisibleButtonAdd,
		isAddCuartelesVariedades,
		isRemoveCuartelesVariedades,
		handleChangeVariedad,
		validationVariedades,
	} = useCuartelesVariedades();

	const [formCuartel, setFormCuartel] = useState({});
	const [url, setUrl] = useState([]);
	const [loading, setLoading] = useState(false);
	const [anioPlantacion, setAnioPlantacion] = useState([]);

	useEffect(() => {
		loadData(id);
	}, [id]);

	async function loadData(id) {
		try {
			loadingInit();
			await initFormCuartel(id);
			if (campos.length <= 0) {
				dispatch(fetchCampos());
			}
			if (estados.length <= 0) dispatch(fetchEstados());
			await loadVariedades();
			await loadClasificacionesDensidades();
			await loadTiposCoberturas();
			loadAnioPlantacion();
			handleVisibleButtonAdd();
			loadingEnd();
		} catch (error) {
			console.log('Mi error', error);
		}
	}

	const loadAnioPlantacion = () => {
		const year = new Date().getFullYear();

		let years = [];

		for (let i = 20; i >= 0; i--) {
			years = [
				...years,
				{
					value: year - i,
					label: year - i,
				},
			];
		}

		setAnioPlantacion(years);
	};

	const initFormCuartel = useCallback(async (codCuartel) => {
		if (codCuartel === undefined) {
			const data = {
				codCuartel: 0,
				codCampo: 0,
				codSector: 0,
				nombreCorto: null,
				nemoTecnico: null,
				cuartel: '',
				anioPlantacion: null,
				codTipoCobertura: null,
				organico: false,
				superficie: null,
				productivo: false,
				entreHilera: null,
				sobreHilera: null,
				numPlantasPorHa: null,
				codClasificacionDensidad: null,
				codEstado: null,
			};
			setFormCuartel(data);
			await loadSector(data);
			setUrl([
				{ name: 'cuarteles', url: '/cuarteles' },
				{ name: 'nuevo', url: '/cuarteles/nuevo' },
			]);
			initCuartelesVariedades([]);
		} else {
			if (cuarteles.length <= 0) {
				const cuartel = await cuartelesService.getOne(codCuartel);
				setFormCuartel({
					codCuartel: cuartel.codCuartel,
					codCampo: cuartel.codCampo,
					codSector: cuartel.codSector,
					nombreCorto: cuartel.nombreCorto,
					nemoTecnico: cuartel.nemoTecnico,
					cuartel: cuartel.cuartel,
					anioPlantacion: cuartel.anioPlantacion,
					codTipoCobertura: cuartel.codTipoCobertura,
					organico: cuartel.organico,
					superficie: cuartel.superficie,
					productivo: cuartel.productivo,
					entreHilera: cuartel.entreHilera,
					sobreHilera: cuartel.sobreHilera,
					numPlantasPorHa: cuartel.numPlantasPorHa,
					codClasificacionDensidad: cuartel.codClasificacionDensidad,
					codEstado: cuartel.codEstado,
				});

				initCuartelesVariedades(cuartel.cuartelesVariedades);
				await loadSector(cuartel);
			} else {
				const cuartel = cuarteles.find(
					(item) => item.codCuartel === codCuartel,
				);
				setFormCuartel({
					codCuartel: cuartel.codCuartel,
					codCampo: cuartel.codCampo,
					codSector: cuartel.codSector,
					nombreCorto: cuartel.nombreCorto,
					nemoTecnico: cuartel.nemoTecnico,
					cuartel: cuartel.cuartel,
					anioPlantacion: cuartel.anioPlantacion,
					codTipoCobertura: cuartel.codTipoCobertura,
					organico: cuartel.organico,
					superficie: cuartel.superficie,
					productivo: cuartel.productivo,
					entreHilera: cuartel.entreHilera,
					sobreHilera: cuartel.sobreHilera,
					numPlantasPorHa: cuartel.numPlantasPorHa,
					codClasificacionDensidad: cuartel.codClasificacionDensidad,
					codEstado: cuartel.codEstado,
				});

				const data = await cuartelesVariedadesService.search(codCuartel);
				initCuartelesVariedades(data);
				await loadSector(cuartel);
			}

			setUrl([
				{ name: 'cuarteles', url: '/cuarteles' },
				{ name: 'actualizar', url: `/cuarteles/actualizar/${id}` },
			]);
		}
	});

	const handleChangeCuartel = (e) => {
		setFormCuartel({
			...formCuartel,
			[e.event.target.name]: e.event.target.value,
		});
	};

	const handleChangeEstado = (e) => {
		setFormCuartel({
			...formCuartel,
			codEstado: e.value,
		});
	};

	const handleChangeTipoCobertura = (e) => {
		setFormCuartel({
			...formCuartel,
			codTipoCobertura: e.value,
		});
	};

	const handleChangeProductivo = (e) => {
		setFormCuartel({
			...formCuartel,
			productivo: e.value,
		});
	};

	const handleChangeClasificacionDensidad = (e) => {
		setFormCuartel({
			...formCuartel,
			codClasificacionDensidad: e.value,
		});
	};

	const handleChangeAnioPlantacion = (e) => {
		setFormCuartel({
			...formCuartel,
			anioPlantacion: e.value,
		});
	};

	const handleChangeOrganico = (e) => {
		setFormCuartel({
			...formCuartel,
			organico: e.value,
		});
	};
	const handleChangeCampo = async (e) => {
		setFormCuartel({
			...formCuartel,
			codCampo: e.value,
		});
		await loadSectorByCampos(e.value);
	};

	const handleChangeSector = (e) => {
		setFormCuartel({
			...formCuartel,
			codSector: e.value,
		});
	};

	const loadSector = async (cuartel) => {
		if (cuartel.codCampo !== 0) {
			await loadSectorByCampos(cuartel.codCampo);
		}
	};

	const loadingInit = () => {
		setLoading(true);
	};

	const loadingEnd = () => {
		setLoading(false);
	};

	const loadSectorByCampos = async (codCampo) => {
		await searchSectores(codCampo);
	};

	const handleSave = async (e) => {
		e.preventDefault();
		const result = validationVariedades();
		if (result) {
			if (formCuartel.codCuartel === 0 || formCuartel.codCuartel === null) {
				await cuartelesService.insert(formCuartel, cuartelesVariedades);
				loadingEnd();
				navigate('/cuarteles');
			} else {
				loadingInit();
				await cuartelesService.update(formCuartel, cuartelesVariedades);
				loadingEnd();
				navigate('/cuarteles');
			}
		}
	};

	return {
		loading,
		formCuartel,
		loadingInit,
		loadingEnd,
		handleChangeCuartel,
		handleChangeEstado,
		handleChangeProductivo,
		handleChangeOrganico,
		handleChangeCampo,
		handleChangeSector,
		handleChangeClasificacionDensidad,
		handleChangeTipoCobertura,
		handleChangeAnioPlantacion,
		cuartelesVariedades,
		sectores,
		anioPlantacion,
		handleAddCuartelVariedad,
		handleRemoveCuartelVariedad,
		handleChangeCuartelVariedad,
		handleChangeFinalizaCosecha,
		isAddCuartelesVariedades,
		isRemoveCuartelesVariedades,
		handleChangeVariedad,
		validationVariedades,
		loadAnioPlantacion,
		estados,
		campos,
		variedades,
		tiposCoberturas,
		clasificacionesDensidades,
		handleSave,
		navigate,
		url,
	};
};

export default useFormCuarteles;
