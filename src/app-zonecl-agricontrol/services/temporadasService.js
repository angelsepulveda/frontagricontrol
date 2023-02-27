import axios from 'axios';

import i18next from '../../shared/config/translation';
import { messageSuccess } from '../../shared/helpers/message';

const url = '/temporadas';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codTemporada) => {
	const { data } = await axios.get(`${url}/${codTemporada}`);
	return data;
};

const insert = async (temporada) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, temporada);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codTemporada, temporada) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${codTemporada}`, temporada);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codTemporada) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codTemporada}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { getAll, getOne, insert, update, del };
