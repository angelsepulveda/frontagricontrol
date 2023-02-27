import { useCallback, useEffect, useState } from 'react';

import especiesMasterService from '../../../app-zonecl-comun/services/especiesMasterService';
import useDisabled from '../../../shared/hooks/useDisabled';
import useLoading from '../../../shared/hooks/useLoading';
import especiesService from '../../services/especiesService';

const useCreateEspecie = (handleClose, loadDataPais) => {
	const { isActive, handleIsActiveOpen, handleIsActiveClose } = useDisabled();
	const { loading, showLoading, hideLoading } = useLoading();
	const [especiesMaster, setEspeciesMaster] = useState([]);
	const [especie, setEspecie] = useState({});
	const [isActiveClose, setIsActiveClose] = useState(false);
	const [nemoTecnico, setNemoTecnico] = useState('');

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		try {
			setEspeciesMaster(await especiesMasterService.getAll());
		} catch (error) {
			console.log('Mi error', error);
		}
	}

	const onValueChanged = useCallback(async (e) => {
		const especie = await especiesMasterService.getOne(e.value);
		setNemoTecnico(especie.nemoTecnico);
		handleIsActiveClose();
		setEspecie(especie);
	}, []);

	const onInsert = async () => {
		setIsActiveClose(true);
		showLoading();
		await especiesService.insert({
			codEspecie: especie.codEspecie,
		});
		close();
		await loadDataPais();
	};

	const close = () => {
		setIsActiveClose(false);
		setNemoTecnico('');
		hideLoading();
		handleIsActiveOpen();
		handleClose();
	};

	return {
		especiesMaster,
		especie,
		nemoTecnico,
		isActiveClose,
		onValueChanged,
		loading,
		onInsert,
		isActive,
		close,
	};
};

export default useCreateEspecie;
