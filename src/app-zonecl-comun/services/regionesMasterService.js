import axios from 'axios';

import loadAbort from '../../shared/helpers/loadAbort';

const url = '/regiones-master';

export const findSelect = () => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/find-select`, { signal: controller.signal }),
		controller,
	};
};

const searchPais = async (codPais) => {
	console.log('codPais', codPais)
	const { data } = await axios.get(`${url}/search/${codPais}`);

	return data;
};

export const getOne = (codRegion) => {
	const controller = loadAbort();
	return {
		call: axios.get(`${url}/${codRegion}`, { signal: controller.signal }),
		controller,
	};
};

export default { searchPais };
