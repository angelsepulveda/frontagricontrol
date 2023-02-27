import { Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import CreateComunas from '../components/comunas/CreateComunas';
import useComunas from '../hooks/useComunas';

const Comunas = () => {
	const [t] = useTranslation('global');

	const title = t('comunas.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		loadData,
		comunasStore,
		handleClose,
		buttonAddGrid,
		open,
		estados,
		regiones,
	} = useComunas();
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'comunas', url: '/comunas' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={comunasStore}
				deleting={true}
				addButton={buttonAddGrid}
				pageSize={10}
				columnCount={t('common.comuna')}
				fileNameReport={t('comunas.excel')}
			>
				<Column dataField="comuna" caption={t('common.comuna')} />

				<Column dataField="nemoTecnico" caption={t('common.nemoTecnico')} />

				<Column dataField="codRegion" caption={t('common.region')}>
					<Lookup
						dataSource={regiones}
						valueExpr="codRegion"
						displayExpr="region"
					/>
				</Column>

				<Column dataField="codEstado" caption={t('common.estado')}>
					<Lookup
						dataSource={estados}
						valueExpr="codEstado"
						displayExpr="estado"
					/>
				</Column>
			</DataGridCustom>
			{/* </Container> */}
			<CreateComunas
				open={open}
				closeHandle={handleClose}
				loadData={loadData}
			/>
		</>
	);
};

export default Comunas;
