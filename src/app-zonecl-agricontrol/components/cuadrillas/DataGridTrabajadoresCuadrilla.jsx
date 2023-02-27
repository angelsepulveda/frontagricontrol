import { DataGrid } from 'devextreme-react';
import {
	Column,
	ColumnChooser,
	FilterRow,
	HeaderFilter,
	LoadPanel,
	Lookup,
	Pager,
	Paging,
	Scrolling,
	SearchPanel,
	Selection,
	Sorting,
	Summary,
	TotalItem,
} from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const DataGridTrabajadoresCuadrilla = (props) => {
	const [t] = useTranslation('global');
	const {
		handleOpen,
		trabajadores,
		loadDataTrabajadoresCuadrillas,
		trabajadoresCuadrillasStore,
		estados,
	} = props;

	useEffect(() => {
		loadDataTrabajadoresCuadrillas(trabajadores);
	}, []);

	return (
		<>
			{/* <Container> */}
			<DataGrid
				id="grid"
				dataSource={trabajadoresCuadrillasStore}
				repaintChangesOnly={true}
				showRowLines={true}
				showBorders={true}
				rowAlternationEnabled={true}
				onToolbarPreparing={(e) => {
					e.toolbarOptions.items.unshift(
						{
							location: 'before',
							widget: 'dxButton',
							options: {
								type: 'default',
								stylingMode: 'contained',
								icon: 'refresh',
								onClick: () => {
									e.component.refresh();
								},
							},
						},
						{
							location: 'after',
							widget: 'dxButton',
							options: {
								icon: 'add',
								onClick: () => {
									handleOpen();
								},
							},
						},
					);
				}}
			>
				<ColumnChooser enabled={true} />
				<LoadPanel enabled={true} />
				<Selection mode="single" />
				<Sorting mode="multiple" />
				<FilterRow visible={true} applyFilter={'auto'} />
				<HeaderFilter visible={true} />
				<SearchPanel visible={true} width={240} placeholder={t('common.search')} />
				<Column dataField="nombres" caption={t('common.nombres')} />
				<Column dataField="primerApellido" caption={t('common.primerApellido')} />
				<Column dataField="segundoApellido" caption={t('common.segundoApellido')} />
				<Column dataField="codTrabajador" caption={t('common.dni')} />

				<Column dataField="codEstado" caption={t('common.estado')}>
					<Lookup
						dataSource={estados}
						valueExpr="codEstado"
						displayExpr="estado"
					/>
				</Column>
				<Summary>
					<TotalItem column={t('common.nombres')} summaryType="count" />
				</Summary>
				<Scrolling rowRenderingMode="virtual"></Scrolling>
				<Paging defaultPageSize={10} />
				<Pager
					visible={true}
					displayMode={'full'}
					showInfo={true}
					showNavigationButtons={true}
				/>
			</DataGrid>
			{/* </Container> */}
		</>
	);
};

export default DataGridTrabajadoresCuadrilla;
