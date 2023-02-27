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
import useTratos from '../hooks/useTratos';

const Tratos = () => {
	const [t] = useTranslation('global');

	const title = t('tratos.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { loadData, estados, campos, formatosCosechas, tratosStore } =
		useTratos();
	console.log(formatosCosechas);
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'tratos', url: '/tratos' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={tratosStore}
				adding={true}
				updating={true}
				deleting={true}
				addButton={null}
				pageSize={10}
				columnCount={t('common.campo')}
				fileNameReport={t('tratos.excel')}
			>
				<Column dataField="codCampo" caption={t('common.campo')}>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={campos}
						valueExpr="codCampo"
						displayExpr="campo"
					/>
				</Column>

				<Column
					dataField="codFormatoCosecha"
					caption={t('common.formatoCosecha')}
				>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={formatosCosechas}
						valueExpr="codFormatoCosecha"
						displayExpr="descripcion"
					/>
				</Column>
				<Column dataField="trato" caption={t('tratos.trato')}>
					<RequiredRule message={t('validations.required')} />
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

export default Tratos;
