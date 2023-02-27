import { Grid, Typography } from '@mui/material';
import { Button, LoadPanel, PieChart } from 'devextreme-react';
import { Series, Tooltip } from 'devextreme-react/chart';
import { useTranslation } from 'react-i18next';

import { customPalette } from '../../helpers/palette';
import useGraficoVariedadesCosechas from '../../hooks/dashboard/useGraficoVariedadesCosechas';
import TooltipGraficos from './TooltipGraficos';

const GraficoVariedadesCosechas = (props) => {
	const [t] = useTranslation('global');
	const { dataVariedades, fecha } = props;

	const {
		handlePointVariedadesClick,
		dataCampos,
		loading,
		setDataCampos,
		handlePointCampoVariedadesClick,
		handlePointSectorVariedadesClick,
		setDataSectores,
		dataSectores,
		setDataCuarteles,
		dataCuarteles,
		variedad,
		campo,
		sector,
	} = useGraficoVariedadesCosechas(fecha, dataVariedades);
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
						item
					>
						{dataSectores.length > 0 && (
							<PieChart
								dataSource={dataCuarteles}
								id="pie"
								palette={customPalette}
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
							{t('common.variedad').toUpperCase()} : {variedad} |{' '}
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
						item
					>
						{dataSectores.length > 0 && (
							<PieChart
								dataSource={dataSectores}
								id="pie"
								onPointClick={handlePointSectorVariedadesClick}
								palette={customPalette}
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
							{t('common.variedad').toUpperCase()} : {variedad} |{' '}
							{t('common.campo').toUpperCase()}: {campo}
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
						item
					>
						{dataCampos.length > 0 && (
							<PieChart
								dataSource={dataCampos}
								id="pie"
								onPointClick={handlePointCampoVariedadesClick}
								palette={customPalette}
							>
								<Series argumentField="campo" valueField="kilos" />
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
							{t('common.variedad').toUpperCase()} : {variedad}
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
						{dataVariedades.length > 0 && (
							<PieChart
								dataSource={dataVariedades}
								id="pie"
								onPointClick={handlePointVariedadesClick}
								palette={customPalette}
							>
								<Series argumentField="variedad" valueField="kilos" />
								<Tooltip enabled={true} contentRender={TooltipGraficos} />
							</PieChart>
						)}
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default GraficoVariedadesCosechas;
