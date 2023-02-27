import { useEffect, useState } from 'react';

import useEspecies from '../../../app-zonecl-agricontrol/hooks/especies/useEspecies';
import useCampos from '../../../app-zonecl-agricontrol/hooks/useCampos';
import cosechaService from '../../services/cosechaService';

const useGraficoCosechaEspecieDiario = () => {
	const { campos, loadCamposDefault, campo, setCampo } = useCampos();
	const { especies, loadEspeciesDefault, especie, setEspecie } = useEspecies();

	const [messageError, setMessageError] = useState('');
	const [dataSource, setDataSource] = useState([{ variedad: '', kilos: 0 }]);
	const [loading, setLoading] = useState(false);

	const handleChangeCampo = async (e) => {
		setCampo(e.value);
		localStorage.setItem('codCampo', e.value);
	};

	const handleChangeEspecie = async (e) => {
		setEspecie(e.value);
		localStorage.setItem('codEspecie', e.value);
	};

	useEffect(() => {
		loadEspeciesDefault();
		loadCamposDefault();
		loadData(campo, especie);
		console.log(localStorage.getItem('codEspecie'));
	}, [especies]);

	useEffect(() => {
		const interval = setInterval(async function () {
			if (campo !== 0 || especie !== 0) {
				await loadData(campo, especie);
			}
		}, 30000);
		return () => clearInterval(interval);
	}, [dataSource]);

	const onSubmit = async () => {
		if (campo !== null || especie !== null) {
			setMessageError('');
			setLoading(true);
			await loadData(campo, especie);
			setLoading(false);
		} else {
			setMessageError('Debe seleccionar un campo y una especie');
			setLoading(false);
		}
	};

	const loadData = async (codCampo, codEspecie) => {
		try {
			setDataSource(
				await cosechaService.informeDiarioGrafico(
					new Date('2022-10-4'),
					codCampo,
					codEspecie,
				),
			);
		} catch (error) {
			setDataSource([]);
			console.log('Mi error', error);
			setLoading(false);
		}
	};

	return {
		dataSource,
		campos,
		campo,
		especies,
		especie,
		handleChangeCampo,
		handleChangeEspecie,
		onSubmit,
		messageError,
		loadCamposDefault,
		loadEspeciesDefault,
		loadData,
		loading,
	};
};

export default useGraficoCosechaEspecieDiario;
