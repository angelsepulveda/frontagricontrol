import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/paises';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codPais) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codPais}`, { signal: controller.signal }),
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

const insert = async (codPais) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, codPais);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codPais) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codPais}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, del };
