import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/contratistas';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codContratista) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codContratista}`, { signal: controller.signal }),
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
const insert = async (contratista) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, contratista);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codContratista, contratista) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codContratista}`, contratista);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codContratista) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codContratista}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, update, del };
