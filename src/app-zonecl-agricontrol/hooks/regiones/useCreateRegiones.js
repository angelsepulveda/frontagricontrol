import { useEffect, useState } from 'react';

import regionesMasterService, {
	getOne,
} from '../../../app-zonecl-comun/services/regionesMasterService';
import useDisabled from '../../../shared/hooks/useDisabled';
import useLoading from '../../../shared/hooks/useLoading';
import regionesService from '../../services/regionesService';
import usePaises from '../paises/usePaises';

const useCreateRegiones = (closeHandle, loadDataRegion) => {
	const { paises, loadPaises } = usePaises();
	const { isActive, handleIsActiveOpen, handleIsActiveClose } = useDisabled();
	const { loading, showLoading, hideLoading } = useLoading();
	const [codRegionValue, setCodRegionValue] = useState(0);
	const [regionesMaster, setRegionesMaster] = useState([]);
	const [nemoTecnico, setNemoTecnico] = useState('');
	const [isMessageValidation, setIsMessageValidation] = useState(false);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			await loadPaises();
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const onInsert = async () => {
		if (codRegionValue !== 0) {
			handleIsActiveOpen();
			showLoading();
			await regionesService.insert({ codRegion: codRegionValue });
			close();
			await loadDataRegion();
		} else {
			setIsMessageValidation(true);
		}
	};

	const onValuePaisChanged = async (e) => {
		console.log('e', e.value);
		const region = await regionesMasterService.searchPais(e.value);

		if (region.length > 0) {
			setRegionesMaster(region);
			handleIsActiveClose();
		} else {
			setRegionesMaster([]);
			handleIsActiveOpen();
		}
	};

	const onValueRegionChanged = async (e) => {
		setIsMessageValidation(false);
		const region = await getOne(e.value).call;
		setCodRegionValue(region.codRegion);
		setNemoTecnico(region.nemoTecnico);
	};

	const close = () => {
		handleIsActiveClose();
		setIsMessageValidation(false);
		setNemoTecnico('');
		setCodRegionValue(0);
		closeHandle();
		hideLoading();
		handleIsActiveOpen();
	};
	return {
		paises,
		nemoTecnico,
		close,
		onValueRegionChanged,
		onValuePaisChanged,
		isActive,
		onInsert,
		loading,
		regionesMaster,
		isMessageValidation,
	};
};

export default useCreateRegiones;
