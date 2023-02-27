import axios from 'axios';

import dateHelper from '../../shared/helpers/dateHelper';

const url = '/cosecha';

const informeDiarioResumido = async (date, campo, especie) => {
	const fecha = dateHelper.formatDate(new Date(date));
	const { data } = await axios.get(`${url}/informe-diario-resumido`, {
		params: {
			fecha,
			campo,
			especie,
		},
	});
	return data;
};

const informeDiarioDetallado = async (date, campo, especie) => {
	const fecha = dateHelper.formatDate(new Date(date));
	const { data } = await axios.get(`${url}/informe-diario-detallado`, {
		params: {
			fecha,
			campo,
			especie,
		},
	});
	return data;
};

export default { informeDiarioDetallado, informeDiarioResumido };
