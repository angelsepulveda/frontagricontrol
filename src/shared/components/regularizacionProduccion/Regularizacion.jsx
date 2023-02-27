import { Button, Grid, Typography } from '@mui/material';
import { LoadPanel } from 'devextreme-react';
import { useTranslation } from 'react-i18next';

import { useWizardContext } from '../../contexts/wizard';
import { useRegularizacion } from '../../hooks/cosechas';
import IconBreadcrumbs from '../navigations/IconBreadcrumbs';
import { ButtonNext, ButtonPrev } from '../wizard';
import DataGridProduccion from './DataGridProduccion';
import FormDatos from './FormDatos';

export const Regularizacion = () => {
	const [t] = useTranslation('global');
	const {
		produccionData,
		formatoCosechas,
		trabajadores,
		contratistas,
		campos,
		calidades,
		cuadrillas,
		cuarteles,
		variedades,
		especies,
		sectores,
	} = useWizardContext();

	const {
		handleBack,
		onSelectionChangedData,
		selectedRowKeys,
		totalSeleccionados,
		buttonSave,
		regularizacionForm,
		setRegularizacionForm,
		messageError,
		handleSubmit,
		isLoading,
		isDelete,
		handleDelete,
		tratos,
		codCampo,
		validacion,
		isDisableForm,
		setIsDisableForm,
	} = useRegularizacion(produccionData);

	return (
		<>
			<LoadPanel
				shadingColor="rgba(0,0,0,0.4)"
				visible={isLoading}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			<IconBreadcrumbs
				urls={[
					{
						name: 'Regularizacion de Producción',
						url: '/cosecha/regularizacion-produccion',
					},
				]}
			/>
			<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
				<Grid xs={6} item>
					<Typography variant="h4">
						{t('cosechas.regularizacionProduccion.titleDataGrid')}
					</Typography>
				</Grid>
				<Grid xs={12} item>
					<DataGridProduccion
						trabajadores={trabajadores}
						data={produccionData}
						onSelectionChangedData={onSelectionChangedData}
						selectedRowKeys={selectedRowKeys}
						totalSeleccionados={totalSeleccionados}
						isDelete={isDelete}
						handleDelete={handleDelete}
					/>
				</Grid>
				<Grid xs={12} item>
					{messageError !== '' ? (
						<Typography variant="body1" sx={{ color: 'red' }}>
							{messageError}
						</Typography>
					) : (
						''
					)}
				</Grid>
				<Grid xs={12} item>
					<FormDatos
						formatoCosechas={formatoCosechas}
						trabajadores={trabajadores}
						contratistas={contratistas}
						campos={campos}
						especies={especies}
						calidades={calidades}
						cuadrillas={cuadrillas}
						cuarteles={cuarteles}
						variedades={variedades}
						regularizacionForm={regularizacionForm}
						tratos={tratos}
						sectores={sectores}
						setRegularizacionForm={setRegularizacionForm}
						codCampo={codCampo}
						validacion={validacion}
						isDisableForm={isDisableForm}
						setIsDisableForm={setIsDisableForm}
					/>
				</Grid>
				<Grid xs={6} item>
					<ButtonPrev handleClick={handleBack} />
				</Grid>
				<Grid xs={6} item>
					{buttonSave ? (
						<Button
							variant="contained"
							fullWidth
							type="button"
							onClick={() => {
								const result = validacion(regularizacionForm, isDisableForm);
								if (result === true) handleSubmit();
							}}
						>
							{t('common.guardar')}
						</Button>
					) : (
						<ButtonNext />
					)}
				</Grid>
			</Grid>
		</>
	);
};
