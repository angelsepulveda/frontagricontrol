import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/calidades';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codCalidad) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codCalidad}`, { signal: controller.signal }),
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

const update = async (codCalidad, calidad) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codCalidad}`, calidad);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codCalidad) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codCalidad}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { update, del };
