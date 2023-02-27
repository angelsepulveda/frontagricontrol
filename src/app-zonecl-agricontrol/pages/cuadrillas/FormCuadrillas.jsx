import { Grid, Typography } from '@mui/material';
import { Button, ValidationSummary } from 'devextreme-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
	InputComponent,
	SelectComponent,
} from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import DataGridTrabajadoresCuadrilla from '../../components/cuadrillas/DataGridTrabajadoresCuadrilla';
import ModalTrabajadoresCuadrillas from '../../components/cuadrillas/ModalTrabajadoresCuadrillas';
import SkeletonFormCuadrillas from '../../components/cuadrillas/SkeletonFormCuadrillas';
import useFormCuadrillas from '../../hooks/cuadrillas/useFormCuadrillas';

export const FormCuadrillas = () => {
	const { id } = useParams();
	const [t] = useTranslation('global');
	const {
		formCuadrilla,
		loading,
		handleChangeCuadrilla,
		trabajadoresCuadrillas,
		handleChangeCampo,
		campos,
		estados,
		handleChangeEstado,
		trabajadores,
		handleChangeTrabajador,
		handleChangeEquipo,
		equipos,
		open,
		handleClose,
		handleOpen,
		handleSave,
		loadDataTrabajadoresCuadrillas,
		trabajadoresCuadrillasStore,
		selectedTrabajadores,
		loadSelectedTrabajadores,
		loadTrabajadoresCuadrillas,
		navigate,
		url,
	} = useFormCuadrillas(id);

	if (loading) {
		return <SkeletonFormCuadrillas />;
	} else {
		return (
			<>
				<IconBreadcrumbs urls={url} />
				<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
					<Grid
						xs={12}
						item={true}
						sx={{ paddingBottom: 4, borderBottom: '1px solid #e9ecef' }}
					>
						<Typography variant="h3">{t('cuadrillas.formulario')}</Typography>
					</Grid>
					<Grid xs={12} item={true} sx={{ minHeight: 500 }}>
						<form action="" onSubmit={handleSave}>
							<Grid spacing={2} container sx={{ padding: 2 }}>
								<Grid xs={12} item={true}>
									<Typography variant="h4">
										{t('cuadrillas.datosGenerales')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={4} item={true}>
									<InputComponent
										value={formCuadrilla.cuadrilla}
										name={'cuadrilla'}
										label={t('common.cuadrilla')}
										handleChangeEvent={handleChangeCuadrilla}
										required={true}
										maxLength={20}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={4} item={true}>
									<InputComponent
										value={formCuadrilla.nemoTecnico}
										name={'nemoTecnico'}
										label={t('common.nemoTecnico')}
										handleChangeEvent={handleChangeCuadrilla}
										required={false}
										maxLength={20}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={4} item={true}>
									<SelectComponent
										dataSource={campos}
										style={{ padding: '5px' }}
										displayExpr={'campo'}
										valueExpr={'codCampo'}
										label={t('common.campo')}
										value={formCuadrilla.codCampo}
										valueChangedEvent={handleChangeCampo}
										required={true}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={4} item={true}>
									<SelectComponent
										dataSource={trabajadores}
										style={{ padding: '5px' }}
										displayExpr={'nombreCompleto'}
										valueExpr={'codTrabajador'}
										label={t('cuadrillas.jefeCuadrilla')}
										value={formCuadrilla.codJefeCuadrilla}
										valueChangedEvent={handleChangeTrabajador}
										required={true}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={4} item={true}>
									<SelectComponent
										dataSource={equipos}
										style={{ padding: '5px' }}
										displayExpr={'equipo'}
										valueExpr={'macImei'}
										label={t('cuadrillas.equipoJefeCuadrilla')}
										value={formCuadrilla.imeiEquipo}
										valueChangedEvent={handleChangeEquipo}
										required={false}
									/>
								</Grid>
								<Grid xs={12} md={12} sm={12} lg={4} item={true}>
									<SelectComponent
										dataSource={estados}
										style={{ padding: '5px' }}
										displayExpr={'estado'}
										valueExpr={'codEstado'}
										label={t('common.estado')}
										value={formCuadrilla.codEstado}
										valueChangedEvent={handleChangeEstado}
										required={true}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ padding: 2 }}>
								<Grid xs={12} item={true}>
									<Typography variant="h4">Listado de Trabajadores</Typography>
								</Grid>
								<Grid xs={12} item={true}>
									<DataGridTrabajadoresCuadrilla
										handleOpen={handleOpen}
										loadDataTrabajadoresCuadrillas={
											loadDataTrabajadoresCuadrillas
										}
										trabajadores={trabajadoresCuadrillas}
										trabajadoresCuadrillasStore={trabajadoresCuadrillasStore}
										estados={estados}
									/>
								</Grid>
							</Grid>
							<Grid
								spacing={2}
								container
								sx={{
									paddingLeft: 2,
									marginTop: 4,
									paddingTop: 0,
									borderTop: '1px solid #e9ecef',
								}}
							>
								<Grid
									xs={12}
									md={12}
									sm={12}
									lg={6}
									item={true}
									sx={{ marginTop: 2 }}
								>
									<ValidationSummary visible={false}></ValidationSummary>
									<Button
										width="100%"
										height={38}
										text={t('common.guardar')}
										type="default"
										stylingMode="contained"
										useSubmitBehavior={true}
									/>
								</Grid>
								<Grid
									xs={12}
									md={12}
									sm={12}
									lg={6}
									item={true}
									sx={{ marginTop: 2 }}
								>
									<Button
										width="100%"
										height={38}
										text={t('common.cancelar')}
										type="danger"
										stylingMode="contained"
										onClick={() => navigate('/cuadrillas')}
									/>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
				<ModalTrabajadoresCuadrillas
					open={open}
					handleClose={handleClose}
					selectedTrabajadores={selectedTrabajadores}
					loadSelectedTrabajadores={loadSelectedTrabajadores}
					loadDataTrabajadoresCuadrillas={loadDataTrabajadoresCuadrillas}
					loadTrabajadoresCuadrillas={loadTrabajadoresCuadrillas}
					trabajadoresCuadrillas={trabajadoresCuadrillas}
				/>
			</>
		);
	}
};
