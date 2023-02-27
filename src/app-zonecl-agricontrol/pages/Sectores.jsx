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
import useSectores from '../hooks/useSectores';

const Sectores = () => {
	const [t] = useTranslation('global');

	const title = t('sectores.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { estados, sectoresStore, loadData, campos } = useSectores();

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'sectores', url: '/sectores' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={sectoresStore}
				adding={true}
				updating={true}
				deleting={true}
				addButton={null}
				pageSize={10}
				columnCount={t('common.campo')}
				fileNameReport={t('sectores.excel')}
			>
				<Column dataField="codCampo" caption={t('common.campo')}>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={campos}
						valueExpr="codCampo"
						displayExpr="campo"
					/>
				</Column>
				<Column dataField="sector" caption={t('common.sector')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '50' })}
						max={50}
					/>
				</Column>
				<Column dataField="nemoTecnico" caption={t('common.nemoTecnico')}>
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
				<Column
					dataField="nombrePoligono"
					caption={t('sectores.nombrePoligono')}
				>
					<StringLengthRule
						message={t('validations.maxLength', { max: '50' })}
						max={50}
					/>
				</Column>
				<Column
					dataField="nombreCortoPoligono"
					caption={t('sectores.nombreCortoPoligono')}
				>
					<StringLengthRule
						message={t('validations.maxLength', { max: '5' })}
						max={5}
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

export default Sectores;
