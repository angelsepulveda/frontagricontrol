import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/campos';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codCampo) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codCampo}`, { signal: controller.signal }),
		controller,
	};
};

const insert = async (campo) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, campo);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codCampo, campo) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codCampo}`, campo);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const select = () => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/select`, { signal: controller.signal }),
		controller,
	};
};

const del = async (codCampo) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codCampo}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, update, del };
