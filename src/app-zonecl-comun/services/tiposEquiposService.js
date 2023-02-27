import axios from 'axios';

const url = '/tipos-equipos';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codTipoEquipo) => {
	const { data } = await axios.get(`${url}/${codTipoEquipo}`);
	return data;
};

export default { getAll, getOne };