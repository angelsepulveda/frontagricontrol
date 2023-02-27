import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/variedades';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codVariedad) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codVariedad}`, { signal: controller.signal }),
		controller,
	};
};

const searchEspecie = async (codEspecie) => {
	const { data } = await axios.get(`${url}/especies/${codEspecie}`);
	return data;
};

export const findSelect = () => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/find-select`, { signal: controller.signal }),
		controller,
	};
};

const insert = async (codVariedad) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, codVariedad);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codVariedad) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codVariedad}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, del, searchEspecie };
