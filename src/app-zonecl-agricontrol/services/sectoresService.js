import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/sectores';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codSector) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codSector}`, { signal: controller.signal }),
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

export const search = (codCampo) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/campos/${codCampo}`, { signal: controller.signal }),
		controller,
	};
};

const insert = async (sectores) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, sectores);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codSector, sectores) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codSector}`, sectores);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codEmpresa) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codEmpresa}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { insert, update, del };
