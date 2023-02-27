import axios from 'axios';

const url = '/clasificaciones-densidades';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

export default { getAll };
