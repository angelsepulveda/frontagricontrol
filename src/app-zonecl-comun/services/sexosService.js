import axios from 'axios';

import loadAbort from '../../shared/helpers/loadAbort';

const url = '/sexo';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codSexo) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codSexo}`, { signal: controller.signal }),
		controller,
	};
};
