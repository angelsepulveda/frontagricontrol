import { Grid, Typography } from '@mui/material';
import { Button, ValidationSummary } from 'devextreme-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
	CheckBoxComponent,
	InputComponent,
	SelectComponent,
} from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import SkeletonFormCuarteles from '../../components/cuarteles/SkeletonFormCuarteles';
import useFormCuarteles from '../../hooks/cuarteles/useFormCuarteles';

export const FormCuarteles = () => {
	const { id } = useParams();
	const [t] = useTranslation('global');
	const {
		loading,
		formCuartel,
		tiposCoberturas,
		campos,
		clasificacionesDensidades,
		estados,
		cuartelesVariedades,
		isAddCuartelesVariedades,
		variedades,
		isRemoveCuartelesVariedades,
		sectores,
		anioPlantacion,
		handleAddCuartelVariedad,
		handleRemoveCuartelVariedad,
		handleChangeCuartelVariedad,
		handleChangeVariedad,
		handleChangeFinalizaCosecha,
		handleSave,
		handleChangeCuartel,
		handleChangeEstado,
		handleChangeCampo,
		handleChangeSector,
		handleChangeOrganico,
		handleChangeProductivo,
		handleChangeClasificacionDensidad,
		handleChangeAnioPlantacion,
		handleChangeTipoCobertura,
		navigate,
		url,
	} = useFormCuarteles(id);

	if (loading) {
		return <SkeletonFormCuarteles />;
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
						<Typography variant="h3">{t('cuarteles.formulario')}</Typography>
					</Grid>
					<Grid xs={12} item={true} sx={{ minHeight: 500 }}>
						<form action="" onSubmit={handleSave}>
							<Grid spacing={2} container sx={{ padding: 2 }}>
								<Grid xs={12} item={true}>
									<Typography variant="h4">
										{t('cuarteles.datosCuarteles')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formCuartel.cuartel}
										name={'cuartel'}
										label={t('common.cuartel')}
										handleChangeEvent={handleChangeCuartel}
										required={true}
										maxLength={50}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formCuartel.nemoTecnico}
										name={'nemoTecnico'}
										label={t('common.nemoTecnico')}
										handleChangeEvent={handleChangeCuartel}
										required={false}
										maxLength={50}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formCuartel.nombreCorto}
										name={'nombreCorto'}
										label={t('common.nombreCorto')}
										handleChangeEvent={handleChangeCuartel}
										required={false}
										maxLength={5}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={campos}
										style={{ padding: '5px' }}
										displayExpr={'campo'}
										valueExpr={'codCampo'}
										label={t('common.campo')}
										value={formCuartel.codCampo}
										valueChangedEvent={handleChangeCampo}
										required={true}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={sectores}
										style={{ padding: '5px' }}
										displayExpr={'sector'}
										valueExpr={'codSector'}
										label={t('common.sector')}
										value={formCuartel.codSector}
										valueChangedEvent={handleChangeSector}
										required={true}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={
											formCuartel.superficie
												? formCuartel.superficie.toString()
												: null
										}
										name={'superficie'}
										label={t('common.superficie')}
										handleChangeEvent={handleChangeCuartel}
										required={false}
										patternRule={/^([0-9]{1,10}(\.[0-9]{1,2})?)$/}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={tiposCoberturas}
										style={{ padding: '5px' }}
										displayExpr={'tipoCobertura'}
										valueExpr={'codTipoCobertura'}
										label={t('cuarteles.tipoCobertura')}
										value={formCuartel.codTipoCobertura}
										valueChangedEvent={handleChangeTipoCobertura}
										required={true}
									/>
								</Grid>
								<Grid xs={12} md={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={estados}
										style={{ padding: '5px' }}
										displayExpr={'estado'}
										valueExpr={'codEstado'}
										label={t('common.estado')}
										value={formCuartel.codEstado}
										valueChangedEvent={handleChangeEstado}
										required={true}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ padding: 2 }}>
								<Grid xs={12} item={true} sx={{ marginTop: 4 }}>
									<Typography variant="h4">
										{t('cuarteles.densidadPlantacion')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={anioPlantacion}
										style={{ padding: '5px' }}
										displayExpr={'label'}
										valueExpr={'value'}
										label={t('common.anioPlantacion')}
										value={formCuartel.anioPlantacion}
										valueChangedEvent={handleChangeAnioPlantacion}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={2} item={true}>
									<InputComponent
										value={
											formCuartel.entreHilera
												? formCuartel.entreHilera.toString()
												: null
										}
										name={'entreHilera'}
										label={t('cuarteles.entreHilera')}
										handleChangeEvent={handleChangeCuartel}
										required={false}
										patternRule={/^([0-9]{0,1}(\.[0-9]{0,1})?)$/}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={2} item={true}>
									<InputComponent
										value={
											formCuartel.sobreHilera
												? formCuartel.sobreHilera.toString()
												: null
										}
										name={'sobreHilera'}
										label={t('cuarteles.sobreHilera')}
										handleChangeEvent={handleChangeCuartel}
										required={false}
										patternRule={/^([0-9]{0,1}(\.[0-9]{0,2})?)$/}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={2} item={true}>
									<SelectComponent
										dataSource={clasificacionesDensidades}
										style={{ padding: '5px' }}
										displayExpr={'clasificacion'}
										valueExpr={'codClasificacionDensidad'}
										label={t('cuarteles.clasificacionDensidad')}
										value={formCuartel.codClasificacionDensidad}
										name={'anioPlantacion'}
										valueChangedEvent={handleChangeClasificacionDensidad}
										required={false}
									/>
								</Grid>
								<Grid
									md={6}
									xs={6}
									sm={6}
									lg={2}
									item={true}
									sx={{ alignItems: 'center', textAlign: 'center' }}
								>
									<CheckBoxComponent
										styles={{ padding: '1px', marginBottom: '20px' }}
										label={t('cuarteles.organico')}
										value={formCuartel.organico}
										name={'organico'}
										valueChangedEvent={handleChangeOrganico}
									/>
								</Grid>
								<Grid
									md={6}
									xs={6}
									sm={6}
									lg={2}
									item={true}
									sx={{ alignItems: 'center', textAlign: 'center' }}
								>
									<CheckBoxComponent
										styles={{ padding: '1px', marginBottom: '20px' }}
										label={t('cuarteles.productivo')}
										value={formCuartel.productivo}
										name={'productivo'}
										valueChangedEvent={handleChangeProductivo}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
								<Grid xs={12} item={true} sx={{ marginTop: 4 }}>
									<Typography variant="h4">
										{t('cuarteles.variedadesAsociadas')}
									</Typography>
								</Grid>
								<Grid
									md={12}
									xs={12}
									sm={12}
									lg={2}
									item={true}
									sx={{ marginBottom: 2 }}
								>
									{isAddCuartelesVariedades ? (
										<Button
											onClick={handleAddCuartelVariedad}
											icon="add"
											text={t('cuarteles.agregarVariedad')}
										/>
									) : (
										''
									)}
								</Grid>
								<Grid
									md={12}
									xs={12}
									sm={12}
									lg={2}
									item={true}
									sx={{ marginBottom: 2 }}
								></Grid>
							</Grid>
							{cuartelesVariedades.map((cuartelVariedad, index) => (
								<Grid spacing={2} container sx={{ paddingLeft: 2 }} key={index}>
									<Grid
										md={12}
										xs={12}
										sm={12}
										lg={12}
										item={true}
										sx={{ padding: '5px', marginTop: 3 }}
									>
										{isRemoveCuartelesVariedades ? (
											<Button
												icon="remove"
												text={t('cuarteles.eliminarVariedad')}
												onClick={() => handleRemoveCuartelVariedad(index)}
												type="danger"
											/>
										) : (
											''
										)}
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={3} item={true}>
										<SelectComponent
											dataSource={variedades}
											style={{ padding: '5px' }}
											id={index.toString()}
											displayExpr={'variedad'}
											valueExpr={'codVariedad'}
											label={t('common.variedad')}
											value={cuartelVariedad.codVariedad}
											selectionChangedEvent={handleChangeVariedad}
											required={true}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={3} item={true}>
										<InputComponent
											label={t('common.nemoTecnico')}
											style={{ padding: '5px' }}
											value={cuartelVariedad.nemoTecnico}
											accessKey={index.toString()}
											name={'nemoTecnico'}
											handleChangeEvent={handleChangeCuartelVariedad}
											required={false}
											maxLength={20}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={2} item={true}>
										<InputComponent
											label={t('cuarteles.haProductivas')}
											style={{ padding: '5px' }}
											value={
												cuartelVariedad.haProductivasVar
													? cuartelVariedad.haProductivasVar.toString()
													: null
											}
											accessKey={index.toString()}
											name={'haProductivasVar'}
											handleChangeEvent={handleChangeCuartelVariedad}
											required={false}
											patternRule={/^([0-9]{0,4}(\.[0-9]{0,2})?)$/}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={2} item={true}>
										<InputComponent
											label={t('cuarteles.numPlantas')}
											style={{ padding: '5px' }}
											value={
												cuartelVariedad.numPlantas
													? cuartelVariedad.numPlantas.toString()
													: null
											}
											accessKey={index.toString()}
											name={'numPlantas'}
											handleChangeEvent={handleChangeCuartelVariedad}
											required={false}
											patternRule={/^[0-9]{1,10}$/}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={2} item={true}>
										<InputComponent
											label={t('cuarteles.numHileras')}
											style={{ padding: '5px' }}
											value={
												cuartelVariedad.numHileras
													? cuartelVariedad.numHileras.toString()
													: null
											}
											accessKey={index.toString()}
											name={'numHileras'}
											handleChangeEvent={handleChangeCuartelVariedad}
											required={false}
											patternRule={/^[0-9]{1,10}$/}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={3} item={true}>
										<InputComponent
											label={t('cuarteles.diaCosechaMin')}
											style={{ padding: '5px' }}
											value={
												cuartelVariedad.diaFrecuenciaMin
													? cuartelVariedad.diaFrecuenciaMin.toString()
													: null
											}
											accessKey={index.toString()}
											name={'diaFrecuenciaMin'}
											handleChangeEvent={handleChangeCuartelVariedad}
											required={false}
											patternRule={/^[0-9]{1,5}$/}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={3} item={true}>
										<InputComponent
											label={t('cuarteles.diaCosechaMax')}
											style={{ padding: '5px' }}
											value={
												cuartelVariedad.diaFrecuenciaMax
													? cuartelVariedad.diaFrecuenciaMax.toString()
													: null
											}
											accessKey={index.toString()}
											name={'diaFrecuenciaMax'}
											handleChangeEvent={handleChangeCuartelVariedad}
											required={false}
											patternRule={/^[0-9]{1,5}$/}
										/>
									</Grid>
									<Grid
										md={6}
										xs={6}
										sm={6}
										lg={2}
										item={true}
										sx={{ alignItems: 'center', textAlign: 'center' }}
									>
										<CheckBoxComponent
											styles={{ padding: '1px', marginBottom: '20px' }}
											label={t('cuarteles.finalizaCosecha')}
											value={
												cuartelVariedad.finalizaCosecha
													? cuartelVariedad.finalizaCosecha
													: false
											}
											name={'finalizaCosecha'}
											valueChangeEvent={(e) =>
												handleChangeFinalizaCosecha(e, index)
											}
											disabled={false}
										/>
									</Grid>
								</Grid>
							))}
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
										type="success"
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
										onClick={(e) => {
											navigate('/cuarteles');
										}}
									/>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</Grid>
			</>
		);
	}
};
