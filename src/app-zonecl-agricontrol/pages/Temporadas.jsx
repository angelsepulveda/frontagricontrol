import { LoadPanel } from 'devextreme-react';
import { Button, Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../shared/components/controls';
import IconBreadcrumbs from '../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../shared/helpers/headerTitle';
import FormTemporadas from '../components/temporadas/FormTemporadas';
import useTemporadas from '../hooks/temporadas/useTemporadas';

const Temporadas = () => {
	const [t] = useTranslation('global');

	const title = t('temporadas.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		loadData,
		estados,
		especies,
		temporadasStore,
		buttonAddGrid,
		open,
		handleClose,
		temporada,
		loading,
		handleUpdate,
		setTemporada,
		setFormModal,
	} = useTemporadas();

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'temporadas', url: '/temporadas' }]} />
			{/* <Container> */}
			<LoadPanel
				shadingColor="rgba(0,0,0,0.4)"
				visible={loading}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			<DataGridCustom
				dataStore={temporadasStore}
				updating={true}
				deleting={true}
				addButton={buttonAddGrid}
				pageSize={10}
				columnCount={t('temporadas.inicio')}
				fileNameReport={t('temporadas.excel')}
			>
				<Column
					dataField="inicio"
					caption={t('temporadas.inicio')}
					dataType={'date'}
				/>

				<Column
					dataField="termino"
					caption={t('temporadas.termino')}
					dataType={'date'}
				/>

				<Column dataField="codEspecie" caption={t('common.especie')}>
					<Lookup
						dataSource={especies}
						valueExpr="codEspecie"
						displayExpr="especie"
					/>
				</Column>

				<Column dataField="temporada" caption={t('temporadas.temporada')} />

				<Column dataField="codEstado" caption={t('common.estado')}>
					<Lookup
						dataSource={estados}
						valueExpr="codEstado"
						displayExpr="estado"
					/>
				</Column>

				<Column type="buttons" width={110}>
					<Button
						name="edit"
						onClick={(e) => handleUpdate(e.row.data.codTemporada.toString())}
					/>
					<Button name="delete" />
				</Column>
			</DataGridCustom>
			{/* </Container> */}

			<FormTemporadas
				open={open}
				closeHandle={handleClose}
				temporada={temporada}
				setTemporada={setTemporada}
				setFormModal={setFormModal}
				loadData={loadData}
			/>
		</>
	);
};

export default Temporadas;
