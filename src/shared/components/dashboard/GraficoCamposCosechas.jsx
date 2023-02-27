import '../../../assets/css/shared/components/recharts.css';

import { Grid, Typography } from '@mui/material';
import { Button, LoadPanel } from 'devextreme-react';
import { PieChart, Series, Tooltip } from 'devextreme-react/pie-chart';
import { useTranslation } from 'react-i18next';

import { customPalette } from '../../helpers/palette';
import useGraficoCamposCosechas from '../../hooks/dashboard/useGraficoCamposCosechas';
import TooltipGraficos from './TooltipGraficos';

const GraficoCamposCosechas = (props) => {
	const [t] = useTranslation('global');
	const { dataGrafico, fecha } = props;
	const {
		handlePointClick,
		dataSectores,
		handlePointSectorClick,
		dataCuarteles,
		setDataSectores,
		setDataCuarteles,
		loading,
		campo,
		sector,
	} = useGraficoCamposCosechas(fecha, dataGrafico);

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
				<Grid
					container
					spacing={2}
					sx={{ padding: 5, alignItems: 'center', maxHeight: 480 }}
				>
					<Grid
						sx={{
							width: '100%',
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
						sm={12}
						item
					>
						{dataCuarteles.length > 0 && (
							<PieChart dataSource={dataCuarteles} palette={customPalette}>
								<Series type="pie" argumentField="cuartel" valueField="kilos" />
								<Tooltip enabled={true} contentRender={TooltipGraficos} />
							</PieChart>
						)}
					</Grid>
					<Grid
						xs={12}
						sm={12}
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
							{t('common.campo').toUpperCase()} : {campo} |{' '}
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
							width: '100%',
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
						sm={12}
						xs={12}
						item
					>
						{dataSectores.length > 0 && (
							<PieChart
								dataSource={dataSectores}
								onPointClick={handlePointSectorClick}
								palette={customPalette}
							>
								<Series type="pie" argumentField="sector" valueField="kilos" />
								<Tooltip enabled={true} contentRender={TooltipGraficos} />
							</PieChart>
						)}
					</Grid>
					<Grid
						xs={12}
						sm={12}
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
							{t('common.campo').toUpperCase()} : {campo}
						</Typography>
						<Button
							text={t('common.regresar')}
							onClick={() => setDataSectores([])}
						/>
					</Grid>
				</Grid>
			) : (
				<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
					<Grid
						sx={{
							width: '100%',
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
								dataSource={dataGrafico}
								onPointClick={handlePointClick}
								palette={customPalette}
							>
								<Series argumentField="campo" valueField="kilos" />
								<Tooltip enabled={true} contentRender={TooltipGraficos} />
							</PieChart>
						)}
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default GraficoCamposCosechas;
