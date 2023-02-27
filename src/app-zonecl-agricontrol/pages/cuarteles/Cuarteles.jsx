import { Button, Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../../shared/helpers/headerTitle';
import useCuarteles from '../../hooks/cuarteles/useCuarteles';

export const Cuarteles = () => {
	const [t] = useTranslation('global');

	const title = t('cuarteles.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		cuartelesStore,
		buttonAddGrid,
		loadData,
		sectores,
		campos,
		estados,
		navigate,
	} = useCuarteles();

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'cuarteles', url: '/cuarteles' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={cuartelesStore}
				addButton={buttonAddGrid}
				adding={false}
				updating={true}
				deleting={true}
				pageSize={10}
				columnCount={t('common.cuartel')}
				fileNameReport={t('cuarteles.excel')}
			>
				<Column dataField="cuartel" caption={t('common.cuartel')} />
				<Column dataField="codSector" caption={t('common.sector')}>
					<Lookup
						dataSource={sectores}
						valueExpr="codSector"
						displayExpr="sector"
					/>
				</Column>
				<Column dataField="codCampo" caption={t('common.campo')}>
					<Lookup
						dataSource={campos}
						valueExpr="codCampo"
						displayExpr="campo"
					/>
				</Column>
				<Column dataField="nemoTecnico" caption={t('common.nemoTecnico')} />
				<Column dataField="nombreCorto" caption={t('common.nombreCorto')} />
				<Column dataField="superficie" caption={t('common.superficie')} />
				<Column
					dataField="anioPlantacion"
					caption={t('common.anioPlantacion')}
				/>
				<Column
					dataField="productivo"
					caption={t('cuarteles.productivo')}
					dataType="boolean"
					defaultValue={1}
				></Column>
				<Column
					dataField="organico"
					caption={t('cuarteles.organico')}
					dataType="boolean"
					defaultValue={1}
				></Column>
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
						onClick={(e) => navigate(`actualizar/${e.row.data.codCuartel}`)}
					/>
					<Button name="delete" />
				</Column>
			</DataGridCustom>
			{/* </Container> */}
		</>
	);
};
