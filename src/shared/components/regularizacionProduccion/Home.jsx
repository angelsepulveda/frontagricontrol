import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
	DateBoxComponent,
	InputComponent,
	SelectComponent,
} from '../../components/controls';
import { useHome } from '../../hooks/cosechas';
import IconBreadcrumbs from '../navigations/IconBreadcrumbs';
import { ButtonNext, ButtonPrev } from '../wizard';
import SkeletonHome from './SkeletonHome';

export const Home = () => {
	const [t] = useTranslation('global');
	const {
		handleChangeCampo,
		handleChangeCuadrilla,
		handleChangeCuartel,
		handleChangeVariedad,
		handleChangeFormatoCosecha,
		handleChangeTrabajador,
		handleChangeCalidad,
		handleChangeEquipo,
		handleChangeContratista,
		handleSearchProduccion,
		isLoading,
		produccion,
		setProduccion,
		campos,
		cuadrillas,
		cuarteles,
		variedades,
		formatoCosechas,
		trabajadores,
		calidades,
		equipos,
		contratistas,
		sectores,
		handleChangeSector,
		especies,
		handleChangeEspecie,
		messageValidation,
		campo,
		especie,
	} = useHome();

	if (!isLoading) {
		return (
			<>
				<IconBreadcrumbs
					urls={[
						{
							name: 'Regularizacion de Producción',
							url: '/cosecha/regularizacion-produccion',
						},
					]}
				/>
				<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
					<Grid xs={12} item sx={{ padding: 1 }}>
						<Typography variant="h4">
							{t('cosechas.regularizacionProduccion.titleForm')}
						</Typography>
					</Grid>
					<Grid xs={12} md={12} lg={12} item sx={{ mt: 3, padding: 1 }}>
						{messageValidation.length > 0 ? (
							<Typography variant="body1" sx={{ color: 'red' }}>
								{messageValidation}
							</Typography>
						) : null}
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<DateBoxComponent
							value={produccion.fecha}
							label={t('common.fecha')}
							handleChangeEvent={(e) => {
								const seleccion = e.value;
								setProduccion({ ...produccion, fecha: seleccion });
							}}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={campos}
							displayExpr={'campo'}
							valueExpr={'codCampo'}
							label={t('common.campo')}
							defaultValue={produccion.campo === '0' ? campo : produccion.campo}
							value={produccion.campo === '0' ? campo : produccion.campo}
							valueChangedEvent={handleChangeCampo}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={especies}
							displayExpr={'especie'}
							valueExpr={'codEspecie'}
							label={t('common.especie')}
							defaultValue={especie}
							value={produccion.especie === '0' ? especie : produccion.especie}
							valueChangedEvent={handleChangeEspecie}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={sectores}
							displayExpr={'sector'}
							valueExpr={'codSector'}
							label={t('common.sector')}
							defaultValue={'0'}
							value={produccion.sector}
							valueChangedEvent={handleChangeSector}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={cuarteles}
							displayExpr={'cuartel'}
							valueExpr={'codCuartel'}
							label={t('common.cuartel')}
							defaultValue={'0'}
							value={produccion.cuartel}
							valueChangedEvent={handleChangeCuartel}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={cuadrillas}
							displayExpr={'cuadrilla'}
							valueExpr={'codCuadrilla'}
							label={t('common.cuadrilla')}
							defaultValue={'0'}
							value={produccion.cuadrilla}
							valueChangedEvent={handleChangeCuadrilla}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<InputComponent
							value={produccion.jefeCuadrilla}
							label={t('cuadrillas.jefeCuadrilla')}
							disabled={true}
							required={true}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={trabajadores}
							displayExpr={'nombreCompleto'}
							valueExpr={'codTrabajador'}
							label={t('common.trabajador')}
							defaultValue={'0'}
							value={produccion.trabajador}
							valueChangedEvent={handleChangeTrabajador}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={variedades}
							displayExpr={'variedad'}
							valueExpr={'codVariedad'}
							label={t('common.variedad')}
							defaultValue={'0'}
							value={produccion.variedad}
							valueChangedEvent={handleChangeVariedad}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={formatoCosechas}
							displayExpr={'descripcion'}
							valueExpr={'codFormatoCosecha'}
							label={t('common.formatoCosecha')}
							defaultValue={'0'}
							value={produccion.formatoCosecha}
							valueChangedEvent={handleChangeFormatoCosecha}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={calidades}
							displayExpr={'calidad'}
							valueExpr={'codCalidad'}
							label={t('common.calidad')}
							defaultValue={'0'}
							value={produccion.calidad}
							valueChangedEvent={handleChangeCalidad}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={contratistas}
							displayExpr={'nombre'}
							valueExpr={'codContratista'}
							label={t('common.contratista')}
							defaultValue={'0'}
							value={produccion.contratista}
							valueChangedEvent={handleChangeContratista}
						/>
					</Grid>
					<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
						<SelectComponent
							dataSource={equipos}
							displayExpr={'equipo'}
							valueExpr={'codEquipo'}
							label={t('common.equipo')}
							defaultValue={'0'}
							value={produccion.equipo}
							valueChangedEvent={handleChangeEquipo}
						/>
					</Grid>
					<Grid
						xs={12}
						md={6}
						lg={4}
						item
						sx={{ mt: 3, padding: 1, xs: { display: 'none ' } }}
					></Grid>
					<Grid xs={6} md={6} lg={6} item sx={{ mt: 3, padding: 1 }}>
						<ButtonPrev />
					</Grid>
					<Grid xs={6} md={6} lg={6} item sx={{ mt: 3, padding: 1 }}>
						<ButtonNext handleClick={handleSearchProduccion} />
					</Grid>
				</Grid>
			</>
		);
	} else {
		return <SkeletonHome />;
	}
};
