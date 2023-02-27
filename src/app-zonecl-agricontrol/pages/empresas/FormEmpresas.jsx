import '../../../assets/css/app-zonecl-agricontrol/components/empresas/FormEmpresas.css';

import { Grid, Typography } from '@mui/material';
import { Button, ValidationSummary } from 'devextreme-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
	CheckBoxComponent,
	InputComponent,
	SelectComponent,
} from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import FormDirecciones from '../../components/direcciones/FormDirecciones';
import SkeletonEmpresa from '../../components/empresas/SkeletonEmpresa';
import useFormEmpresa from '../../hooks/empresas/useFormEmpresa';

export const FormEmpresas = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [t] = useTranslation('global');
	const {
		formEmpresa,
		loading,
		handleChangeEmpresa,
		handleChangeAjustarSueldo,
		handleChangeEstado,
		handleChangeMutualidad,
		handleChangeCajaCompensacion,
		direcciones,
		handleSave,
		cajasCompensaciones,
		mutualidades,
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
		url,
	} = useFormEmpresa(id);

	if (loading) {
		return <SkeletonEmpresa />;
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
						<Typography variant="h3">Formulario de Empresas</Typography>
					</Grid>
					<Grid xs={12} item={true} sx={{ minHeight: 500 }}>
						<form action="" onSubmit={handleSave}>
							<Grid spacing={2} container sx={{ padding: 2 }}>
								<Grid xs={12} item={true}>
									<Typography variant="h4">
										{t('empresas.formulario')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formEmpresa.razonSocial}
										name={'razonSocial'}
										label={t('common.razonSocial')}
										handleChangeEvent={handleChangeEmpresa}
										required={true}
										maxLength={50}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formEmpresa.dni}
										name={'dni'}
										label={t('common.dni')}
										handleChangeEvent={handleChangeEmpresa}
										required={true}
										maxLength={20}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formEmpresa.giro}
										name={'giro'}
										label={t('common.giro')}
										handleChangeEvent={handleChangeEmpresa}
										required={true}
										maxLength={100}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formEmpresa.nemoTecnico}
										name={'nemoTecnico'}
										label={t('common.nemoTecnico')}
										handleChangeEvent={handleChangeEmpresa}
										required={false}
										maxLength={20}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid xs={12} item={true}>
									<Typography variant="h4" sx={{ marginTop: 2 }}>
										{t('empresas.formularioRepresentante')}
									</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formEmpresa.repLegal}
										name={'repLegal'}
										label={t('empresas.representanteLegal')}
										handleChangeEvent={handleChangeEmpresa}
										required={false}
										maxLength={50}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<InputComponent
										value={formEmpresa.dniRepLegal}
										name={'dniRepLegal'}
										label={t('empresas.dniRepresentanteLegal')}
										handleChangeEvent={handleChangeEmpresa}
										required={false}
										maxLength={50}
										style={{ padding: '5px' }}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
								<Grid xs={12} item={true} sx={{ marginTop: 2 }}>
									<Typography variant="h4">Datos Previsionales</Typography>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={cajasCompensaciones}
										style={{ padding: '5px' }}
										displayExpr={'cajaCompensacion'}
										valueExpr={'codCajaCompensacion'}
										label={t('empresas.cajaCompensacion')}
										value={formEmpresa.codCajaCompensacion}
										valueChangedEvent={handleChangeCajaCompensacion}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={2} item={true}>
									<InputComponent
										value={formEmpresa.factorCajaCompensacion}
										name={'factorCajaCompensacion'}
										label={t('empresas.factorCajaCompensacion')}
										handleChangeEvent={handleChangeEmpresa}
										required={false}
										maxLength={50}
										patternRule={/^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/}
										messagePatternRule={
											'El factor de caja de compensación no puede superar el valor de 100"'
										}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={3} item={true}>
									<SelectComponent
										dataSource={mutualidades}
										style={{ padding: '5px' }}
										displayExpr={'mutualidad'}
										valueExpr={'codMutualidad'}
										label={'Mutualidad'}
										value={formEmpresa.codMutualidad}
										valueChangedEvent={handleChangeMutualidad}
										required={false}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={2} item={true}>
									<InputComponent
										value={formEmpresa.factorMutualidad}
										name={'factorMutualidad'}
										label={'Factor de Mutualidad'}
										handleChangeEvent={handleChangeEmpresa}
										required={false}
										maxLength={50}
										patternRule={/^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/}
										messagePatternRule={t('validations.max100')}
										style={{ padding: '5px' }}
									/>
								</Grid>
								<Grid md={12} xs={12} sm={12} lg={2} item={true}>
									<CheckBoxComponent
										styles={{ paddingTop: '5px', paddingBottom: '10px' }}
										label={t('empresas.ajustarSueldoMinimo')}
										value={formEmpresa.ajustarSueldoMinimo}
										name={'ajustarSueldoMinimo'}
										valueChangedEvent={handleChangeAjustarSueldo}
									/>
								</Grid>
								<Grid xs={12} md={12} sm={12} lg={6} item={true}>
									<SelectComponent
										dataSource={estados}
										style={{ padding: '5px' }}
										displayExpr={'estado'}
										valueExpr={'codEstado'}
										label={t('common.estado')}
										value={formEmpresa.codEstado}
										valueChangedEvent={handleChangeEstado}
										required={true}
									/>
								</Grid>
							</Grid>
							<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
								<Grid xs={12} item={true} sx={{ marginTop: 4 }}>
									<Typography variant="h4">
										{t('common.formularioDirecciones')}
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
											text="Agregar dirección"
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
										onClick={() => navigate('/empresas')}
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
