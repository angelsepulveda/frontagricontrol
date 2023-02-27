import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useDisabled from '../../../shared/hooks/useDisabled';
import { fetchEspecies } from '../../../shared/store/slices/especies';
import { fetchEstados } from '../../../shared/store/slices/estados';
import temporadasService from '../../services/temporadasService';

const useFormTemporadas = (
	handleClose,
	temporada,
	setTemporada,
	setFormModal,
	loadDataMain,
) => {
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: especies } = useSelector((state) => state.especies);
	const { isActive, handleIsActiveOpen, handleIsActiveClose } = useDisabled();
	const [formTemporada, setFormTemporada] = useState({
		codTemporada: 0,
		codEspecie: 0,
		inicio: null,
		termino: null,
		codEstado: null,
	});

	useEffect(() => {
		loadData(temporada);
	}, []);

	const loadData = async (temporada) => {
		try {
			initTemporada(temporada);
			handleIsActiveClose();

			if (estados.length <= 0) dispatch(fetchEstados());

			if (especies.length <= 0) dispatch(fetchEspecies());
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const handleChangeEstado = (e) => {
		setFormTemporada({
			...formTemporada,
			codEstado: e.value,
		});
	};

	const handleChangeEspecie = (e) => {
		setFormTemporada({
			...formTemporada,
			codEspecie: e.value,
		});
	};

	const initTemporada = (temporada) => {
		setFormTemporada(temporada);
	};

	const handleChangeInicio = (e) => {
		let temporadaName = '';
		let fecha = e.value;

		if (formTemporada.termino !== null && fecha > formTemporada.termino) {
			fecha = formTemporada.termino;
		}

		setFormTemporada({
			...formTemporada,
			inicio: fecha,
		});

		if (formTemporada.termino !== null) {
			const inicio = new Date(fecha).getFullYear();
			const termino = new Date(formTemporada.termino).getFullYear();

			if (inicio !== termino) {
				temporadaName = inicio.toString() + '-' + termino.toString();
			} else {
				temporadaName = inicio.toString();
			}

			setFormTemporada({
				...formTemporada,
				inicio: fecha,
				temporada: temporadaName,
			});
		}
	};

	const handleChangeTermino = (e) => {
		let temporadaName = '';

		let fecha = e.value;

		if (formTemporada.inicio !== null && fecha < formTemporada.inicio) {
			fecha = formTemporada.inicio;
		}

		setFormTemporada({
			...formTemporada,
			termino: fecha,
		});

		if (formTemporada.inicio !== null) {
			const inicio = new Date(formTemporada.inicio).getFullYear();
			const termino = new Date(fecha).getFullYear();

			if (inicio !== termino) {
				temporadaName = inicio.toString() + '-' + termino.toString();
			} else {
				temporadaName = inicio.toString();
			}

			setFormTemporada({
				...formTemporada,
				termino: fecha,
				temporada: temporadaName,
			});
		} else {
			setFormTemporada({
				...formTemporada,
				temporada: temporadaName,
			});
		}
	};

	const onInsert = async (e) => {
		e.preventDefault();
		if (temporada.codTemporada === 0) {
			handleIsActiveOpen();
			await temporadasService.insert(formTemporada);
		} else {
			handleIsActiveOpen();
			await temporadasService.update(temporada.codTemporada, {
				codEspecie: formTemporada.codEspecie,
				inicio: formTemporada.inicio,
				temporada: formTemporada.temporada,
				termino: formTemporada.termino,
				codEstado: formTemporada.codEstado,
			});
		}
		close();
	};

	const close = () => {
		setTemporada({
			codTemporada: 0,
			codEspecie: 0,
			inicio: null,
			termino: null,
			codEstado: null,
		});
		setFormModal(false);
		handleClose();
		loadDataMain();
	};

	return {
		especies,
		onInsert,
		isActive,
		close,
		estados,
		handleChangeEstado,
		formTemporada,
		handleChangeInicio,
		handleChangeTermino,
		handleChangeEspecie,
	};
};

export default useFormTemporadas;
