import axios from 'axios';

import i18next from '../../shared/config/translation';
import { messageSuccess } from '../../shared/helpers/message';
import dateHelper from '../helpers/dateHelper';

const url = '/cosecha';

const getInformeCompleto = async (fechaDesde, fechaHasta) => {
	const { data } = await axios.get(`${url}/informe-completo`, {
		params: {
			fechaDesde,
			fechaHasta,
		},
	});
	return data;
};

const searchCamposCosechas = async (fecha, especie) => {
	const { data } = await axios.get(`${url}/search-campos`, {
		params: {
			fecha,
			especie,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchTrabajadoresCosechas = async (fecha, especie) => {
	const { data } = await axios.get(`${url}/search-trabajadores`, {
		params: {
			fecha,
			especie,
		},
	});

	return data;
};

const searchVariedadesCosechas = async (fecha, especie) => {
	const { data } = await axios.get(`${url}/search-variedades`, {
		params: {
			fecha,
			especie,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchSectoresCosechas = async (fecha, campo, especie) => {
	const { data } = await axios.get(`${url}/search-sectores`, {
		params: {
			fecha,
			campo,
			especie,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchCuartelesCosechas = async (fecha, sector, especie) => {
	const { data } = await axios.get(`${url}/search-cuarteles`, {
		params: {
			fecha,
			sector,
			especie,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchCuadrillasCosechas = async (fecha, especie) => {
	const { data } = await axios.get(`${url}/search-cuadrillas`, {
		params: {
			fecha,
			especie,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const getInformeDiario = async (mes, anio) => {
	const { data } = await axios.get(`${url}/informe-diario`, {
		params: {
			mes,
			anio,
		},
	});
	return data;
};

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

const informeCompletoGrafico = async (fechaFrom, fechaTo, codCampo) => {
	const fechaDesde = dateHelper.formatDate(new Date(fechaFrom));
	const fechaHasta = dateHelper.formatDate(new Date(fechaTo));

	const { data } = await axios.get(`${url}/informe-completo-grafico`, {
		params: {
			fechaDesde,
			fechaHasta,
			codCampo,
		},
	});
	return data;
};

const informeDiarioGrafico = async (date, codCampo, codEspecie) => {
	const fecha = dateHelper.formatDate(new Date(date));

	const { data } = await axios.get(`${url}/informe-diario-grafico`, {
		params: {
			fecha,
			codCampo,
			codEspecie,
		},
	});
	return data;
};

const findMoreRecentDate = async () => {
	const { data } = await axios.get(`${url}/find-more-recent`);

	return data;
};

const graficoFormatoCosecha = async ({
	fecha,
	campo,
	sector,
	formatoCosecha,
}) => {
	const { data } = await axios.get(`${url}/grafico-formato-cosechas`, {
		params: {
			fecha,
			campo,
			sector,
			formatoCosecha,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchProduccion = async (filter) => {
	const { data } = await axios.get(`${url}/search`, {
		params: {
			...filter,
		},
	});

	return data;
};

const update = async (produccion) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(url, produccion);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (produccion) => {
	try {
		i18next.setDefaultNamespace('global');
		const { data } = await axios.put(url + '/delete', produccion);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const searchCamposVariedadesCosechas = async (fecha, variedad) => {
	const { data } = await axios.get(`${url}/search-variedades-campos`, {
		params: {
			fecha,
			variedad,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchSectoresVariedadesCosechas = async (fecha, campo, variedad) => {
	const { data } = await axios.get(`${url}/search-variedades-sectores`, {
		params: {
			fecha,
			campo,
			variedad,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchCuartelesVariedadesCosechas = async (fecha, sector, variedad) => {
	const { data } = await axios.get(`${url}/search-variedades-cuarteles`, {
		params: {
			fecha,
			sector,
			variedad,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchFormatoCosechas = async (fecha, especie) => {
	const { data } = await axios.get(`${url}/search-formato-cosechas`, {
		params: {
			fecha,
			especie,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

const searchContratistas = async (fecha, especie) => {
	const { data } = await axios.get(`${url}/search-contratistas`, {
		params: {
			fecha,
			especie,
		},
	});

	return data.map((item) => {
		return {
			...item,
			kilos: parseFloat(item.kilos),
		};
	});
};

export default {
	getInformeCompleto,
	getInformeDiario,
	informeDiarioDetallado,
	informeDiarioResumido,
	informeCompletoGrafico,
	informeDiarioGrafico,
	findMoreRecentDate,
	searchProduccion,
	searchCamposVariedadesCosechas,
	searchSectoresVariedadesCosechas,
	searchCuartelesVariedadesCosechas,
	update,
	del,
	searchCamposCosechas,
	searchVariedadesCosechas,
	searchCuadrillasCosechas,
	searchSectoresCosechas,
	searchCuartelesCosechas,
	searchFormatoCosechas,
	searchContratistas,
	graficoFormatoCosecha,
	searchTrabajadoresCosechas,
};
