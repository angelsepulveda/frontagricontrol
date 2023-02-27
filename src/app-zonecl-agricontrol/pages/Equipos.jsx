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
import useEquipos from '../hooks/useEquipos';

const Equipos = () => {
	const [t] = useTranslation('global');

	const title = t('equipos.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { loadData, estados, tiposEquipos, equiposStore } = useEquipos();
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'equipos', url: '/equipos' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={equiposStore}
				adding={true}
				updating={true}
				deleting={true}
				addButton={null}
				pageSize={10}
				columnCount={t('equipos.macImei')}
				fileNameReport={t('equipos.excel')}
			>
				<Column dataField="macImei" caption={t('equipos.macImei')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '100' })}
						max={100}
					/>
				</Column>

				<Column dataField="alias" caption={t('equipos.alias')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '50' })}
						max={50}
					/>
				</Column>

				<Column dataField="descripcion" caption={t('equipos.descripcion')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '100' })}
						max={100}
					/>
				</Column>

				<Column dataField="codTipoEquipo" caption={t('equipos.tipoEquipo')}>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={tiposEquipos}
						valueExpr="codTipoEquipo"
						displayExpr="tipoEquipo"
					/>
				</Column>

				<Column
					dataField="ultimaSincronizacion"
					caption={t('equipos.ultimaSincronizacion')}
					dataType={'datetime'}
					allowEditing={false}
				/>

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

export default Equipos;
