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
import { useDispatch, useSelector } from 'react-redux';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import { fetchEstados } from '../../shared/store/slices/estados';
import useCampos from '../hooks/useCampos';

const Campos = () => {
	const dispatch = useDispatch();
	const { list: estados } = useSelector((state) => state.estados);
	const [t] = useTranslation('global');

	const title = t('campos.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { loadData, empresas, camposStore, buttonAdd } = useCampos();
	useEffect(() => {
		if (estados.length <= 9) dispatch(fetchEstados());

		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'campos', url: '/campos' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={camposStore}
				adding={buttonAdd}
				updating={true}
				deleting={true}
				addButton={null}
				pageSize={10}
				columnCount={t('common.nemoTecnico')}
				fileNameReport={t('campos.excel')}
			>
				<Column
					dataField="nemoTecnico"
					caption={t('common.nemoTecnico')}
					width={150}
				>
					<StringLengthRule
						message={t('validations.maxLength', { max: '20' })}
						max={20}
					/>
				</Column>

				<Column dataField="nombreCorto" caption={t('common.nombreCorto')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '5' })}
						max={5}
					/>
				</Column>

				<Column dataField="campo" caption={t('common.campo')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '30' })}
						max={30}
					/>
				</Column>

				<Column
					dataField="latitud"
					caption={t('campos.latitud')}
					dataType="number"
				>
					<NumericRule message={t('validations.decimal')} />
				</Column>

				<Column
					dataField="longitud"
					caption={t('campos.longitud')}
					dataType="number"
				>
					<NumericRule message={t('validations.decimal')} />
				</Column>

				<Column dataField="codEmpresa" caption={t('campos.empresa')}>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={empresas}
						valueExpr="codEmpresa"
						displayExpr="razonSocial"
					/>
				</Column>

				<Column
					dataField="nombreCortoPoligono"
					caption={t('campos.nombreCortoPoligono')}
					width={200}
				>
					<StringLengthRule
						message={t('validations.maxLength', { max: '5' })}
						max={5}
					/>
				</Column>

				<Column
					dataField="nombrePoligono"
					caption={t('campos.nombrePoligono')}
					width={200}
				>
					<StringLengthRule
						message={t('validations.maxLength', { max: '50' })}
						max={50}
					/>
				</Column>

				<Column dataField="codEstado" caption={t('common.estado')}>
					<RequiredRule message={t('validations.required')} />
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
export default Campos;
