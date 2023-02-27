import { useCallback, useEffect, useState } from 'react';

import paisesMasterService from '../../../app-zonecl-comun/services/paisesMasterService';
import useDisabled from '../../../shared/hooks/useDisabled.js';
import useLoading from '../../../shared/hooks/useLoading.js';
import paisesService from '../../services/paisesService.js';

const useCreatePaises = (handleClose, loadDataPais) => {
	const { isActive, handleIsActiveOpen, handleIsActiveClose } = useDisabled();
	const { loading, showLoading, hideLoading } = useLoading();

	const [paisesMaster, setPaisesMaster] = useState([]);
	const [pais, setPais] = useState({});
	const [isActiveClose, setIsActiveClose] = useState(false);
	const [gentilicio, setGentilicio] = useState('');

	useEffect(() => {
		loadData();
	}, []);

	const loadData = useCallback(async () => {
		try {
			setPaisesMaster(await paisesMasterService.getAll());
		} catch (error) {
			console.log('Mi error', error);
		}
	});

	const onValueChanged = useCallback(async (e) => {
		const pais = await paisesMasterService.getOne(e.value);
		setGentilicio(pais.gentilicio);
		handleIsActiveClose();
		setPais(pais);
	}, []);

	const onInsert = async () => {
		showLoading();
		setIsActiveClose(true);
		await paisesService.insert({
			codPais: pais.codPais,
		});
		close();
		await loadDataPais();
	};

	const close = () => {
		setIsActiveClose(false);
		setGentilicio('');
		hideLoading();
		handleIsActiveOpen();
		handleClose();
	};

	return {
		isActive,
		loading,
		gentilicio,
		isActiveClose,
		paisesMaster,
		onInsert,
		close,
		onValueChanged,
	};
};

export default useCreatePaises;
