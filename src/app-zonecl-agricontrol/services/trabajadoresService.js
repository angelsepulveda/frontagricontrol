import axios from 'axios';

import i18next from '../../shared/config/translation';
import loadAbort from '../../shared/helpers/loadAbort';
import { messageSuccess } from '../../shared/helpers/message';
import direccionesService from './direccionesService';

const url = '/trabajadores';

export const getAll = () => {
	const controller = loadAbort();
	return { call: axios.get(url, { signal: controller.signal }), controller };
};

const getOne = async (codTrabajador) => {
	const { data } = await axios.get(`${url}/${codTrabajador}`);
	const direcciones = await direccionesService.getOne(codTrabajador);

	return { ...data, direcciones };
};

const getOneSelect = async (codTrabajador) => {
	const { data } = await axios.get(`${url}/find-select/${codTrabajador}`);
	return data;
};

const insert = async (trabajador, direcciones) => {
	try {
		i18next.setDefaultNamespace('global');
		const dataTrabajador = {
			codTrabajador: trabajador.codTrabajador,
			nombres: trabajador.nombres,
			primerApellido: trabajador.primerApellido,
			segundoApellido: trabajador.segundoApellido,
			nombreSocial: trabajador.nombreSocial,
			fechaNacimiento: trabajador.fechaNacimiento,
			nemoTecnico: trabajador.nemoTecnico,
			codSexo: trabajador.codSexo,
			telefono1: trabajador.telefono1,
			telefono2: trabajador.telefono2,
			email: trabajador.email,
			codGrupoBins: trabajador.codGrupoBins,
			codCuadrilla: trabajador.codCuadrilla,
			codContratista: trabajador.codContratista,
			codPais: trabajador.codPais,
			codEstadoCivil: trabajador.codEstadoCivil,
			codBanco: trabajador.codBanco,
			codTipoCuenta: trabajador.codTipoCuenta,
			numeroCuenta: trabajador.numeroCuenta,
			codFormaPago: trabajador.codFormaPago,
			codObjetado: trabajador.codObjetado ? 1 : 0,
			codEstado: trabajador.codEstado,
			direcciones,
		};
		await axios.post(`${url}`, dataTrabajador);
		messageSuccess(i18next.t('common.registro'));
		//return data;
	} catch (error) {
		console.log(error);
	}
};

const update = async (trabajador, direcciones) => {
	try {
		i18next.setDefaultNamespace('global');
		const dataTrabajador = {
			codTrabajador: trabajador.codTrabajador,
			nombres: trabajador.nombres,
			primerApellido: trabajador.primerApellido,
			segundoApellido: trabajador.segundoApellido,
			nombreSocial: trabajador.nombreSocial,
			nemoTecnico: trabajador.nemoTecnico,
			fechaNacimiento: trabajador.fechaNacimiento,
			codSexo: trabajador.codSexo,
			telefono1: trabajador.telefono1,
			telefono2: trabajador.telefono2,
			email: trabajador.email,
			codGrupoBins: trabajador.codGrupoBins,
			codCuadrilla: trabajador.codCuadrilla,
			codContratista: trabajador.codContratista,
			codPais: trabajador.codPais,
			codEstadoCivil: trabajador.codEstadoCivil,
			codBanco: trabajador.codBanco,
			codTipoCuenta: trabajador.codTipoCuenta,
			numeroCuenta: trabajador.numeroCuenta,
			codFormaPago: trabajador.codFormaPago,
			codObjetado: trabajador.codObjetado ? 1 : 0,
			codEstado: trabajador.codEstado,
			direcciones,
		};
		const { data } = await axios.put(
			`${url}/${trabajador.codTrabajador}`,
			dataTrabajador,
		);
		messageSuccess(i18next.t('common.actualizo'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

const del = async (codTrabajador) => {
	try {
		i18next.setDefaultNamespace('global');
		const data = await axios.delete(`${url}/${codTrabajador}`);
		messageSuccess(i18next.t('common.elimino'));
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const findTrabajadoresActives = (codTrabajador) => {
	const controller = loadAbort();
	return {
		call: axios.get(url + `/actives/${codTrabajador}`, {
			signal: controller.signal,
		}),
		controller,
	};
};

const findByCodCuadrilla = async (codCuadrilla) => {
	const { data } = await axios.get(`${url}/cuadrillas/${codCuadrilla}`);
	return data;
};

const createMasivo = async (data) => {
	try {
		await axios.post(`${url}/carga-masiva`, data);
		messageSuccess(i18next.t('common.registro'));
	} catch (error) {
		console.log(error);
	}
};

const updateMasivo = async (data) => {
	try {
		await axios.put(`${url}/carga-masiva`, data);
		messageSuccess(i18next.t('common.registro'));
	} catch (error) {
		console.log(error);
	}
};

export default {
	getOne,
	insert,
	update,
	del,
	findByCodCuadrilla,
	getOneSelect,
	createMasivo,
	updateMasivo,
};
