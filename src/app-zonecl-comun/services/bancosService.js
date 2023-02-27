import axios from 'axios';

import loadAbort from '../../shared/helpers/loadAbort';

const url = '/bancos';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = async (codBanco) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codBanco}`, { signal: controller.signal }),
		controller,
	};
};
