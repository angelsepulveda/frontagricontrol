import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';
import direccionesService from './direccionesService';

const url = '/empresas';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

const getOne = async (codEmpresa) => {
	const { data } = await axios.get(`${url}/${codEmpresa}`);
	const direcciones = await direccionesService.getOne(codEmpresa);

	return { ...data, direcciones };
};

const insert = async (empresa, direcciones) => {
	try {
		i18next.setDefaultNamespace('global');
		const dataEmpresa = {
			razonSocial: empresa.razonSocial,
			dni: empresa.dni,
			giro: empresa.giro,
			nemoTecnico: empresa.nemoTecnico,
			dniRepLegal: empresa.dniRepLegal,
			repLegal: empresa.repLegal,
			codMutualidad: empresa.codMutualidad,
			codCajaCompensacion: empresa.codCajaCompensacion,
			factorCajaCompensacion: empresa.factorCajaCompensacion,
			factorMutualidad: empresa.factorMutualidad,
			ajustarSueldoMinimo: empresa.ajustarSueldoMinimo,
			codEstado: empresa.codEstado,
			direcciones,
		};
		await axios.post(`${url}`, dataEmpresa);
		messageSuccess(i18next.t('common.registro'));
		//return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (empresa, direcciones) => {
	try {
		i18next.setDefaultNamespace('global');
		const dataEmpresa = {
			razonSocial: empresa.razonSocial,
			dni: empresa.dni,
			giro: empresa.giro,
			nemoTecnico: empresa.nemoTecnico,
			dniRepLegal: empresa.dniRepLegal,
			repLegal: empresa.repLegal,
			codMutualidad: empresa.codMutualidad,
			codCajaCompensacion: empresa.codCajaCompensacion,
			factorCajaCompensacion: empresa.factorCajaCompensacion,
			factorMutualidad: empresa.factorMutualidad,
			ajustarSueldoMinimo: empresa.ajustarSueldoMinimo,
			codEstado: empresa.codEstado,
			direcciones,
		};

		const { data } = await axios.put(
			`${url}/${empresa.codEmpresa}`,
			dataEmpresa,
		);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codEmpresa) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codEmpresa}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export default { getOne, insert, update, del };
