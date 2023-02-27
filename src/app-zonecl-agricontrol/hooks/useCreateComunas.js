import { useCallback, useEffect, useState } from 'react';

import comunasMasterService from '../../app-zonecl-comun/services/comunasMasterService';
import useDisabled from '../../shared/hooks/useDisabled';
import useLoading from '../../shared/hooks/useLoading';
import comunasService from '../services/comunasService';
import useRegiones from './regiones/useRegiones';

const useCreateComunas = (closeHandle, loadDataComuna) => {
	const { regiones, loadRegiones } = useRegiones();
	const { isActive, handleIsActiveOpen, handleIsActiveClose } = useDisabled();
	const { loading, showLoading, hideLoading } = useLoading();
	const [codComunaValue, setCodComunaValue] = useState(0);
	const [comunasMaster, setComunasMaster] = useState([]);
	const [nemoTecnico, setNemoTecnico] = useState('');
	const [isMessageValidation, setIsMessageValidation] = useState(false);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			await loadRegiones();
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const onInsert = async () => {
		if (codComunaValue !== 0) {
			handleIsActiveOpen();
			showLoading();
			await comunasService.insert({ codComuna: codComunaValue });
			close();
			await loadDataComuna();
		} else {
			setIsMessageValidation(true);
		}
	};

	const onValueRegionChanged = useCallback(async (e) => {
		const comunas = await comunasMasterService.searchRegion(e.value);
		if (comunas.length > 0) {
			setComunasMaster(comunas);
			handleIsActiveClose();
		} else {
			setComunasMaster([]);
			handleIsActiveOpen();
		}
	}, []);

	const onValueComunaChanged = useCallback(async (e) => {
		setIsMessageValidation(false);
		const comuna = await comunasMasterService.getOne(e.value);
		setCodComunaValue(comuna.codComuna);
		setNemoTecnico(comuna.nemoTecnico);
	}, []);

	const close = () => {
		handleIsActiveClose();
		setIsMessageValidation(false);
		setNemoTecnico('');
		setCodComunaValue(0);
		closeHandle();
		hideLoading();
		handleIsActiveOpen();
	};
	return {
		regiones,
		nemoTecnico,
		close,
		onValueComunaChanged,
		onValueRegionChanged,
		isActive,
		onInsert,
		loading,
		comunasMaster,
		isMessageValidation,
	};
};

export default useCreateComunas;