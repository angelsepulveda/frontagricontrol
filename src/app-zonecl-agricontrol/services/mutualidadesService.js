import axios from 'axios';

import loadAbort from '../../shared/helpers/loadAbort';

const url = '/mutualidades';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};
