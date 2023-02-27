import { Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import CreatePaises from '../components/paises/CreatePaises';
import usePaises from '../hooks/paises/usePaises';

const Paises = () => {
	const [t] = useTranslation('global');

	const title = t('paises.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { estados, paisesStore, buttonAddGrid, handleClose, loadData, open } =
		usePaises();

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'paises', url: '/paises' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={paisesStore}
				deleting={true}
				addButton={buttonAddGrid}
				pageSize={10}
				columnCount={t('common.pais')}
				fileNameReport={t('paises.excel')}
			>
				<Column dataField="pais" caption={t('common.pais')} />

				<Column dataField="gentilicio" caption={t('paises.gentilicio')} />

				<Column dataField="codEstado" caption={t('common.estado')}>
					<Lookup
						dataSource={estados}
						valueExpr="codEstado"
						displayExpr="estado"
					/>
				</Column>
			</DataGridCustom>
			{/* </Container> */}
			<CreatePaises open={open} closeHandle={handleClose} loadData={loadData} />
		</>
	);
};

export default Paises;
