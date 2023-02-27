import { useCallback, useEffect, useState } from 'react';

import variedadesMasterService from '../../../app-zonecl-comun/services/variedadesMaster';
import useLoading from '../../../shared/hooks/useLoading';
import variedadesService from '../../services/variedadesService';
import useEspecies from '../especies/useEspecies';

const useCreateVariedades = (handleClose, loadDataVariedad) => {
	const { especies, loadEspecies } = useEspecies();
	const { loading, showLoading, hideLoading } = useLoading();
	const [variedadesMaster, setVariedadesMaster] = useState([]);
	const [codVariedad, setCodVariedad] = useState(0);
	const [isActive, setIsActive] = useState(true);
	const [isActiveButton, setIsActiveButton] = useState(true);
	const [isActiveClose, setIsActiveClose] = useState(false);
	const [nombreCorto, setNombreCorto] = useState('');
	const [nemoTecnico, setNemoTecnico] = useState('');

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			await loadEspecies();
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const onInsert = async () => {
		setIsActiveClose(true);
		showLoading();
		await variedadesService.insert({ codVariedad });
		close();
		await loadDataVariedad();
	};

	const onValueEspecieChanged = useCallback(async (e) => {
		setVariedadesMaster([]);
		const variedades = await variedadesMasterService.searchEspecies(e.value);

		if (variedades.length > 0) {
			setVariedadesMaster(variedades);
			setIsActive(false);
		} else {
			setVariedadesMaster([]);
			setIsActive(true);
		}
	}, []);

	const onValueVariedadChanged = useCallback(async (e) => {
		const variedadOne = await variedadesMasterService.getOne(e.value);
		setCodVariedad(variedadOne.codVariedad);
		setNombreCorto(variedadOne.nombreCorto);
		setNemoTecnico(variedadOne.nemoTecnico);
		setIsActiveButton(false);
	}, []);

	const close = () => {
		setIsActiveClose(false);
		setIsActiveButton(true);
		setNemoTecnico('');
		setNombreCorto('');
		handleClose();
		hideLoading();
		setIsActive(true);
	};

	return {
		especies,
		onValueVariedadChanged,
		close,
		onValueEspecieChanged,
		onInsert,
		isActive,
		isActiveButton,
		isActiveClose,
		nombreCorto,
		nemoTecnico,
		variedadesMaster,
		loading,
	};
};

export default useCreateVariedades;
