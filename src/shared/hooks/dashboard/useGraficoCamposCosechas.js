import { useEffect, useState } from 'react';

import cosechaService from '../../services/cosechaService';

const useGraficoCamposCosechas = (fecha, dataGrafico) => {
	const [dataSectores, setDataSectores] = useState([]);
	const [dataCuarteles, setDataCuarteles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [campo, setCampo] = useState('');
	const [sector, setSector] = useState('');

	useEffect(() => {
		setDataCuarteles([]);
		setDataSectores([]);
		setCampo('');
		setCampo('');
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

	const handlePointSectorClick = async (event) => {
		try {
			setLoading(true);
			const sector = event.target.data.codSector;
			const especie = event.target.data.codEspecie;

			const data = await cosechaService.searchCuartelesCosechas(
				fecha,
				sector,
				especie,
			);

			if (data.length > 0) {
				setCampo(data[0].campo);
				setSector(data[0].sector);
			} else {
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
		handlePointClick,
		dataSectores,
		dataCuarteles,
		handlePointSectorClick,
		setDataSectores,
		setDataCuarteles,
		loading,
		campo,
		sector,
	};
};

export default useGraficoCamposCosechas;
