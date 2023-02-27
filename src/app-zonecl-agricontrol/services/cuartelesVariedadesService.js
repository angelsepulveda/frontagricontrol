import axios from 'axios';

const url = '/cuarteles-variedades';

const search = async (codCuartel) => {
	const { data } = await axios.get(`${url}/${codCuartel}`);
	return data;
};

export default { search };
