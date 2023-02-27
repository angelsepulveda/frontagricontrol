import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/localidades';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codLocalidad) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codLocalidad}`, { signal: controller.signal }),
		controller,
	};
};

const insert = async (localidad) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, localidad);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codLocalidad, localidad) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codLocalidad}`, localidad);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codLocalidad) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codLocalidad}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, update, del };
