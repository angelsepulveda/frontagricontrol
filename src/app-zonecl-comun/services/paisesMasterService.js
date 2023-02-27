import axios from 'axios';

const url = '/paises-master';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codPaisMaster) => {
	const { data } = await axios.get(`${url}/${codPaisMaster}`);
	return data;
};

export default { getAll, getOne };
