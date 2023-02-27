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
import useContratistas from '../hooks/useContratistas';

const Contratistas = () => {
	const [t] = useTranslation('global');

	const title = t('contratistas.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { loadData, estados, contratistasStore } = useContratistas();
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'contratistas', url: '/contratista' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={contratistasStore}
				adding={true}
				updating={true}
				deleting={true}
				addButton={null}
				pageSize={10}
				columnCount={t('common.nombre')}
				fileNameReport={t('contratistas.excel')}
			>
				<Column dataField="nombre" caption={t('common.nombre')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '50' })}
						max={50}
					/>
				</Column>

				<Column dataField="dni" caption={t('common.dni')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '20' })}
						max={20}
					/>
				</Column>

				<Column dataField="giro" caption={t('common.giro')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '50' })}
						max={50}
					/>
				</Column>

				<Column dataField="email" caption={t('common.email')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '20' })}
						max={25}
					/>
				</Column>

				<Column
					dataField="celular"
					caption={t('common.celular')}
					dataType="number"
				>
					<NumericRule message={t('validations.telefono')} />
				</Column>

				<Column dataField="fono" caption={t('common.fono')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '15' })}
						max={15}
					/>
				</Column>
				<Column dataField="web" caption={t('contratistas.web')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '30' })}
						max={30}
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
export default Contratistas;
