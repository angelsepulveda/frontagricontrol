import axios from 'axios';

const url = '/variedades-master';

const searchEspecies = async (codEspecies) => {
	const { data } = await axios.get(`${url}/search/${codEspecies}`);
	return data;
};

const getOne = async (codVariedadMaster) => {
	const { data } = await axios.get(`${url}/${codVariedadMaster}`);
	return data;
};

export default { searchEspecies, getOne };
