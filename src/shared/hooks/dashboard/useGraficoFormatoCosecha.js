import { useEffect, useState } from 'react';

import cosechaService from '../../services/cosechaService';

const useGraficoFormatoCosecha = (fecha, dataGrafico) => {
	const [dataSectores, setDataSectores] = useState([]);
	const [dataCuarteles, setDataCuarteles] = useState([]);
	const [dataCampos, setDataCampos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [campo, setCampo] = useState('');
	const [sector, setSector] = useState('');
	const [formato, setFormato] = useState('');

	useEffect(() => {
		setDataCuarteles([]);
		setDataSectores([]);
		setDataCampos([]);

		setCampo('');
		setSector('');
	}, [dataGrafico]);
	const handlePointClick = async (event) => {
		try {
			setLoading(true);
			const campo = event.target.data.codCampo;
			const especie = event.target.data.codEspecie;

			const data = await cosechaService.searchSectoresCosechas(
				fecha,
				campo,
				especie,
			);

			if (data.length > 0) {
				setCampo(data[0].campo);
			} else {
				setCampo('');
			}
			setDataSectores(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handlePointCampoClick = async (event) => {
		try {
			setLoading(true);
			const formatoCosecha = event.target.data.codFormatoCosecha;

			const data = await cosechaService.graficoFormatoCosecha({
				fecha,
				formatoCosecha,
			});

			setDataCampos(data);
			console.log(data);

			if (data.length > 0) {
				setCampo(data[0].campo);
				setFormato(data[0].descripcion);
			} else {
				setCampo('');
				setFormato('');
			}

			setDataCampos(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handlePointSectorClick = async (event) => {
		try {
			setLoading(true);
			const formatoCosecha = event.target.data.codFormatoCosecha;

			const data = await cosechaService.graficoFormatoCosecha({
				fecha,
				formatoCosecha,
			});

			setDataSectores(data);

			if (data.length > 0) {
				setCampo(data[0].campo);
				setSector(data[0].sector);
				setFormato(data[0].descripcion);
			} else {
				setCampo('');
				setSector('');
				setFormato('');
			}

			setDataSectores(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handlePointCuartelClick = async (event) => {
		try {
			setLoading(true);
			const formatoCosecha = event.target.data.codFormatoCosecha;
			const sector = event.target.data.codSector;

			const data = await cosechaService.graficoFormatoCosecha({
				fecha,
				sector,
				formatoCosecha,
			});

			setDataCampos(data);

			if (data.length > 0) {
				setSector(data[0].sector);
				setCampo(data[0].campo);
				setFormato(data[0].descripcion);
			} else {
				setCampo('');
				setSector('');
				setFormato('');
			}

			setDataCuarteles(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const customizeTooltip = (arg) => {
		return {
			text: `Kilos: ${arg.originalValue.toString()}`,
		};
	};

	return {
		handlePointClick,
		customizeTooltip,
		dataSectores,
		dataCuarteles,
		handlePointCampoClick,
		handlePointSectorClick,
		handlePointCuartelClick,
		setDataSectores,
		setDataCuarteles,
		loading,
		campo,
		sector,
		dataCampos,
		setDataCampos,
		formato,
	};
};

export default useGraficoFormatoCosecha;
