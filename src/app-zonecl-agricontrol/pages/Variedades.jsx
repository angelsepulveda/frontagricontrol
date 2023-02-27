import { Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import CreateVariedades from '../components/variedades/CreateVariedades';
import useVariedades from '../hooks/variedades/useVariedades';

const Variedades = () => {
	const [t] = useTranslation('global');

	const title = t('variedades.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		loadData,
		variedadesStore,
		handleClose,
		open,
		estados,
		especies,
		buttonAddGrid,
	} = useVariedades();
	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'variedades', url: '/variedades' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={variedadesStore}
				addButton={buttonAddGrid}
				updating={false}
				deleting={true}
				pageSize={10}
				columnCount={t('common.variedad')}
				fileNameReport={t('variedades.excel')}
			>
				<Column dataField="variedad" caption={t('common.variedad')} />

				<Column dataField="nombreCorto" caption={t('common.nombreCorto')} />
				<Column dataField="nemoTecnico" caption={t('common.nemoTecnico')} />

				<Column dataField="codEspecie" caption={t('common.especie')}>
					<Lookup
						dataSource={especies}
						valueExpr="codEspecie"
						displayExpr="especie"
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
			<CreateVariedades
				open={open}
				closeHandle={handleClose}
				loadData={loadData}
			/>
		</>
	);
};

export default Variedades;
