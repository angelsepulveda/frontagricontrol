import axios from 'axios';

const url = '/especies-master';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codEspecie) => {
	const { data } = await axios.get(`${url}/${codEspecie}`);
	return data;
};

export default { getAll, getOne };
