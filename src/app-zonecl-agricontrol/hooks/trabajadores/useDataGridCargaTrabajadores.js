import CustomStore from 'devextreme/data/custom_store';
import { useEffect, useRef, useState } from 'react';

import { messageConfirm } from '../../../shared/helpers/message';
import { useCargaMasivaTrabajadoresContext } from '../../contexts/cargaMasivaTrabajadores';

const useDataGridCargaTrabajadores = () => {
	const [trabajadoresStore, setTrabajadoresStore] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [totalSeleccionados, setTotalSeleccionados] = useState('0');
	const linkRef = useRef(null);
	const { trabajadores, cuadrillas, sexos, contratistas, dispatch, addButton } =
		useCargaMasivaTrabajadoresContext();

	useEffect(() => {
		loadData();
	}, [trabajadores]);

	const loadData = () => {
		setTrabajadoresStore(
			new CustomStore({
				key: 'codTrabajador',
				load: () => getTrabajadores(trabajadores),
				insert: (values) => insertTrabajador(values),
				update: (key, values) => updateTrabajador(key, values),
				remove: (key) => removeTrabajador(key),
			}),
		);
	};

	const handleExcelClick = () => {
		linkRef.current.click();
	};

	const getTrabajadores = (trabajadores) => {
		return trabajadores;
	};

	const updateTrabajador = (key, values) => {
		const updatedTrabajadores = trabajadores.map((item) => {
			if (item.codTrabajador === key) {
				return { ...item, ...values };
			}
			return item;
		});

		dispatch({ type: 'LOAD_TRABAJADORES', payload: updatedTrabajadores });
	};

	const insertTrabajador = (values) => {
		const newTrabajadores = [...trabajadores, values];
		dispatch({ type: 'LOAD_TRABAJADORES', payload: newTrabajadores });
	};

	const removeTrabajador = (key) => {
		const removeTrabajadores = trabajadores.filter(
			(item) => item.codTrabajador !== key,
		);

		dispatch({ type: 'LOAD_TRABAJADORES', payload: removeTrabajadores });
	};

	const onSelectionChangedData = ({ selectedRowKeys, selectedRowsData }) => {
		setSelectedRowKeys(selectedRowKeys);
		setTotalSeleccionados(selectedRowsData.length.toString());
	};

	const handleRemove = () => {
		const message = {
			text: 'Estas seguro de ingresar estos registros?',
			confirmButtonText: 'Aceptar',
		};
		messageConfirm(message, () => {
			const removeTrabajadores = trabajadores.filter(
				(item) => !selectedRowKeys.includes(item.codTrabajador),
			);

			dispatch({ type: 'LOAD_TRABAJADORES', payload: removeTrabajadores });
		});
	};

	return {
		trabajadoresStore,
		sexos,
		cuadrillas,
		contratistas,
		addButton,
		linkRef,
		handleExcelClick,
		selectedRowKeys,
		onSelectionChangedData,
		totalSeleccionados,
		handleRemove,
	};
};

export default useDataGridCargaTrabajadores;
