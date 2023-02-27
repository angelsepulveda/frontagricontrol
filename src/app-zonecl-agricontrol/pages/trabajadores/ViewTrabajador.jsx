import { Grid, Typography } from '@mui/material';
import { Button, DateBox } from 'devextreme-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
	CheckBoxComponent,
	InputComponent,
	SelectComponent,
} from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import ViewDirecciones from '../../components/direcciones/ViewDirecciones';
import SkeletonTrabajador from '../../components/trabajadores/SkeletonTrabajador';
import useViewTrabajador from '../../hooks/trabajadores/useViewTrabajador';

export const ViewTrabajador = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [t] = useTranslation('global');
	const {
		formasPagos,
		gruposBins,
		cuadrillas,
		contratistas,
		sexos,
		paises,
		estadosCiviles,
		bancos,
		estados,
		trabajador,
		loading,
		url,
	} = useViewTrabajador(id);

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
						<Typography variant="h3">Formulario de Trabajadores</Typography>
					</Grid>
					<Grid xs={12} item={true} sx={{ minHeight: 500 }}>
						<Grid spacing={2} container sx={{ padding: 2 }}>
							<Grid xs={12} item={true}>
								<Typography variant="h4">
									{t('trabajadores.formulario')}
								</Typography>
							</Grid>
							<Grid
								md={12}
								xs={12}
								sm={12}
								lg={3}
								item={true}
								className="text-field"
							>
								<InputComponent
									value={trabajador.codTrabajador}
									label={t('common.rut')}
									disabled={true}
									required={true}
									style={{ padding: '5px' }}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.nombres}
									label={t('common.nombres')}
									disabled={true}
									style={{ padding: '5px' }}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.primerApellido}
									label={t('common.primerApellido')}
									disabled={true}
									style={{ padding: '5px' }}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.segundoApellido}
									label={t('common.segundoApellido')}
									disabled={true}
									style={{ padding: '5px' }}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.nombreSocial}
									label={t('common.nombreSocial')}
									disabled={true}
									style={{ padding: '5px' }}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.nemoTecnico}
									label={t('common.nemoTecnico')}
									disabled={true}
									style={{ padding: '5px' }}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<Typography variant="subtitle1" sx={{ padding: '5px' }}>
									Fecha Nacimiento
								</Typography>
								<DateBox
									value={trabajador.fechaNacimiento}
									type="date"
									labelMode="floating"
									label="Fecha"
									useMaskBehavior={true}
									displayFormat="shortdate"
									disabled
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<SelectComponent
									dataSource={sexos}
									style={{ padding: '5px' }}
									displayExpr={'sexo'}
									valueExpr={'codSexo'}
									label={t('common.sexo')}
									value={trabajador.codSexo}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<SelectComponent
									dataSource={estadosCiviles}
									style={{ padding: '5px' }}
									displayExpr={'estadoCivil'}
									valueExpr={'codEstadoCivil'}
									label={t('trabajadores.estadoCivil')}
									value={trabajador.codEstadoCivil}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<SelectComponent
									dataSource={paises}
									style={{ padding: '5px' }}
									displayExpr={'pais'}
									valueExpr={'codPais'}
									label={t('common.pais')}
									value={trabajador.codPais}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.telefono1}
									label={t('trabajadores.telefono1')}
									style={{ padding: '5px' }}
									disabled={true}
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
									value={trabajador.codGrupoBins}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<SelectComponent
									dataSource={contratistas}
									style={{ padding: '5px' }}
									displayExpr={'nombre'}
									valueExpr={'codContratista'}
									label={t('common.contratista')}
									value={trabajador.codContratista}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<SelectComponent
									dataSource={cuadrillas}
									style={{ padding: '5px' }}
									displayExpr={'cuadrilla'}
									valueExpr={'codCuadrilla'}
									label={t('common.cuadrilla')}
									value={trabajador.codCuadrilla}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.telefono2}
									label={t('trabajadores.telefono2')}
									style={{ padding: '5px' }}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.email}
									label={t('common.email')}
									style={{ padding: '5px' }}
									disabled={true}
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
									value={trabajador.codBanco}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.codTipoCuenta}
									label={t('trabajadores.tipoCuenta')}
									style={{ padding: '5px' }}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<InputComponent
									value={trabajador.numeroCuenta}
									name={'numeroCuenta'}
									label={t('trabajadores.numeroCuenta')}
									style={{ padding: '5px' }}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={3} item={true}>
								<SelectComponent
									dataSource={formasPagos}
									style={{ padding: '5px' }}
									displayExpr={'formasPagos'}
									valueExpr={'codFormaPago'}
									label={t('trabajadores.formaPago')}
									value={trabajador.codFormaPago}
									disabled={true}
								/>
							</Grid>
							<Grid md={12} xs={12} sm={12} lg={2} item={true}>
								<CheckBoxComponent
									styles={{ paddingTop: '5px', paddingBottom: '10px' }}
									label={t('trabajadores.objetado')}
									value={trabajador.codObjetado}
									disabled={true}
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
							></Grid>
							<ViewDirecciones direcciones={trabajador.direcciones} />
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
									value={trabajador.codEstado}
									disabled={true}
								/>
							</Grid>
						</Grid>
						<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
							<Grid
								xs={12}
								md={12}
								sm={12}
								lg={12}
								item={true}
								sx={{
									marginTop: 2,
									textAlign: 'center',
									alignContent: 'center',
									alignItems: 'center',
								}}
							>
								<Button
									width="100%"
									height={38}
									text={t('common.regresar')}
									type="success"
									stylingMode="contained"
									onClick={() => navigate('/trabajadores')}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</>
		);
	}
};
