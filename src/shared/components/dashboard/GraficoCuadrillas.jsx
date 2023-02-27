import { Grid, Typography } from '@mui/material';
import { Button, LoadPanel } from 'devextreme-react';
import { PieChart, Series, Tooltip } from 'devextreme-react/pie-chart';
import { useTranslation } from 'react-i18next';

import useGraficoFormatoCosecha from '../../hooks/dashboard/useGraficoFormatoCosecha';
import { customPalette } from './../../helpers/palette';
import TooltipGraficos from './TooltipGraficos';

const GraficoCuadrillas = (props) => {
	const [t] = useTranslation('global');
	const { dataGrafico, fecha } = props;
	const {
		handlePointCampoClick,
		loading,
		dataCampos,
		setDataCampos,
		campo,
		dataCuarteles,
		dataSectores,
		sector,
		setDataSectores,
		setDataCuarteles,
		handlePointSectorClick,
		handlePointCuartelClick,
		formato,
	} = useGraficoFormatoCosecha(fecha, dataGrafico);

	return (
		<>
			<LoadPanel
				shadingColor="rgba(0,0,0,0.4)"
				visible={loading}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			{dataCuarteles.length > 0 ? (
				<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
					<Grid
						sx={{
							width: '50%',
							height: 300,
							display: 'flex',
							justifyContent: 'center',
							margin: '0 auto',
							marginLeft: '60px',
							padddingLeft: '60px',
							xs: {
								marginLeft: '0px',
								padddingLeft: '0px',
							},
						}}
						xs={12}
						item
					>
						{dataCuarteles.length > 0 && (
							<PieChart
								dataSource={dataCuarteles}
								palette={customPalette}
								type="doughnut"
							>
								<Series argumentField="cuartel" valueField="kilos" />
								<Tooltip enabled={true} contentRender={TooltipGraficos} />
							</PieChart>
						)}
					</Grid>
					<Grid
						xs={12}
						item
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: '40px',
						}}
					>
						<Typography variant="h6">
							{' '}
							{t('common.formato').toUpperCase()}: {formato} |{' '}
							{t('common.campo').toUpperCase()}: {campo} |{' '}
							{t('common.sector').toUpperCase()}: {sector}
						</Typography>
						<Button
							text={t('common.regresar')}
							onClick={() => setDataCuarteles([])}
						/>
					</Grid>
				</Grid>
			) : dataSectores.length > 0 ? (
				<Grid
					container
					spacing={2}
					sx={{ padding: 5, alignItems: 'center', maxHeight: 480 }}
				>
					<Grid
						sx={{
							width: '50%',
							height: 300,
							display: 'flex',
							justifyContent: 'center',
							margin: '0 auto',
							marginLeft: '60px',
							padddingLeft: '60px',
							xs: {
								marginLeft: '0px',
								padddingLeft: '0px',
							},
						}}
						xs={12}
						item
					>
						{dataSectores.length > 0 && (
							<PieChart
								dataSource={dataSectores}
								palette={customPalette}
								onPointClick={handlePointCuartelClick}
								type="doughnut"
							>
								<Series argumentField="sector" valueField="kilos" />
								<Tooltip enabled={true} contentRender={TooltipGraficos} />
							</PieChart>
						)}
					</Grid>
					<Grid
						xs={12}
						item
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: '40px',
						}}
					>
						<Typography variant="h6">
							{' '}
							{t('common.formato').toUpperCase()}: {formato} | {''}
							{t('common.campo').toUpperCase()} : {campo}
						</Typography>
						<Button
							text={t('common.regresar')}
							onClick={() => setDataSectores([])}
						/>
					</Grid>
				</Grid>
			) : dataCampos.length > 0 ? (
				<Grid
					container
					spacing={2}
					sx={{ padding: 5, alignItems: 'center', maxHeight: 480 }}
				>
					<Grid
						sx={{
							width: '50%',
							height: 300,
							display: 'flex',
							justifyContent: 'center',
							margin: '0 auto',
							marginLeft: '60px',
							padddingLeft: '60px',
							xs: {
								marginLeft: '0px',
								padddingLeft: '0px',
							},
						}}
						xs={12}
						item
					>
						{dataCampos.length > 0 && (
							<>
								<PieChart
									id="chart"
									type="doughnut"
									dataSource={dataCampos}
									onPointClick={handlePointSectorClick}
									palette={customPalette}
								>
									<Series argumentField="campo" valueField="kilos" />
									<Tooltip enabled={true} contentRender={TooltipGraficos} />
								</PieChart>
							</>
						)}
					</Grid>
					<Grid
						xs={12}
						item
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: '40px',
						}}
					>
						<Typography variant="h6">
							{' '}
							{t('common.formato').toUpperCase()} : {formato}
						</Typography>
						<Button
							text={t('common.regresar')}
							onClick={() => setDataCampos([])}
						/>
					</Grid>
				</Grid>
			) : (
				<Grid
					container
					spacing={2}
					sx={{ padding: 5, alignItems: 'center', maxHeight: 480 }}
				>
					<Grid
						sx={{
							width: '50%',
							height: 340,
							display: 'flex',
							justifyContent: 'center',
							margin: '0 auto',
							marginLeft: '60px',
							padddingLeft: '60px',
							xs: {
								marginLeft: '0px',
								padddingLeft: '0px',
							},
						}}
						xs={12}
						item
					>
						{dataGrafico.length > 0 && (
							<PieChart
								width={'100%'}
								id="chart"
								dataSource={dataGrafico}
								onPointClick={handlePointCampoClick}
								palette={customPalette}
								type="doughnut"
							>
								<Series
									type="pie"
									argumentField="descripcion"
									valueField="kilos"
								/>
								<Tooltip enabled={true} contentRender={TooltipGraficos} />
							</PieChart>
						)}
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default GraficoCuadrillas;
