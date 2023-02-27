import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useLoading from '../../../shared/hooks/useLoading';
import { fetchBancos } from '../../../shared/store/slices/bancos';
import { fetchContratistas } from '../../../shared/store/slices/contratistas';
import { fetchCuadrillas } from '../../../shared/store/slices/cuadrillas';
import { fetchEstados } from '../../../shared/store/slices/estados';
import { fetchEstadosCiviles } from '../../../shared/store/slices/estadosCiviles';
import { fetchPaises } from '../../../shared/store/slices/paises';
import { fetchSexos } from '../../../shared/store/slices/sexos';
import {
	dataFormasPagos,
	dataGrupoBins,
	trabajador as dataTrabajador,
} from '../../data/trabajadores';
import trabajadoresService from '../../services/trabajadoresService';

const useViewTrabajador = (id) => {
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);

	const { loading, showLoading, hideLoading } = useLoading();
	const { listSelect: paises } = useSelector((state) => state.paises);
	const { listSelect: cuadrillas } = useSelector((state) => state.cuadrillas);

	const { listSelect: estadosCiviles } = useSelector(
		(state) => state.estadosCiviles,
	);

	const { listSelect: bancos } = useSelector((state) => state.bancos);
	const { listSelect: contratistas } = useSelector(
		(state) => state.contratistas,
	);

	const { listSelect: sexos } = useSelector((state) => state.sexos);

	const [formasPagos, setFormatosPago] = useState([]);
	const [gruposBins, setGruposBins] = useState([]);
	const [trabajador, setTrabajador] = useState(dataTrabajador);
	const [url, setUrl] = useState([]);

	useEffect(() => {
		loadData(id);
	}, []);

	const loadData = async (id) => {
		showLoading();
		setUrl([
			{ name: 'trabajadores', url: '/trabajadores' },
			{ name: 'vista', url: `/trabajadores/view/${id}` },
		]);
		const data = await trabajadoresService.getOne(id);

		if (data !== null) setTrabajador(data);

		if (estados.length <= 0) dispatch(fetchEstados());

		if (paises.length <= 0) dispatch(fetchPaises());

		dispatch(fetchSexos());

		dispatch(fetchEstadosCiviles());

		dispatch(fetchBancos());

		if (cuadrillas.length <= 0) dispatch(fetchCuadrillas());

		if (contratistas.length <= 0) dispatch(fetchContratistas());

		setFormatosPago(dataFormasPagos);
		setGruposBins(dataGrupoBins);
		hideLoading();
	};

	return {
		formasPagos,
		gruposBins,
		cuadrillas,
		contratistas,
		sexos,
		paises,
		estadosCiviles,
		bancos,
		estados,
		trabajador,
		loading,
		url,
	};
};

export default useViewTrabajador;
