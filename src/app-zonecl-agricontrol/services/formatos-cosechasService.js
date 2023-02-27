import axios from 'axios';

import i18next from '../../shared/config/translation';
import { messageError, messageSuccess } from '../../shared/helpers/message';

const url = '/formatos-cosechas';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codFormatoCosecha) => {
	const { data } = await axios.get(`${url}/${codFormatoCosecha}`);
	return data;
};

const insert = async (formatoCosecha) => {
	try {
		i18next.setDefaultNamespace('global');
		if (formatoCosecha.campos.length <= 0) {
			messageError('Debe ingresar al menos un campo');
		} else {
			const { data } = await axios.post(`${url}`, formatoCosecha);
			messageSuccess(i18next.t('common.registro'));
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

const findByFormatoCosechaCampos = async () => {
	try {
		const { data } = await axios.get(`${url}/campos`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const formatoCosechasCamposAll = async (codCampo) => {
	try {
		const { data } = await axios.get(`${url}/campos-all/${codCampo}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (codFormatoCosecha, formatoCosecha) => {
	try {
		i18next.setDefaultNamespace('global');
		if (formatoCosecha.campos.length <= 0) {
			messageError('Debe ingresar al menos un campo');
		} else {
			const { data } = await axios.put(
				`${url}/${codFormatoCosecha}`,
				formatoCosecha,
			);
			messageSuccess(i18next.t('common.actualizo'));
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

const del = async (codFormatoCosecha) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codFormatoCosecha}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default {
	getAll,
	getOne,
	insert,
	update,
	del,
	findByFormatoCosechaCampos,
	formatoCosechasCamposAll,
};
