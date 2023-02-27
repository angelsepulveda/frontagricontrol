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
import useCalidades from '../hooks/useCalidades';

const Calidades = () => {
	const [t] = useTranslation('global');

	const title = t('calidades.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { loadData, estados, calidadesStore } = useCalidades();
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'calidades', url: '/calidades' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={calidadesStore}
				adding={false}
				updating={true}
				deleting={false}
				addButton={null}
				pageSize={10}
				columnCount={t('common.calidad')}
				fileNameReport={t('calidades.excel')}
			>
				<Column dataField="calidad" caption={t('common.calidad')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '30' })}
						max={30}
					/>
				</Column>

				<Column dataField="abreviacion" caption={t('calidades.abreviaciones')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '10' })}
						max={10}
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

export default Calidades;
