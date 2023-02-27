import '../../../assets/css/app-zonecl-agricontrol/components/trabajadores/formTrabajadores.css';

import { Grid, Typography } from '@mui/material';
import { Button, DateBox, ValidationSummary } from 'devextreme-react';
import { RequiredRule, Validator } from 'devextreme-react/validator';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
	CheckBoxComponent,
	InputComponent,
	SelectComponent,
} from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import FormDirecciones from '../../components/direcciones/FormDirecciones';
import SkeletonTrabajador from '../../components/trabajadores/SkeletonTrabajador';
import useFormTrabajadores from '../../hooks/trabajadores/useFormTrabajador';

export const FormTrabajadores = () => {
	const { id } = useParams();
	const [t] = useTranslation('global');
	const {
		formTrabajador,
		loading,
		handleChangeTrabajador,
		handleChangeObjetado,
		handleChangeEstado,
		handleChangeGrupoBins,
		handleChangeContratista,
		handleChangeCuadrilla,
		handleChangeSexo,
		handleChangeEstadoCivil,
		handleChangePais,
		handleChangeBanco,
		handleChangeFormatosPagos,
		handleChangeFechaNacimiento,
		direcciones,
		handleSave,
		contratistas,
		gruposBins,
		cuadrillas,
		estadosCiviles,
		formasPagos,
		sexos,
		paises,
		bancos,
		estados,
		isRemoveDireccion,
		isAddDireccion,
		handleAdd,
		handleChangeComuna,
		handleChangeDireccion,
		comunas,
		handleRemove,
		handleChangePredeterminada,
		isDisablePredeterminada,
		navigate,
		url,
	} = useFormTrabajadores(id);

	if (loading) {
		return <SkeletonTrabajador />;
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
						<Typography variant="h3">{t('trabajadores.formulario')}</Typography>
					</Grid>
					<Grid xs={12} item={true} sx={{ minHeight: 500 }}>
						<form action="" onSubmit={handleSave}>
							<Grid spacing={2} container sx={{ padding: 2 }}>
								<Grid xs={12} item={true}>
									<Typography variant="h4">
										{t('trabajadores.datosPersonales')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.codTrabajador}
										name={'codTrabajador'}
										label={t('common.rut')}
										handleChangeEvent={handleChangeTrabajador}
										required={true}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.nombres}
										name={'nombres'}
										label={t('common.nombres')}
										handleChangeEvent={handleChangeTrabajador}
										required={true}
										maxLength={30}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.primerApellido}
										name={'primerApellido'}
										label={t('common.primerApellido')}
										handleChangeEvent={handleChangeTrabajador}
										required={true}
										maxLength={30}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.segundoApellido}
										name={'segundoApellido'}
										label={t('common.segundoApellido')}
										handleChangeEvent={handleChangeTrabajador}
										required={true}
										maxLength={30}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.nombreSocial}
										name={'nombreSocial'}
										label={t('common.nombreSocial')}
										handleChangeEvent={handleChangeTrabajador}
										required={false}
										maxLength={30}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.nemoTecnico}
										name={'nemoTecnico'}
										label={t('common.nemoTecnico')}
										handleChangeEvent={handleChangeTrabajador}
										required={false}
										maxLength={30}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<Typography variant="subtitle1" sx={{ padding: '5px' }}>
										Fecha Nacimiento
									</Typography>
									<DateBox
										value={formTrabajador.fechaNacimiento}
										type="date"
										onValueChanged={handleChangeFechaNacimiento}
									>
										<Validator>
											<RequiredRule message="La fecha de nacimiento es obligatoria" />
										</Validator>
									</DateBox>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={sexos}
										style={{ padding: '5px' }}
										displayExpr={'sexo'}
										valueExpr={'codSexo'}
										label={t('common.sexo')}
										value={formTrabajador.codSexo}
										valueChangedEvent={handleChangeSexo}
										required={true}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={estadosCiviles}
										style={{ padding: '5px' }}
										displayExpr={'estadoCivil'}
										valueExpr={'codEstadoCivil'}
										label={t('trabajadores.estadoCivil')}
										value={formTrabajador.codEstadoCivil}
										valueChangedEvent={handleChangeEstadoCivil}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={paises}
										style={{ padding: '5px' }}
										displayExpr={'pais'}
										valueExpr={'codPais'}
										label={t('common.pais')}
										value={formTrabajador.codPais}
										valueChangedEvent={handleChangePais}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.telefono1}
										name={'telefono1'}
										label={t('trabajadores.telefono1')}
										handleChangeEvent={handleChangeTrabajador}
										required={false}
										maxLength={15}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid xs={12} item={true}>
									<Typography variant="h4" sx={{ marginTop: 2 }}>
										{t('trabajadores.datosLaborales')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={gruposBins}
										style={{ padding: '5px' }}
										displayExpr={'gruposBins'}
										valueExpr={'codGrupoBins'}
										label={t('common.grupoBins')}
										value={formTrabajador.codGrupoBins}
										valueChangedEvent={handleChangeGrupoBins}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={contratistas}
										style={{ padding: '5px' }}
										displayExpr={'nombre'}
										valueExpr={'codContratista'}
										label={t('common.contratista')}
										value={formTrabajador.codContratista}
										valueChangedEvent={handleChangeContratista}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={cuadrillas}
										style={{ padding: '5px' }}
										displayExpr={'cuadrilla'}
										valueExpr={'codCuadrilla'}
										label={t('common.cuadrilla')}
										value={formTrabajador.codCuadrilla}
										valueChangedEvent={handleChangeCuadrilla}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.telefono2}
										name={'telefono2'}
										label={t('trabajadores.telefono2')}
										handleChangeEvent={handleChangeTrabajador}
										required={false}
										maxLength={15}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.email}
										name={'email'}
										label={t('common.email')}
										handleChangeEvent={handleChangeTrabajador}
										required={false}
										maxLength={120}
										style={{ padding: '5px' }}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
								<Grid xs={12} item={true} sx={{ marginTop: 2 }}>
									<Typography variant="h4">
										{t('trabajadores.datosBancarios')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={bancos}
										style={{ padding: '5px' }}
										displayExpr={'banco'}
										valueExpr={'codBanco'}
										label={t('trabajadores.banco')}
										value={formTrabajador.codBanco}
										valueChangedEvent={handleChangeBanco}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.codTipoCuenta}
										name={'codTipoCuenta'}
										label={t('trabajadores.tipoCuenta')}
										handleChangeEvent={handleChangeTrabajador}
										required={false}
										maxLength={15}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formTrabajador.numeroCuenta}
										name={'numeroCuenta'}
										label={t('trabajadores.numeroCuenta')}
										handleChangeEvent={handleChangeTrabajador}
										required={false}
										maxLength={20}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={formasPagos}
										style={{ padding: '5px' }}
										displayExpr={'formasPagos'}
										valueExpr={'codFormaPago'}
										label={t('trabajadores.formaPago')}
										value={formTrabajador.codFormaPago}
										valueChangedEvent={handleChangeFormatosPagos}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={2} item={true}>
									<CheckBoxComponent
										styles={{ paddingTop: '5px', paddingBottom: '10px' }}
										label={t('trabajadores.objetado')}
										value={formTrabajador.codObjetado}
										name={'codObjetado'}
										valueChangedEvent={handleChangeObjetado}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
								<Grid xs={12} item={true} sx={{ marginTop: 4 }}>
									<Typography variant="h4">
										{t('direcciones.datosDirecciones')}
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
									{isAddDireccion ? (
										<Button
											onClick={handleAdd}
											icon="add"
											text={t('direcciones.agregarDireccion')}
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
							<FormDirecciones
								direcciones={direcciones}
								isRemoveDireccion={isRemoveDireccion}
								handleRemove={handleRemove}
								handleChangeComuna={handleChangeComuna}
								handleChangeDireccion={handleChangeDireccion}
								handleChangePredeterminada={handleChangePredeterminada}
								comunas={comunas}
								isDisablePredeterminada={isDisablePredeterminada}
							/>
							<Grid
								spacing={2}
								container
								sx={{
									paddingLeft: 2,
									marginTop: 4,
									paddingTop: 0,
									borderTop: '1px solid #e9ecef',
								}}
							></Grid>
							<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
								<Grid xs={12} item={true} sx={{ marginTop: 2 }}>
									<Typography variant="h4">
										{t('trabajadores.estadoTrabajador')}
									</Typography>
								</Grid>
								<Grid xs={12} md={12} sm={12} lg={6} item={true}>
									<SelectComponent
										dataSource={estados}
										style={{ padding: '2px' }}
										displayExpr={'estado'}
										valueExpr={'codEstado'}
										label={t('common.estado')}
										value={formTrabajador.codEstado}
										valueChangedEvent={handleChangeEstado}
										required={true}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
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
										onClick={() => navigate('/trabajadores')}
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
