import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/tratos';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codTrato) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codTrato}`, { signal: controller.signal }),
		controller,
	};
};

const insert = async (trato) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, trato);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codTrato, trato) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codTrato}`, trato);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codTrato) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codTrato}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, update, del };
