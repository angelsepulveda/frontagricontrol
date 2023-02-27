import { Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import CreateRegiones from '../components/regiones/CreateRegiones';
import useRegiones from '../hooks/regiones/useRegiones';

const Regiones = () => {
	const [t] = useTranslation('global');

	const title = t('regiones.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		loadData,
		regionesStore,
		handleClose,
		buttonAddGrid,
		open,
		paises,
		estados,
	} = useRegiones();
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'regiones', url: '/regiones' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={regionesStore}
				deleting={true}
				addButton={buttonAddGrid}
				pageSize={10}
				columnCount={t('common.region')}
				fileNameReport={t('regiones.excel')}
			>
				<Column dataField="region" caption={t('common.region')} />

				<Column dataField="nemoTecnico" caption={t('common.nemoTecnico')} />

				<Column dataField="codPais" caption={t('common.pais')}>
					<Lookup dataSource={paises} valueExpr="codPais" displayExpr="pais" />
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
			<CreateRegiones
				open={open}
				closeHandle={handleClose}
				loadData={loadData}
			/>
		</>
	);
};

export default Regiones;
