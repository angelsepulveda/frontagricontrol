import axios from 'axios';

import i18next from '../config/translation';
import { messageSuccess } from '../helpers/message';

const url = '/users';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getAllUserCampos = async () => {
	const { data } = await axios.get(url + '/campos');
	return data;
};

const getOne = async (userId) => {
	const { data } = await axios.get(`${url}/${userId}`);
	return data;
};

const insert = async (user) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.post(`${url}`, user);
		messageSuccess(i18next.t('common.registro'));
		return data;
	} catch (e) {
		console.log(e);
	}
};

const update = async (userId, user) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(`${url}/${userId}`, user);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (e) {
		console.log(e);
	}
};

const del = async (userId) => {
	const data = await axios.delete(`${url}/${userId}`);
	return data;
};

export default { getAll, getOne, insert, update, del, getAllUserCampos };
