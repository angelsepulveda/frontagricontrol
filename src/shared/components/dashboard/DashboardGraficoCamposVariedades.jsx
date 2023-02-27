import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Grid, Paper, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

import GraficoCamposCosechas from './GraficoCamposCosechas';
import GraficoVariedadesCosechas from './GraficoVariedadesCosechas';

const DashboardGraficosCamposVariedades = (props) => {
	const [t] = useTranslation('global');
	const { value, handleChange, dataGrafico, fecha, dataVariedades } = props;

	return (
		<>
			<Paper sx={{ width: '97%', padding: '1px' }} variant="outlined">
				<TabContext value={value}>
					<TabList
						onChange={handleChange}
						aria-label="lab API tabs example"
						centered
						variant="fullWidth"
					>
						<Tab label={t('common.campos')} value="1" />
						<Tab label={t('variedades.title')} value="2" />
					</TabList>
				</TabContext>
				<Grid
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						margin: '0 auto',
						padding: 0,
					}}
				>
					{value === '1' && (
						<GraficoCamposCosechas dataGrafico={dataGrafico} fecha={fecha} />
					)}
					{value === '2' && (
						<GraficoVariedadesCosechas
							dataVariedades={dataVariedades}
							fecha={fecha}
						/>
					)}
				</Grid>
			</Paper>
		</>
	);
};

export default DashboardGraficosCamposVariedades;
