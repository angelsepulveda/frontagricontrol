import { Button, Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../../shared/helpers/headerTitle';
import useCuadrillas from '../../hooks/cuadrillas/useCuadrillas';

export const Cuadrillas = () => {
	const [t] = useTranslation('global');

	const title = t('cuadrillas.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		cuadrillasStore,
		loadData,
		estados,
		campos,
		buttonAddGrid,
		equipos,
		trabajadores,
		navigate,
	} = useCuadrillas();

	useEffect(() => {
		loadData();
	}, []);
	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'cuadrillas', url: '/cuadrillas' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={cuadrillasStore}
				addButton={buttonAddGrid}
				adding={false}
				updating={true}
				deleting={true}
				pageSize={10}
				columnCount={t('common.cuadrilla')}
				fileNameReport={t('cuadrillas.excel')}
			>
				<Column dataField="cuadrilla" caption={t('common.cuadrilla')} />
				<Column dataField="nemoTecnico" caption={t('common.nemoTecnico')} />
				<Column dataField="codCampo" caption={t('common.campo')}>
					<Lookup
						dataSource={campos}
						valueExpr="codCampo"
						displayExpr="campo"
					/>
				</Column>
				<Column
					dataField="codJefeCuadrilla"
					caption={t('cuadrillas.jefeCuadrilla')}
				>
					<Lookup
						dataSource={trabajadores}
						valueExpr="codTrabajador"
						displayExpr={(item) =>
							`${item.nombres} ${item.primerApellido} ${item.segundoApellido}`
						}
					/>
				</Column>
				<Column dataField="imeiEquipo" caption={t('common.equipo')}>
					<Lookup
						dataSource={equipos}
						valueExpr="macImei"
						displayExpr="descripcion"
					/>
				</Column>
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
						onClick={(e) =>
							navigate(`/cuadrillas/actualizar/${e.row.data.codCuadrilla}`)
						}
					/>
					<Button name="delete" />
				</Column>
			</DataGridCustom>
			{/* </Container> */}
		</>
	);
};
