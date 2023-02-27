import axios from 'axios';

const url = '/unidades-medidas';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codUnidadMedida) => {
	const { data } = await axios.get(`${url}/${codUnidadMedida}`);
	return data;
};

export default { getAll, getOne };