import axios from 'axios';

import loadAbort from '../../shared/helpers/loadAbort';

const url = '/estados-civiles';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

export const getOne = (codEstadoCivil) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codEstadoCivil}`, { signal: controller.signal }),
		controller,
	};
};
