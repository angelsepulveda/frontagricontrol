import axios from 'axios';

import i18next from '../../shared/config/translation';
import { messageSuccess } from '../../shared/helpers/message';
import cuartelesVariedadesService from './cuartelesVariedadesService';

const url = '/cuarteles';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codCuartel) => {
	const { data } = await axios.get(`${url}/${codCuartel}`);

	const cuartelesVariedades = await cuartelesVariedadesService.search(
		codCuartel,
	);

	return { ...data, cuartelesVariedades };
};

const getCuartelesVariedades = async (codCuartel) => {
	const { data } = await axios.get(
		`/cuarteles-variedades/find-select/${codCuartel}`,
	);

	return data;
};

const insert = async (cuartel, cuartelesVariedades) => {
	try {
		i18next.setDefaultNamespace('global');
		const dataCuartel = {
			codCuartel: cuartel.codCuartel,
			codCampo: cuartel.codCampo,
			codSector: cuartel.codSector,
			nombreCorto: cuartel.nombreCorto,
			cuartel: cuartel.cuartel,
			nemoTecnico: cuartel.nemoTecnico,
			superficie: parseFloat(cuartel.superficie),
			anioPlantacion: cuartel.anioPlantacion,
			codTipoCobertura: cuartel.codTipoCobertura,
			organico: cuartel.organico,
			productivo: cuartel.productivo,
			entreHilera: parseFloat(cuartel.entreHilera),
			sobreHilera: parseFloat(cuartel.sobreHilera),
			numPlantasPorHa: parseFloat(cuartel.numPlantasPorHa),
			codClasificacionDensidad: cuartel.codClasificacionDensidad,
			codEstado: cuartel.codEstado,
			cuartelesVariedades,
		};

		await axios.post(`${url}`, dataCuartel);
		messageSuccess(i18next.t('common.registro'));
	} catch (error) {
		console.log(error);
	}
};

const update = async (cuartel, cuartelesVariedades) => {
	try {
		i18next.setDefaultNamespace('global');
		const dataCuartel = {
			codCuartel: cuartel.codCuartel,
			codCampo: cuartel.codCampo,
			codSector: cuartel.codSector,
			nombreCorto: cuartel.nombreCorto,
			nemoTecnico: cuartel.nemoTecnico,
			cuartel: cuartel.cuartel,
			superficie: parseFloat(cuartel.superficie),
			anioPlantacion: cuartel.anioPlantacion,
			codTipoCobertura: cuartel.codTipoCobertura,
			organico: cuartel.organico,
			productivo: cuartel.productivo,
			entreHilera: parseFloat(cuartel.entreHilera),
			sobreHilera: parseFloat(cuartel.sobreHilera),
			numPlantasPorHa: parseFloat(cuartel.numPlantasPorHa),
			codClasificacionDensidad: cuartel.codClasificacionDensidad,
			codEstado: cuartel.codEstado,
			cuartelesVariedades,
		};

		const { data } = await axios.put(
			`${url}/${dataCuartel.codCuartel}`,
			dataCuartel,
		);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codEmpresa) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codEmpresa}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { getAll, getOne, insert, update, del, getCuartelesVariedades };
