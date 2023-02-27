import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Grid, Paper, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

import GraficoContratista from './GraficoContratista';
import GraficoFormatoCosecha from './GraficoFormatoCosecha';

const DashboardGraficoFormatoCosechas = (props) => {
	const [t] = useTranslation('global');
	const { value, handleChangeCuadrilla, dataGrafico, fecha, dataContratista } =
		props;

	return (
		<>
			<Paper sx={{ width: '98.5%', padding: '1px' }} variant="outlined">
				<TabContext value={value}>
					<TabList
						onChange={handleChangeCuadrilla}
						aria-label="lab API tabs example"
						centered
						variant="fullWidth"
					>
						<Tab label={t('cuadrillas.title')} value="1" />
						<Tab label={t('contratistas.title')} value="2" />
					</TabList>
				</TabContext>
				<Grid
					sx={{
						width: '100%',
					}}
				>
					{value === '1' && (
						<GraficoFormatoCosecha dataGrafico={dataGrafico} fecha={fecha} />
					)}
					{value === '2' && (
						<GraficoContratista dataGrafico={dataContratista} fecha={fecha} />
					)}
				</Grid>
			</Paper>
		</>
	);
};

export default DashboardGraficoFormatoCosechas;
