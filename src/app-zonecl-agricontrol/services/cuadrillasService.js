import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';
import trabajadoresService from './trabajadoresService';

const url = '/cuadrillas';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

const getOne = async (codCuadrilla) => {
	const { data } = await axios.get(`${url}/${codCuadrilla}`);

	const trabajadores = await trabajadoresService.findByCodCuadrilla(
		codCuadrilla,
	);

	return { ...data, trabajadores };
};

const insert = async (cuadrilla, trabajadores) => {
	try {
		i18next.setDefaultNamespace('global');
		const codTrabajadores = trabajadores.map((trabajador) => {
			return { codTrabajador: trabajador.codTrabajador };
		});
		const dataCuadrilla = {
			codCuadrilla: cuadrilla.codCuadrilla,
			cuadrilla: cuadrilla.cuadrilla,
			codCampo: cuadrilla.codCampo,
			imeiEquipo: cuadrilla.imeiEquipo,
			nemoTecnico: cuadrilla.nemoTecnico,
			codJefeCuadrilla: cuadrilla.codJefeCuadrilla,
			codEstado: cuadrilla.codEstado,
			trabajadores: codTrabajadores,
		};

		await axios.post(`${url}`, dataCuadrilla);
		messageSuccess(i18next.t('common.registro'));
	} catch (error) {
		console.log(error);
	}
};

const update = async (cuadrilla, trabajadores) => {
	try {
		i18next.setDefaultNamespace('global');
		const codTrabajadores = trabajadores.map((trabajador) => {
			return { codTrabajador: trabajador.codTrabajador };
		});
		const dataCuadrilla = {
			codCuadrilla: cuadrilla.codCuadrilla,
			cuadrilla: cuadrilla.cuadrilla,
			codCampo: cuadrilla.codCampo,
			imeiEquipo: cuadrilla.imeiEquipo,
			nemoTecnico: cuadrilla.nemoTecnico,
			codJefeCuadrilla: cuadrilla.codJefeCuadrilla,
			codEstado: cuadrilla.codEstado,
			trabajadores: codTrabajadores,
		};

		const { data } = await axios.put(
			`${url}/${dataCuadrilla.codCuadrilla}`,
			dataCuadrilla,
		);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codCuadrilla) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codCuadrilla}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { del, insert, getOne, update };
