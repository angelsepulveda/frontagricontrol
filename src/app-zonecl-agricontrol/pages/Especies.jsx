import { Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle.js';
import CreateEspecies from '../components/especies/CreateEspecies';
import useEspecies from '../hooks/especies/useEspecies';

const Especies = () => {
	const [t] = useTranslation('global');

	const title = t('especies.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { especiesStore, estados, handleClose, loadData, open, buttonAddGrid } =
		useEspecies();

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'especies', url: '/especies' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={especiesStore}
				addButton={buttonAddGrid}
				updating={false}
				deleting={true}
				pageSize={10}
				columnCount={t('common.especie')}
				fileNameReport={t('especies.excel')}
			>
				<Column dataField="especie" caption={t('common.especie')} />

				<Column dataField="nemoTecnico" caption={t('common.nemoTecnico')} />

				<Column dataField="codEstado" caption={t('common.estado')}>
					<Lookup
						dataSource={estados}
						valueExpr="codEstado"
						displayExpr="estado"
					/>
				</Column>
			</DataGridCustom>
			{/* </Container> */}
			<CreateEspecies
				open={open}
				closeHandle={handleClose}
				loadData={loadData}
			/>
		</>
	);
};

export default Especies;
