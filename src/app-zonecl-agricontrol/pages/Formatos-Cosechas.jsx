import { TagBox } from 'devextreme-react';
import {
	Button,
	Column,
	Lookup,
	NumericRule,
	RequiredRule,
	StringLengthRule,
} from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import useFormatosCosechas from '../hooks/useFormatosCosechas';

const FormatosCosechas = () => {
	const [t] = useTranslation('global');

	const title = t('formatosCosechas.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		loadData,
		estados,
		tiposRecolecciones,
		unidadesMedidas,
		especies,
		calidades,
		formatosCosechasStore,
		calculateFilterExpression,
		cellTemplate,
		campos,
	} = useFormatosCosechas();
	useEffect(() => {
		loadData();
	}, []);

	const CamposTaxBoxComponent = (props) => {
		const onValueChanged = (e) => {
			props.data.setValue(e.value);
		};

		const onSelectionChanged = () => {
			props.data.component.updateDimensions();
		};

		return (
			<TagBox
				dataSource={props.data.column.lookup.dataSource}
				defaultValue={props.data.value}
				valueExpr="codCampo"
				displayExpr="campo"
				showSelectionControls={true}
				maxDisplayedTags={3}
				showMultiTagOnly={false}
				applyValueMode="useButtons"
				searchEnabled={true}
				onValueChanged={onValueChanged}
				onSelectionChanged={onSelectionChanged}
			/>
		);
	};

	return (
		<>
			<IconBreadcrumbs
				urls={[{ name: 'formatos cosechas', url: '/formatos-cosechas' }]}
			/>
			{/* <Container> */}
			<DataGridCustom
				dataStore={formatosCosechasStore}
				adding={true}
				updating={true}
				deleting={true}
				addButton={null}
				pageSize={10}
				columnCount={t('formatosCosechas.descripcion')}
				fileNameReport={'formatosCosechas.excel'}
			>
				<Column
					dataField="descripcion"
					caption={t('formatosCosechas.descripcion')}
					dataType="string"
					width={140}
				>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '50' })}
						max={50}
					/>
				</Column>

				<Column
					dataField="pesoMinimo"
					caption={t('formatosCosechas.pesoMinimo')}
					dataType="number"
					width={120}
				>
					<NumericRule message={t('validations.decimal')} />
				</Column>

				<Column
					dataField="pesoMaximo"
					caption={t('formatosCosechas.pesoMaximo')}
					dataType="number"
					width={120}
				>
					<NumericRule message={t('validations.decimal')} />
				</Column>
				<Column
					dataField="validarPeso"
					caption="Validar Peso "
					dataType="boolean"
					width={130}
					defaultValue={true}
				/>

				<Column
					dataField="codTipoRecoleccion"
					caption={t('formatosCosechas.tipoRecoleccion')}
					width={140}
				>
					<Lookup
						dataSource={tiposRecolecciones}
						valueExpr="codTipoRecoleccion"
						displayExpr="tipoRecoleccion"
					/>
				</Column>
				<Column
					dataField="codUnidadMedida"
					caption={t('formatosCosechas.unidadMedidas')}
					width={130}
				>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={unidadesMedidas}
						valueExpr="codUnidadMedida"
						displayExpr="unidadMedida"
					/>
				</Column>

				<Column
					dataField="valorPromedio"
					caption={t('formatosCosechas.valorPromedio')}
					width={130}
					dataType="number"
				>
					<RequiredRule message={t('validations.required')} />
					<NumericRule message={t('validations.decimal')} />
				</Column>

				<Column
					dataField="unidadesAPesar"
					caption={t('formatosCosechas.unidadPesar')}
					width={150}
					dataType="number"
				>
					<RequiredRule message={t('validations.required')} />
					<NumericRule message={t('validations.decimal')} />
				</Column>

				<Column
					dataField="codEspecie"
					caption={t('common.especie')}
					width={110}
				>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={especies}
						valueExpr="codEspecie"
						displayExpr="especie"
					/>
				</Column>

				<Column
					dataField="codCalidad"
					caption={t('common.calidad')}
					width={120}
				>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={calidades}
						valueExpr="codCalidad"
						displayExpr="calidad"
					/>
				</Column>

				<Column
					dataField="campos"
					caption={t('common.campos')}
					editCellComponent={CamposTaxBoxComponent}
					calculateFilterExpression={calculateFilterExpression}
					cellTemplate={cellTemplate}
				>
					<Lookup
						dataSource={campos}
						displayExpr="campo"
						valueExpr="codCampo"
					/>
				</Column>

				<Column dataField="codEstado" caption={t('common.estado')} width={90}>
					<Lookup
						dataSource={estados}
						valueExpr="codEstado"
						displayExpr="estado"
					/>
				</Column>
				<Column type="buttons" width={110}>
					<Button name="edit" />
					<Button name="delete" />
				</Column>
			</DataGridCustom>
			{/* </Container> */}
		</>
	);
};

export default FormatosCosechas;
