import { Grid } from '@mui/material';
import { LoadPanel } from 'devextreme-react';
import { useTranslation } from 'react-i18next';

import DashboardGraficoCuadrilla from '../components/dashboard/DashboardGraficoCuadrilla';
import DashboardGraficoFormatoCosecha from '../components/dashboard/DashboardGraficoFormatoCosecha';
import DashboardGraficoTrabajadores from '../components/dashboard/DashboardGraficoTrabajadores';
import IconBreadcrumbs from '../components/navigations/IconBreadcrumbs';
import { tabTitle } from '../helpers/headerTitle';
import { DateBoxComponent } from './../components/controls/DateBoxComponent';
import { SelectComponent } from './../components/controls/SelectComponent';
import DashboardGraficosCamposVariedades from './../components/dashboard/DashboardGraficoCamposVariedades';
import useDashboard from './../hooks/useDashboard';

export default function Dashboard() {
	const [t] = useTranslation('global');

	const title = t('dashboard.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		especies,
		handleChangeEspecie,
		handleChangeFecha,
		fecha,
		especie,
		dataGrafico,
		loading,
		dataVariedades,
		handleChange,
		value,
		valueCuadrilla,
		handleCuadrillaChange,
		dataCuadrillas,
		dataFormatoCosecha,
		valueFormatoCosecha,
		handleChangeFormatoCosecha,
		dataContratista,
		handleChangeTrabajadores,
		valueTrabajadores,
		dataTrabajadores,
	} = useDashboard();

	return (
		<>
			<LoadPanel
				shadingColor="rgba(0,0,0,0.4)"
				visible={loading}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			<IconBreadcrumbs urls={[]} />
			<Grid container spacing={2} sx={{ padding: 1, paddingTop: 1 }}>
				<Grid xs={12} md={6} sx={{ padding: 2 }} item={true}>
					<DateBoxComponent
						value={fecha}
						text={t('common.fecha')}
						handleChangeEvent={handleChangeFecha}
					/>
				</Grid>
				<Grid xs={12} md={6} sx={{ padding: 2 }} item>
					<SelectComponent
						dataSource={especies}
						displayExpr={'especie'}
						valueExpr={'codEspecie'}
						text={t('common.especie')}
						clearButton={null}
						value={
							especie !== undefined
								? especie
								: parseInt(localStorage.getItem('codEspecie'))
						}
						valueChangedEvent={handleChangeEspecie}
					/>
				</Grid>
				<Grid xs={12} md={6} sx={{ padding: 0 }} item={true}>
					<DashboardGraficosCamposVariedades
						dataGrafico={dataGrafico}
						dataVariedades={dataVariedades}
						value={value}
						handleChange={handleChange}
						fecha={fecha}
					/>
				</Grid>
				<Grid xs={12} md={6} sx={{ padding: 0 }} item={true}>
					<DashboardGraficoFormatoCosecha
						value={valueFormatoCosecha}
						dataGrafico={dataFormatoCosecha}
						handleChangeFormatoCosecha={handleChangeFormatoCosecha}
						fecha={fecha}
					/>
				</Grid>
				<Grid xs={12} md={7} sx={{ padding: 0 }} item={true}>
					<DashboardGraficoCuadrilla
						value={valueCuadrilla}
						handleChangeCuadrilla={handleCuadrillaChange}
						dataGrafico={dataCuadrillas}
						dataContratista={dataContratista}
						fecha={fecha}
					/>
				</Grid>
				<Grid xs={12} md={5} sx={{ padding: 0 }} item={true}>
					<DashboardGraficoTrabajadores
						value={valueTrabajadores}
						handleChangeTrabajador={handleChangeTrabajadores}
						dataGrafico={dataTrabajadores}
						fecha={fecha}
					/>
				</Grid>
			</Grid>
		</>
	);
}
