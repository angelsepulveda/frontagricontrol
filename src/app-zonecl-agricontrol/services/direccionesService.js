import axios from 'axios';

const url = '/direcciones';

const getOne = async (codEntidad) => {
	const { data } = await axios.get(`${url}/${codEntidad}`);
	return data;
};

export default { getOne };
