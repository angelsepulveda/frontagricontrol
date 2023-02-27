import { useEffect, useState } from 'react';

import { getAll as getAllTratos } from '../../../../app-zonecl-agricontrol/services/tratoService';
import i18next from '../../../config/translation';
import { useWizardContext } from '../../../contexts/wizard';
import { messageConfirm } from '../../../helpers/message';
import cosechaService from '../../../services/cosechaService';

const disabled = {
	cuadrilla: false,
	cuartel: false,
	trabajador: false,
	campo: false,
	fechaCaptura: false,
	variedad: false,
	calidad: false,
	contratista: false,
	jefeCuadrilla: false,
	formatoCosecha: false,
	trato: false,
	sector: false,
};

export const useRegularizacion = (produccionData) => {
	const [isDisableForm, setIsDisableForm] = useState(disabled);
	const { dispatch, goPrevPage } = useWizardContext();
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [totalSeleccionados, setTotalSeleccionados] = useState('0');
	const [buttonSave, setButtonSave] = useState(false);
	const [regularizacionForm, setRegularizacionForm] = useState({
		codCuartel: undefined,
		codEspecie: undefined,
		codVariedad: undefined,
		codCampo: undefined,
		codFormatoCosecha: undefined,
		trato: undefined,
		codCuadrilla: undefined,
		codTrabajador: undefined,
		codCalidad: undefined,
	});
	const [messageError, setMessageError] = useState('');
	const [dataSelected, setDataSelected] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [tratos, setTratos] = useState([]);
	const [codCampo, setCampo] = useState('0');

	const handleBack = () => {
		dispatch({ type: 'PRODUCCION_FETCHED', payload: [] });
		goPrevPage();
	};

	useEffect(() => {
		changeButtonSave(true);
		loadTratos();
		getOneCampo(produccionData);
	}, []);

	const getOneCampo = (produccionData) => {
		for (const i in produccionData) {
			const codCampo = produccionData[i].codCampo;
			setCampo(codCampo);
		}
	};

	const loadTratos = async () => {
		const { data } = await getAllTratos().call;

		setTratos(data);
	};

	const onSelectionChangedData = ({ selectedRowKeys, selectedRowsData }) => {
		const dataSelected = selectedRowsData.map((item) => {
			return {
				codProduccion: item.codProduccion,
				fechaCaptura: item.fechaCapturaData,
			};
		});

		loadSelectRowKeys(selectedRowKeys);
		setDataSelected(dataSelected);

		if (selectedRowsData.length > 0) {
			setIsDelete(true);
		} else {
			setIsDelete(false);
		}

		setTotalSeleccionados(selectedRowsData.length.toString());
		setMessageError('');
	};

	const loadSelectRowKeys = (data) => {
		setSelectedRowKeys(data);
	};

	const changeButtonSave = (value) => {
		setButtonSave(value);
	};

	const handleSubmit = async () => {
		i18next.setDefaultNamespace('global');
		if (totalSeleccionados === '0') {
			setMessageError(i18next.t('common.validacionSeleccion'));
		} else if (regularizacionForm !== null) {
			const message = {
				text: i18next.t('common.preguntaModificarRegistros'),
				confirmButtonText: i18next.t('common.modificar'),
			};

			messageConfirm(message, async () => {
				setIsLoading(true);
				const data = {
					producciones: dataSelected,
					values: regularizacionForm,
				};
				await cosechaService.update(data);
				setIsLoading(false);
				goPrevPage();
			});
		} else {
			setMessageError(i18next.t('common.validacionSeleccion'));
		}
	};

	const handleDelete = async () => {
		i18next.setDefaultNamespace('global');
		if (totalSeleccionados === '0') {
			setMessageError(i18next.t('common.validacionSeleccion'));
		} else {
			const message = {
				text: i18next.t('common.preguntaEliminarRegistros'),
				confirmButtonText: i18next.t('common.eliminar'),
			};

			messageConfirm(message, async () => {
				setIsLoading(true);
				const data = {
					producciones: dataSelected,
				};
				await cosechaService.del(data);
				setIsLoading(false);
				goPrevPage();
			});
		}
	};

	const validacion = (regularizacionForm, formDisabled) => {
		let result = true;
		setMessageError('');

		if (
			formDisabled.campo === false &&
			formDisabled.cuartel === false &&
			formDisabled.cuadrilla === false &&
			formDisabled.trato === false &&
			formDisabled.formatoCosecha === false &&
			formDisabled.trabajador === false &&
			formDisabled.calidad === false &&
			formDisabled.jefeCuadrilla === false &&
			formDisabled.contratista === false &&
			formDisabled.fechaCaptura === false
		) {
			setMessageError(i18next.t('debe seleccionar un dato que desea ingresar'));

			return false;
		}

		if (formDisabled.fechaCaptura === false) {
			if (
				regularizacionForm.fechaCaptura === undefined ||
				regularizacionForm.fechaCaptura === null
			) {
				result = false;
			}
		}
		if (formDisabled.campo === true) {
			if (
				regularizacionForm.codCampo === undefined ||
				regularizacionForm.codCampo === null
			) {
				result = false;
			}
		}
		if (formDisabled.cuartel === true) {
			if (
				regularizacionForm.codCuartel === undefined ||
				regularizacionForm.codCuartel === null
			) {
				result = false;
			}
		}
		if (formDisabled.cuadrilla === true) {
			if (
				regularizacionForm.codCuadrilla === undefined ||
				regularizacionForm.codCuadrilla === null
			) {
				result = false;
			}
		}
		if (formDisabled.trato === true) {
			if (
				regularizacionForm.trato === undefined ||
				regularizacionForm.trato === null
			) {
				result = false;
			}
		}

		if (formDisabled.formatoCosecha === true) {
			if (
				regularizacionForm.codFormatoCosecha === undefined ||
				regularizacionForm.codFormatoCosecha === null
			) {
				result = false;
			}
		}

		if (formDisabled.trabajador === true) {
			if (regularizacionForm.codTrabajador === undefined) {
				result = false;
			}
		}
		if (formDisabled.contratista === true) {
			if (regularizacionForm.codContratista === undefined) {
				result = false;
			}
		}
		if (formDisabled.calidad === true) {
			if (
				regularizacionForm.codCalidad === undefined ||
				regularizacionForm.codCalidad === null
			) {
				result = false;
			}
		}
		if (formDisabled.jefeCuadrilla === true) {
			if (
				regularizacionForm.codJefeCuadrilla === undefined ||
				regularizacionForm.codJefeCuadrilla === null
			) {
				result = false;
			}
		}

		if (formDisabled.sector === true) {
			if (
				regularizacionForm.codSector === undefined ||
				regularizacionForm.codSector === null
			) {
				result = false;
			}
		}

		if (formDisabled.variedad === true) {
			if (
				regularizacionForm.codVariedad === undefined ||
				regularizacionForm.codVariedad === null
			) {
				result = false;
			}
		}

		if (result === false) {
			setMessageError('debe seleccionar un dato que desea ingresar');
		}

		return result;
	};

	return {
		handleBack,
		selectedRowKeys,
		totalSeleccionados,
		onSelectionChangedData,
		changeButtonSave,
		buttonSave,
		regularizacionForm,
		setRegularizacionForm,
		handleSubmit,
		messageError,
		isLoading,
		isDelete,
		handleDelete,
		validacion,
		tratos,
		codCampo,
		isDisableForm,
		setIsDisableForm,
	};
};
