import CustomStore from 'devextreme/data/custom_store';
import { useContext, useEffect, useState } from 'react';

import useFetchAndLoad from '../../../shared/hooks/useFetchAndLoad';
import { appContext } from '../../../shared/layouts/LayoutAdmin';
import { findTrabajadoresActives } from '../../services/trabajadoresService';

const useModalTrabajadoresCuadrillas = (
	loadTrabajadoresCuadrillas,
	loadDataTrabajadoresCuadrillas,
	handleClose,
	selectedTrabajadores,
	trabajadoresCuadrillas,
) => {
	const app = useContext(appContext);
	const [estados, setEstados] = useState([]);
	const { callEndpoint } = useFetchAndLoad();

	const [trabajadoresCuadrillasStore, setTrabajadoresCuadrillasStore] =
		useState([]);

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [trabajadoresCuadrilla, setTrabajadoresCuadrilla] = useState([]);
	const [isDisabled, setIsDisabled] = useState(true);
	const [totalSeleccionados, setTotalSeleccionados] = useState('0');
	useState([]);

	useEffect(() => {
		loadData();
		loadSelected(selectedTrabajadores);
	}, []);

	const loadData = async () => {
		try {
			setTrabajadoresCuadrillasStore(
				new CustomStore({
					key: 'codTrabajador',
					load: () => loadTrabajadoresData(),
				}),
			);
			setEstados(app.estados);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadTrabajadoresData = async () => {
		const data = await callEndpoint(findTrabajadoresActives('0'));
		if (trabajadoresCuadrillas !== null) {
			if (trabajadoresCuadrillas.length > 0) {
				trabajadoresCuadrillas.forEach((trabajador) => {
					data.push(trabajador);
				});
				setTotalSeleccionados(trabajadoresCuadrillas.length.toString());
				return data;
			} else {
				return data;
			}
		} else {
			return data;
		}
	};

	const loadSelected = (selectedTrabajadoresCuadrilla) => {
		if (selectedTrabajadoresCuadrilla === null) {
			loadSelectRowKeys([]);
		} else {
			const codTrabajadores = selectedTrabajadoresCuadrilla.map(
				(item) => item.codTrabajador,
			);

			loadSelectRowKeys(codTrabajadores);
		}
	};
	const onSelectionChangedData = ({ selectedRowKeys, selectedRowsData }) => {
		loadSelectRowKeys(selectedRowKeys);
		setTrabajadoresCuadrilla(selectedRowsData);
		setTotalSeleccionados(selectedRowsData.length.toString());
		if (selectedRowsData.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	const loadSelectRowKeys = (data) => {
		setSelectedRowKeys(data);
	};

	const onSubmitModal = () => {
		loadTrabajadoresCuadrillas(trabajadoresCuadrilla);
		handleClose();
		loadDataTrabajadoresCuadrillas(trabajadoresCuadrilla);
	};
	return {
		trabajadoresCuadrillasStore,
		loadData,
		estados,
		selectedRowKeys,
		onSelectionChangedData,
		onSubmitModal,
		isDisabled,
		totalSeleccionados,
	};
};

export default useModalTrabajadoresCuadrillas;
