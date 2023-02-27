import { Grid, Typography } from '@mui/material';
import { DateBox, SelectBox } from 'devextreme-react';
import { CheckBox } from 'devextreme-react/check-box';
import { useTranslation } from 'react-i18next';

import { useFormDatos } from '../../hooks/cosechas';

const FormDatos = (props) => {
	const [t] = useTranslation('global');
	const {
		formatoCosechas,
		trabajadores,
		contratistas,
		campos,
		cuarteles,
		cuadrillas,
		variedades,
		regularizacionForm,
		setRegularizacionForm,
		especies,
		tratos,
		codCampo,
		sectores,
		validacion,
		isDisableForm,
		setIsDisableForm,
	} = props;
	const {
		handleChangeCheckCuadrilla,
		handleChangeCheckCampo,
		handleChangeCheckContratista,
		handleChangeCheckFormatoCosecha,
		handleChangeCheckCuartel,
		handleChangeCheckTrabajador,
		handleChangeCheckVariedad,
		handleChangeCheckFechaCaptura,
		handleChangeCheckJefeCuadrilla,
		handleChangeCampo,
		handleChangeCuartel,
		cuartelesData,
		variedadesData,
		trabajadoresData,
		formatoCosechasData,
		handleChangeCuadrilla,
		handleChangeVariedad,
		handleChangeContratista,
		handleChangeTrabajador,
		handleChangeFechaCaptura,
		handleChangeJefeCuadrilla,
		handleChangeFormatoCosecha,
		handleChangeTrato,
		handleChangeCheckTrato,
		sectoresData,
		handleChangeCheckSector,
		handleChangeSector,
	} = useFormDatos(
		cuarteles,
		variedades,
		trabajadores,
		regularizacionForm,
		setRegularizacionForm,
		especies,
		formatoCosechas,
		tratos,
		sectores,
		validacion,
		isDisableForm,
		setIsDisableForm,
		campos,
		codCampo,
	);
	return (
		<Grid container spacing={2} sx={{ padding: 2, alignItems: 'center' }}>
			<Grid xs={12} item sx={{ padding: 3 }}>
				<Typography variant="h4">
					{t('cosechas.regularizacionProduccion.titleFormRegularizacion')}
				</Typography>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.fechaCaptura}
					name="checkFechaCaptura"
					text={t('common.fechaCaptura')}
					onValueChanged={handleChangeCheckFechaCaptura}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<DateBox
					disabled={!isDisableForm.fechaCaptura}
					onValueChanged={handleChangeFechaCaptura}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.campo}
					name="checkCampo"
					text={t('common.campo')}
					onValueChange={handleChangeCheckCampo}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={campos}
					displayExpr={'campo'}
					valueExpr={'codCampo'}
					defaultValue={'0'}
					searchEnabled={true}
					searchExpr={'campo'}
					showClearButton={true}
					value={
						regularizacionForm.codCampo !== undefined
							? regularizacionForm.codCampo
							: codCampo
					}
					disabled={!isDisableForm.campo}
					name={'codCampo'}
					onValueChanged={handleChangeCampo}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.cuadrilla}
					name="checkCuadrilla"
					text={t('common.cuadrilla')}
					onValueChange={handleChangeCheckCuadrilla}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={cuadrillas}
					displayExpr={'cuadrilla'}
					valueExpr={'codCuadrilla'}
					defaultValue={'0'}
					searchEnabled={true}
					searchExpr={'cuadrilla'}
					value={regularizacionForm.codCuadrilla}
					showClearButton={true}
					disabled={!isDisableForm.cuadrilla}
					name={'codCuadrilla'}
					onValueChanged={handleChangeCuadrilla}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.sector}
					name="checkSector"
					text={t('common.sector')}
					onValueChange={handleChangeCheckSector}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={sectoresData}
					displayExpr={'sector'}
					valueExpr={'codSector'}
					defaultValue={'0'}
					searchEnabled={true}
					searchExpr={'sector'}
					showClearButton={true}
					value={regularizacionForm.codSector}
					disabled={!isDisableForm.sector}
					name={'codSector'}
					onValueChanged={handleChangeSector}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.jefeCuadrilla}
					name="checkJefeCuadrilla"
					text={t('cuadrillas.jefeCuadrilla')}
					onValueChange={handleChangeCheckJefeCuadrilla}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={trabajadores}
					displayExpr={'nombreCompleto'}
					valueExpr={'codTrabajador'}
					defaultValue={'0'}
					searchEnabled={true}
					searchExpr={'nombreCompleto'}
					showClearButton={true}
					value={regularizacionForm.codJefeCuadrilla}
					disabled={!isDisableForm.jefeCuadrilla}
					name={'jefeCuadrilla'}
					onValueChanged={handleChangeJefeCuadrilla}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.cuartel}
					name="checkCuartel"
					text={t('common.cuartel')}
					onValueChange={handleChangeCheckCuartel}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={cuartelesData}
					displayExpr={'cuartel'}
					valueExpr={'codCuartel'}
					defaultValue={'0'}
					searchEnabled={true}
					searchExpr={'cuartel'}
					showClearButton={true}
					value={regularizacionForm.codCuartel}
					disabled={!isDisableForm.cuartel}
					name={'codCuartel'}
					onValueChanged={handleChangeCuartel}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.trabajador}
					name="checkTrabajador"
					text={t('common.trabajador')}
					onValueChange={handleChangeCheckTrabajador}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={trabajadoresData}
					displayExpr={'nombreCompleto'}
					valueExpr={'codTrabajador'}
					defaultValue={'0'}
					searchEnabled={true}
					showClearButton={true}
					value={regularizacionForm.codTrabajador}
					searchExpr={'nombreCompleto'}
					disabled={!isDisableForm.trabajador}
					name={'codTrabajador'}
					onValueChanged={handleChangeTrabajador}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.variedad}
					name="checkVariedad"
					text={t('common.variedad')}
					onValueChange={handleChangeCheckVariedad}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={variedadesData}
					displayExpr={'variedad'}
					valueExpr={'codVariedad'}
					defaultValue={'0'}
					searchEnabled={true}
					searchExpr={'variedad'}
					showClearButton={true}
					value={regularizacionForm.codVariedad}
					disabled={!isDisableForm.variedad}
					name={'codVariedad'}
					onValueChanged={handleChangeVariedad}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.contratista}
					name="checkContratista"
					text={t('common.contratista')}
					onValueChange={handleChangeCheckContratista}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={contratistas}
					displayExpr={'nombre'}
					valueExpr={'codContratista'}
					defaultValue={'0'}
					searchEnabled={true}
					searchExpr={'nombre'}
					showClearButton={true}
					value={regularizacionForm.codContratista}
					disabled={!isDisableForm.contratista}
					name={'codContratista'}
					onValueChanged={handleChangeContratista}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.formatoCosecha}
					name="checkFormatoCosecha"
					text={t('common.formatoCosecha')}
					onValueChange={handleChangeCheckFormatoCosecha}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={formatoCosechasData}
					displayExpr={'descripcion'}
					valueExpr={'codFormatoCosecha'}
					defaultValue={'0'}
					searchEnabled={true}
					showClearButton={true}
					value={regularizacionForm.codFormatoCosecha}
					searchExpr={'descripcion'}
					disabled={!isDisableForm.formatoCosecha}
					name={'codFormatoCosecha'}
					onValueChanged={handleChangeFormatoCosecha}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center' }}
				item
			>
				<CheckBox
					value={isDisableForm.trato}
					name="checkTrato"
					text={t('tratos.trato')}
					onValueChange={handleChangeCheckTrato}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{ padding: 0, alignItems: 'center' }}
				item
			>
				<SelectBox
					dataSource={tratos}
					displayExpr={'trato'}
					valueExpr={'trato'}
					defaultValue={'0'}
					searchEnabled={true}
					showClearButton={true}
					value={regularizacionForm.trato}
					searchExpr={'trato'}
					disabled={!isDisableForm.trato}
					name={'trato'}
					onValueChanged={handleChangeTrato}
				/>
			</Grid>
			<Grid
				xs={12}
				sm={12}
				lg={2}
				sx={{ padding: 2, alignItems: 'center', sm: { display: 'none' } }}
				item
			></Grid>
			<Grid
				xs={12}
				sm={12}
				lg={4}
				sx={{
					padding: 0,
					alignItems: 'center',
					sm: { display: 'none' },
				}}
				item
			></Grid>
		</Grid>
	);
};

export default FormDatos;
