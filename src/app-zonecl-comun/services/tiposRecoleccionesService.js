import axios from 'axios';

const url = '/tipos-recolecciones';

const getAll = async () => {
	const { data } = await axios.get(url);
	return data;
};

const getOne = async (codTipoRecoleccion) => {
	const { data } = await axios.get(`${url}/${codTipoRecoleccion}`);
	return data;
};

export default { getAll, getOne };