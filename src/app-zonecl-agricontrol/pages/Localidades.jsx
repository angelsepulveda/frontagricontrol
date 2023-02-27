import {
	Button,
	Column,
	Lookup,
	RequiredRule,
	StringLengthRule,
} from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import useLocalidades from '../hooks/useLocalidades';

const Localidades = () => {
	const [t] = useTranslation('global');

	const title = t('localidades.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { loadData, estados, comunas, localidadesStore } = useLocalidades();
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'localidades', url: '/localidades' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={localidadesStore}
				adding={true}
				updating={true}
				deleting={true}
				addButton={null}
				pageSize={10}
				columnCount={t('common.comuna')}
				fileNameReport={t('pages.localidades.dataGrid.excel')}
			>
				<Column dataField="codComuna" caption={t('common.comuna')}>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={comunas}
						displayExpr="comuna"
						valueExpr="codComuna"
					/>
				</Column>
				<Column dataField="localidad" caption={t('localidades.localidad')}>
					<RequiredRule message={t('validations.required')} />
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

export default Localidades;
