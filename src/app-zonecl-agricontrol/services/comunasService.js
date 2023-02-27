import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/comunas';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codComuna) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codComuna}`, { signal: controller.signal }),
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

const insert = async (codComuna) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, codComuna);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codComuna) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codComuna}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, del };
