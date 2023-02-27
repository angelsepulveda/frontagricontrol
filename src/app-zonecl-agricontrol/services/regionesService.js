import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/regiones';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codRegion) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codRegion}`, { signal: controller.signal }),
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

const insert = async (codRegion) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, codRegion);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codRegion) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codRegion}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, del };
