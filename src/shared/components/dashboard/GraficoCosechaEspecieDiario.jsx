import '../../../assets/css/shared/components/char.css';

import { Card, CardContent, Divider, Grid } from '@mui/material';
import { Button, LoadPanel } from 'devextreme-react';
import { Chart, Legend, Series, ValueAxis } from 'devextreme-react/chart';
import { useTranslation } from 'react-i18next';

import dateHelper from '../../helpers/dateHelper';
import useGraficoCosechaEspecieDiario from '../../hooks/dashboard/useGraficoCosechaEspecieDiario';
import { SelectComponent } from '../controls';

const GraficoCosechaEspecieDiario = () => {
	const [t] = useTranslation('global');
	const {
		dataSource,
		campos,
		campo,
		especies,
		especie,
		handleChangeEspecie,
		handleChangeCampo,
		onSubmit,
		loading,
	} = useGraficoCosechaEspecieDiario();

	return (
		<>
			<LoadPanel
				shadingColor="rgba(0,0,0,0.4)"
				visible={loading}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<SelectComponent
								dataSource={campos}
								displayExpr={'campo'}
								valueExpr={'codCampo'}
								text={t('common.campo')}
								value={campo}
								valueChangedEvent={handleChangeCampo}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectComponent
								dataSource={especies}
								displayExpr={'especie'}
								valueExpr={'codEspecie'}
								text={t('common.especie')}
								value={especie}
								valueChangedEvent={handleChangeEspecie}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<Button
								width="100%"
								height={30}
								text={t('dashboard.generarGrafico')}
								type="success"
								stylingMode="contained"
								onClick={onSubmit}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Divider />
			<Card>
				<CardContent>
					<div className="container-char">
						<Chart
							id="chartDiario"
							dataSource={dataSource}
							title={
								t('dashboard.tituloGraficoTReal') +
								' ' +
								dateHelper.formatDateVista(new Date())
							}
						>
							<Series
								valueField="kilos"
								argumentField="variedad"
								name="variedad"
								type="bar"
								color="#26a69a"
								barWidth={80}
							/>
							<ValueAxis showZero={false} />
							<Legend visible={false} />
						</Chart>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default GraficoCosechaEspecieDiario;
