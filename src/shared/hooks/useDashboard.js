import { useEffect, useState } from 'react';

import useEspecies from '../../app-zonecl-agricontrol/hooks/especies/useEspecies';
import cosechaService from '../services/cosechaService';

const useDashboard = () => {
	const { especies, loadEspecies } = useEspecies();
	const [fecha, setFecha] = useState(undefined);
	const [especie, setEspecie] = useState(undefined);
	const [dataGrafico, setDataGrafico] = useState([]);
	const [loading, setLoading] = useState(false);
	const [dataVariedades, setDataVariedades] = useState([]);
	const [dataCuadrillas, setDataCuadrillas] = useState([]);
	const [value, setValue] = useState('1');
	const [valueCuadrilla, setValueCuadrilla] = useState('1');
	const [valueFormatoCosecha, setValueFormatoCosecha] = useState('1');
	const [dataFormatoCosecha, setDataFormatoCosecha] = useState([]);
	const [dataContratista, setDataContratista] = useState([]);
	const [valueTrabajadores, setValueTrabajadores] = useState('1');
	const [dataTrabajadores, setDataTrabajadores] = useState([]);
	const [tiempoReal, setTiempoReal] = useState(false);

	const handleChange = (event, newValue) => {
		localStorage.setItem('valueCampoGrafico', newValue);
		setValue(newValue);
	};

	const handleCuadrillaChange = (event, newValue) => {
		localStorage.setItem('valueCuadrillaGrafico', newValue);
		setValueCuadrilla(newValue);
	};

	const handleChangeFormatoCosecha = (event, newValue) => {
		localStorage.setItem('valueFormatoCosechaGrafico', newValue);
		setValueFormatoCosecha(newValue);
	};

	useEffect(() => {
		try {
			loadFecha();
			loadEspecieGrafico();
			tabGraficos(false);
		} catch (error) {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadCosechas();
	}, [especie, fecha]);

	useEffect(() => {
		if (tiempoReal !== false) {
			const interval = setInterval(async function () {
				await loadCosechas(true);
			}, 30000);
			return () => clearInterval(interval);
		}
	}, [tiempoReal]);

	useEffect(() => {
		const fechaActual = new Date().toLocaleDateString();

		const fechaUsuario = new Date(fecha).toLocaleDateString();

		if (fechaUsuario === fechaActual) {
			setTiempoReal(true);
		} else {
			setTiempoReal(false);
		}
	}, [fecha]);

	const tabGraficos = () => {
		const valueCuadrillaGrafico = localStorage.getItem('valueCuadrillaGrafico');

		if (valueCuadrillaGrafico !== null) {
			setValueCuadrilla(valueCuadrillaGrafico.toString());
		} else {
			setValueCuadrilla('1');
		}

		const valueFormatoCosechaGrafico = localStorage.getItem(
			'valueFormatoCosechaGrafico',
		);

		if (valueFormatoCosechaGrafico !== null) {
			setValueFormatoCosecha(valueFormatoCosechaGrafico.toString());
		} else {
			setValueFormatoCosecha('1');
		}

		const valueCampoGrafico = localStorage.getItem('valueCampoGrafico');

		if (valueCampoGrafico !== null) {
			setValue(valueCampoGrafico.toString());
		} else {
			setValue('1');
		}
	};

	const loadEspecieGrafico = async () => {
		const especiesData = await loadEspecies();
		const codEspecie = localStorage.getItem('codEspecie');

		if (codEspecie !== null) {
			setEspecie(parseInt(codEspecie));
		} else {
			setEspecie(parseInt(especiesData[0].codEspecie));
		}
	};

	const loadFecha = async () => {
		const dataFecha = await cosechaService.findMoreRecentDate();
		console.log(dataFecha);

		setFecha(dataFecha.fechaCaptura);
	};
	const loadCosechas = async (tiempo = false) => {
		if (especie && especie !== null && fecha && fecha !== null) {
			if (tiempo === false) {
				setLoading(true);
			}
			const data = await cosechaService.searchCamposCosechas(fecha, especie);
			const dataVariedad = await cosechaService.searchVariedadesCosechas(
				fecha,
				especie,
			);
			const dataCuadrillas = await cosechaService.searchCuadrillasCosechas(
				fecha,
				especie,
			);
			const dataFormatoCosecha = await cosechaService.searchFormatoCosechas(
				fecha,
				especie,
			);

			const dataContratista = await cosechaService.searchContratistas(
				fecha,
				especie,
			);

			const dataTrabajadores = await cosechaService.searchTrabajadoresCosechas(
				fecha,
				especie,
			);

			setDataGrafico(data);
			setDataTrabajadores(dataTrabajadores);
			setDataVariedades(dataVariedad);
			setDataCuadrillas(dataCuadrillas);
			setDataFormatoCosecha(dataFormatoCosecha);
			setDataContratista(dataContratista);
			setValueTrabajadores('1');
			if (tiempo === false) {
				setLoading(false);
			}
		}
	};

	const handleChangeEspecie = async (e) => {
		localStorage.setItem('codEspecie', e.value);
		setEspecie(e.value);
	};

	const handleChangeFecha = async (e) => {
		setFecha(e.value);
	};

	const handleChangeTrabajadores = async (event, newValue) => {
		setValueTrabajadores(newValue);
	};

	return {
		//handleSliceClick,
		especie,
		especies,
		handleChangeEspecie,
		fecha,
		handleChangeFecha,
		dataGrafico,
		loading,
		dataVariedades,
		dataCuadrillas,
		handleChange,
		value,
		valueCuadrilla,
		handleCuadrillaChange,
		valueFormatoCosecha,
		handleChangeFormatoCosecha,
		dataFormatoCosecha,
		dataContratista,
		dataTrabajadores,
		valueTrabajadores,
		handleChangeTrabajadores,
	};
};

export default useDashboard;
