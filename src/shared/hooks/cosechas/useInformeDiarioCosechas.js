import { useEffect, useState } from 'react';

import useEspecies from '../../../app-zonecl-agricontrol/hooks/especies/useEspecies';
import useCampos from '../../../app-zonecl-agricontrol/hooks/useCampos';
import cosechaService from '../../services/cosechaService';

const useInformeDiarioCosechas = () => {
	const { campos, loadCamposDefault, campo, setCampo } = useCampos();
	const { especies, loadEspecies, especie, setEspecie } = useEspecies();
	const [datos, setDatos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fecha, setFecha] = useState();
	const [tipoInforme, setTipoInforme] = useState([
		{
			id: 1,
			text: 'Informe Resumido',
		},
		{
			id: 2,
			text: 'Informe Detallado',
		},
	]);

	const [informe, setInforme] = useState(1);

	const [messageError, setMessageError] = useState('');
	const [informColumns, setInformColumns] = useState(1);

	const handleChangeCampo = async (e) => {
		setCampo(e.value);
		localStorage.setItem('codCampo', e.value);
	};

	const handleChangeEspecie = async (e) => {
		setEspecie(e.value);
		localStorage.setItem('codEspecie', e.value);
	};

	const onSubmit = async () => {
		if (campo === 0 || especie === 0) {
			setMessageError('Debe seleccionar un campo y una especie');
		} else {
			setMessageError('');
			await loadInforme();
		}
	};

	const loadInforme = async () => {
		try {
			setLoading(true);
			if (informe === 1) {
				setInformColumns(1);
				setDatos(
					await cosechaService.informeDiarioResumido(fecha, campo, especie),
				);
			} else {
				setInformColumns(2);
				setDatos(
					await cosechaService.informeDiarioDetallado(fecha, campo, especie),
				);
			}
			setLoading(false);
		} catch (error) {
			console.log('Mi error', error);
			setLoading(false);
		}
	};
	const loadData = async () => {
		try {
			setLoading(true);
			await loadCamposDefault();
			await loadEspecies();
			setLoading(false);
		} catch (error) {
			console.log('Mi error', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		findMoreRecent();
		loadData();
	}, []);

	const findMoreRecent = async () => {
		const data = await cosechaService.findMoreRecentDate();

		const fechaCaptura = data.fechaCaptura !== null ? data.fechaCaptura : null;

		setFecha(fechaCaptura);
	};
	return {
		especies,
		campos,
		especie,
		campo,
		loading,
		setFecha,
		fecha,
		tipoInforme,
		setTipoInforme,
		datos,
		handleChangeEspecie,
		handleChangeCampo,
		onSubmit,
		messageError,
		informColumns,
		setInforme,
	};
};

export default useInformeDiarioCosechas;
