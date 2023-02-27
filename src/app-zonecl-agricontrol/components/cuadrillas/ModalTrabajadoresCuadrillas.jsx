import { LoadingButton } from '@mui/lab';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
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
import { useTranslation } from 'react-i18next';

import styleModalTrabajadoresCuadrillas from '../../helpers/cuadrillas/styleModalTrabajadoresCuadrillas';
import useModalTrabajadoresCuadrillas from '../../hooks/cuadrillas/useModalTrabajadoresCuadrillas';

const ModalTrabajadoresCuadrillas = (props) => {
	const [t] = useTranslation('global');
	const {
		open,
		handleClose,
		loadDataTrabajadoresCuadrillas,
		selectedTrabajadores,
		loadTrabajadoresCuadrillas,
		trabajadoresCuadrillas,
	} = props;

	const {
		trabajadoresCuadrillasStore,
		estados,
		selectedRowKeys,
		onSelectionChangedData,
		onSubmitModal,
		totalSeleccionados,
	} = useModalTrabajadoresCuadrillas(
		loadTrabajadoresCuadrillas,
		loadDataTrabajadoresCuadrillas,
		handleClose,
		selectedTrabajadores,
		trabajadoresCuadrillas,
	);

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
			>
				<Fade in={open}>
					<Card sx={styleModalTrabajadoresCuadrillas}>
						<Grid
							container
							spacing={2}
							sx={{ borderBottom: '1px solid #e9ecef' }}
						>
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
									component="h3"
									sx={{ padding: 0, marginTop: '15px', alignContent: 'center' }}
								>
									{ t('common.seleccionarTrabajadores') }
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={2} sx={{ padding: '30px 5px' }}>
							<Grid
								item
								xs={12}
								md={12}
								sx={{
									paddingTop: 0,
									margin: 0,
								}}
							>
								<DataGrid
									id="grid"
									dataSource={trabajadoresCuadrillasStore}
									repaintChangesOnly={true}
									showRowLines={true}
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
									<Column dataField="nombres" caption={t('common.nombres')} />
									<Column
										dataField="primerApellido"
										caption={t('common.primerApellido')}
									/>
									<Column
										dataField="segundoApellido"
										caption={t('common.segundoApellido')}
									/>
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
									sx={{ padding: 0, marginTop: '15px', alignContent: 'center' }}
								>
									Total de Trabajadores Seleccionados: {totalSeleccionados}
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
							sx={{
								borderTop: '1px solid #e0e0e0',
							}}
						>
							<Grid
								item
								xs={12}
								md={12}
								sm={12}
								lg={6}
								sx={{ padding: 0, marginTop: '20px' }}
							>
								<LoadingButton
									fullWidth
									variant="contained"
									color="primary"
									onClick={() => onSubmitModal()}
								>
									Guardar
								</LoadingButton>
							</Grid>
							<Grid
								item
								xs={12}
								md={12}
								sm={12}
								lg={6}
								sx={{ padding: 0, marginTop: '20px' }}
							>
								<Button
									fullWidth
									onClick={() => handleClose()}
									variant="contained"
									color="error"
								>
									Cancelar
								</Button>
							</Grid>
						</Grid>
					</Card>
				</Fade>
			</Modal>
		</div>
	);
};

export default ModalTrabajadoresCuadrillas;
