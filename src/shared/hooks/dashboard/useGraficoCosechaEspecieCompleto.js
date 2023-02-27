import { useEffect, useState } from 'react';

import useCampos from '../../../app-zonecl-agricontrol/hooks/useCampos';
import cosechaService from '../../services/cosechaService';

const useGraficoCosechaEspecieCompleto = () => {
	const { campos, loadCamposDefault } = useCampos();

	const [campo, setCampo] = useState(
		localStorage.getItem('codCampo') ? localStorage.getItem('codCampo') : '0',
	);

	const [messageError, setMessageError] = useState('');
	const [isFirstLevel, setIsFirstLevel] = useState(true);
	const [dataSource, setDataSource] = useState([
		{ arg: '', val: 0, parentID: '' },
	]);

	const [buttonClick, setButtonClick] = useState(false);

	const colors = ['#6babac', '#e55253'];

	const handleChangeCampo = async (e) => {
		setCampo(e.value);
		localStorage.setItem('codCampo', e.value);
	};

	const [loading, setLoading] = useState(false);
	const [fechaDesde, setFechaDesde] = useState(new Date());
	const [fechaHasta, setFechaHasta] = useState(new Date());
	const [data, setData] = useState([]);

	const onSubmit = () => {
		if (campo === null) {
			setMessageError('Debe seleccionar un campo');
		} else {
			setButtonClick(true);
			setMessageError('');
			loadData();
		}
	};

	useEffect(() => {
		loadInit();
	}, []);

	const loadData = async () => {
		try {
			if (buttonClick === false) {
				setLoading(true);
				setIsFirstLevel(true);
				const fecha = await cosechaService.findMoreRecentDate();

				if (fecha.fechaCaptura === undefined) {
					setDataSource([]);
					setLoading(false);
					setData([]);
				} else {
					const result = await cosechaService.informeCompletoGrafico(
						fecha.fechaCaptura,
						fecha.fechaCaptura,
						campo,
					);
					setData(result);
					const search = result.filter((item) => item.parentID === '');
					setDataSource(search);

					setLoading(false);
				}
			} else {
				setLoading(true);
				setIsFirstLevel(true);
				const result = await cosechaService.informeCompletoGrafico(
					fechaDesde,
					fechaHasta,
					campo,
				);
				setData(result);
				const search = result.filter((item) => item.parentID === '');
				setDataSource(search);

				setLoading(false);
			}
		} catch (error) {
			console.log('Mi error', error);
			setDataSource([]);
			setLoading(false);
		}
	};

	const informeCompletoDetalleGrafico = (arg) => {
		try {
			if (isFirstLevel) {
				setLoading(true);
				setIsFirstLevel(false);
				const data = filterGrafico(arg);
				setDataSource(data);
				setLoading(false);
			}
		} catch (e) {
			setLoading(false);
			console.log('Mi error', e);
		}
	};

	const loadInit = async () => {
		try {
			setLoading(true);
			await loadCamposDefault();
			const fecha = await cosechaService.findMoreRecentDate();
			if (fecha.fechaCaptura !== undefined) {
				setFechaHasta(new Date(fecha.fechaCaptura));
				await loadData();
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	};
	const filterGrafico = (arg) => {
		return data.filter((item) => item.parentID === arg);
	};

	const customizePoint = () => {
		return {
			color: colors[Number(isFirstLevel)],
			hoverStyle: !isFirstLevel
				? {
						hatching: 'none',
				  }
				: {},
		};
	};

	const onButtonClick = () => {
		if (!isFirstLevel) {
			setIsFirstLevel(true);
			setDataSource(filterGrafico(''));
		}
	};
	return {
		dataSource,
		fechaHasta,
		fechaDesde,
		loading,
		setFechaHasta,
		setFechaDesde,
		campos,
		campo,
		handleChangeCampo,
		onSubmit,
		messageError,
		informeCompletoDetalleGrafico,
		isFirstLevel,
		customizePoint,
		onButtonClick,
		setButtonClick,
	};
};

export default useGraficoCosechaEspecieCompleto;
