import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/equipos';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codEquipo) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codEquipo}`, { signal: controller.signal }),
		controller,
	};
};

export const getOneJefe = (codEquipo) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/jefeCuadrilla/${codEquipo}`, {
			signal: controller.signal,
		}),
		controller,
	};
};

export const findSelect = () => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/find-select`, { signal: controller.signal }),
		controller,
	};
};

export const findEquiposActivos = () => {
	const controller = loadAbort();
	return {
		call: axios.get(url + '/actives', { signal: controller.signal }),
		controller,
	};
};

const insert = async (equipos) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, equipos);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codEquipo, equipos) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codEquipo}`, equipos);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codEquipo) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codEquipo}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default {
	insert,
	update,
	del,
};
