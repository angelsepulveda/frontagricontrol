import { Button, Grid, Typography } from '@mui/material';
import { DataGrid } from 'devextreme-react';
import {
	Column,
	ColumnChooser,
	FilterRow,
	HeaderFilter,
	LoadPanel,
	Pager,
	Paging,
	Scrolling,
	SearchPanel,
	Selection,
	Sorting,
	Summary,
	TotalItem,
} from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next';

const DataGridProduccion = (props) => {
	const {
		data,
		onSelectionChangedData,
		selectedRowKeys,
		totalSeleccionados,
		isDelete,
		handleDelete,
	} = props;

	const [t] = useTranslation('global');

	return (
		<Grid container spacing={2} item sx={{ maxWidth: '1400px' }}>
			<Grid item xs={12} md={12}>
				{isDelete ? (
					<Button
						variant="contained"
						type="button"
						color="error"
						onClick={handleDelete}
					>
						{t('common.eliminar')}
					</Button>
				) : null}
			</Grid>
			<Grid item xs={12} md={12}>
				<DataGrid
					id="grid"
					dataSource={data}
					repaintChangesOnly={true}
					showRowLines={true}
					columnAutoWidth={true}
					showBorders={true}
					rowAlternationEnabled={true}
					onSelectionChanged={onSelectionChangedData}
					selectedRowKeys={selectedRowKeys}
					onToolbarPreparing={(e) => {
						e.toolbarOptions.items.unshift({
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
						});
					}}
				>
					<ColumnChooser enabled={true} />
					<LoadPanel enabled={true} />
					<Selection mode="multiple" />
					<Sorting mode="multiple" />
					<FilterRow visible={true} applyFilter={'auto'} />
					<HeaderFilter visible={true} />
					<SearchPanel
						visible={true}
						width={240}
						placeholder={t('common.search')}
					/>
					<Column
						dataField="fechaCaptura"
						caption={t('common.fecha')}
						width={150}
					/>
					<Column dataField="campo" caption={t('common.campo')} width={100} />
					<Column dataField="sector" caption={t('common.sector')} width={100} />
					<Column
						dataField="cuartel"
						caption={t('common.cuartel')}
						width={100}
					/>
					<Column
						dataField="especie"
						caption={t('common.especie')}
						width={100}
					/>
					<Column
						dataField="variedad"
						caption={t('common.variedad')}
						width={100}
					/>
					<Column
						dataField="nombreContratista"
						caption={t('common.contratista')}
					/>
					<Column dataField="dni" caption="DNI" width={100} />
					<Column
						dataField="empleado"
						caption={t('common.empleado')}
						width={150}
					/>
					<Column
						dataField="cuadrilla"
						caption={t('common.cuadrilla')}
						width={100}
					/>
					<Column
						dataField="jefeCuadrilla"
						caption={t('cuadrillas.jefeCuadrilla')}
						width={200}
					></Column>
					<Column
						dataField="bandeja"
						caption={t('common.formato')}
						width={100}
					/>
					<Column
						dataField="unidadesAPesar"
						caption={t('common.numeroBandejas')}
						width={150}
					/>
					<Column dataField="kilos" caption={t('common.kilos')} width={100} />
					<Column dataField="trato" caption={t('tratos.trato')} width={100} />
					<Summary>
						<TotalItem column="fecha" summaryType="count" />
						<TotalItem column="kilos" summaryType="sum" />
					</Summary>
					<Scrolling rowRenderingMode="virtual"></Scrolling>
					<Paging enabled={true} defaultPageSize={5} />
					<Pager
						visible={true}
						displayMode={'full'}
						showInfo={true}
						showNavigationButtons={true}
					/>
				</DataGrid>
			</Grid>
			<Grid
				item
				xs={12}
				md={12}
				sx={{
					paddingTop: 0,
					margin: 0,
				}}
			>
				<Typography
					id="transition-modal-title"
					variant="h6"
					component="h6"
					sx={{ padding: 0, marginTop: '0px', alignContent: 'center' }}
				>
					{t('common.totalRegistrosSeleccionados')} {totalSeleccionados}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default DataGridProduccion;
