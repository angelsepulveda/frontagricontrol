import { useEffect, useState } from 'react';

import cosechaService from '../../services/cosechaService';

const useGraficoVariedadesCosechas = (fecha, dataVariedades) => {
	const [dataCampos, setDataCampos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dataSectores, setDataSectores] = useState([]);
	const [dataCuarteles, setDataCuarteles] = useState([]);
	const [variedad, setVariedad] = useState('');
	const [campo, setCampo] = useState('');
	const [sector, setSector] = useState('');

	useEffect(() => {
		setDataCampos([]);
		setDataSectores([]);
		setDataCuarteles([]);
	}, [dataVariedades]);

	const handlePointVariedadesClick = async (event) => {
		try {
			setLoading(true);
			const variedad = event.target.data.codVariedad;

			const data = await cosechaService.searchCamposVariedadesCosechas(
				fecha,
				variedad,
			);
			console.log(data);

			setDataCampos(data);

			if (data.length > 0) {
				setVariedad(data[0].variedad);
			} else {
				setVariedad('');
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};
	const handlePointCampoVariedadesClick = async (event) => {
		try {
			setLoading(true);
			const variedad = event.target.data.codVariedad;
			const campo = event.target.data.codCampo;

			const data = await cosechaService.searchSectoresVariedadesCosechas(
				fecha,
				campo,
				variedad,
			);

			if (data.length > 0) {
				setVariedad(data[0].variedad);
				setCampo(data[0].campo);
			} else {
				setVariedad('');
				setCampo('');
			}

			setDataSectores(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handlePointSectorVariedadesClick = async (event) => {
		try {
			setLoading(true);
			const variedad = event.target.data.codVariedad;
			const sector = event.target.data.codSector;
			const data = await cosechaService.searchCuartelesVariedadesCosechas(
				fecha,
				sector,
				variedad,
			);

			if (data.length > 0) {
				setVariedad(data[0].variedad);
				setCampo(data[0].campo);
				setSector(data[0].sector);
			} else {
				setVariedad('');
				setCampo('');
				setSector('');
			}

			setDataCuarteles(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return {
		handlePointVariedadesClick,
		dataCampos,
		loading,
		setDataCampos,
		handlePointCampoVariedadesClick,
		setDataSectores,
		dataSectores,
		handlePointSectorVariedadesClick,
		dataCuarteles,
		setDataCuarteles,
		variedad,
		campo,
		sector,
	};
};

export default useGraficoVariedadesCosechas;
