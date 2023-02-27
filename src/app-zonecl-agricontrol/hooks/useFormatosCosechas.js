import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useTiposRecolcciones from '../../app-zonecl-comun/hooks/useTiposRecolecciones';
import useUnidadesMedidas from '../../app-zonecl-comun/hooks/useUnidadesMedidas';
import { fetchEstados } from '../../shared/store/slices/estados';
import formatocosechaService from '../services/formatos-cosechasService';
import useEspecies from './especies/useEspecies';
import useCalidades from './useCalidades';
import useCampos from './useCampos';

const useFormatosCosechas = () => {
	const { tiposRecolecciones, loadTiposRecolecciones } = useTiposRecolcciones();
	const { unidadesMedidas, loadUnidadesMedidas } = useUnidadesMedidas();
	const { especies, loadEspecies } = useEspecies();
	const { calidades, loadCalidades } = useCalidades();
	const [formatosCosechasStore, setFormatosCosechasStore] = useState([]);
	const [formatosCosechas, setFormatosCosechas] = useState([]);
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const { campos, loadCampos } = useCampos();

	const loadData = async () => {
		try {
			setFormatosCosechasStore(
				new CustomStore({
					key: 'codFormatoCosecha',
					load: () => loadDataGrid(),
					insert: (values) => formatocosechaService.insert(values),
					update: (key, values) => formatocosechaService.update(key, values),
					remove: (key) => formatocosechaService.del(key),
				}),
			);
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const loadDataGrid = async () => {
		const data = await formatocosechaService.findByFormatoCosechaCampos();
		await loadCalidades();
		await loadCampos();

		if (estados.length <= 0) dispatch(fetchEstados());

		await loadEspecies();
		await loadUnidadesMedidas();
		await loadTiposRecolecciones();
		return data;
	};
	const loadFormatosCosechas = async () => {
		setFormatosCosechas(await formatocosechaService.getAll());
	};

	const calculateFilterExpression = (
		filterValue,
		selectedFilterOperation,
		target,
	) => {
		if (target === 'search' && typeof filterValue === 'string') {
			return [this.dataField, 'contains', filterValue];
		}
		return function (data) {
			return (data.campo || []).indexOf(filterValue) !== -1;
		};
	};

	const cellTemplate = (container, options) => {
		const noBreakSpace = '\u00A0';
		const text = (options.value || [])
			.map((element) => options.column.lookup.calculateCellValue(element))
			.join(', ');
		container.textContent = text || noBreakSpace;
		container.title = text;
	};

	return {
		estados,
		formatosCosechasStore,
		tiposRecolecciones,
		calidades,
		especies,
		unidadesMedidas,
		formatosCosechas,
		loadFormatosCosechas,
		loadData,
		calculateFilterExpression,
		cellTemplate,
		campos,
	};
};
export default useFormatosCosechas;
