import axios from 'axios';

const url = '/tipos-coberturas';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

export default { getAll };
