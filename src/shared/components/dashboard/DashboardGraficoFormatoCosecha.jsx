import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Grid, Paper, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

import GraficoCuadrillas from './GraficoCuadrillas';

const DashboardGraficoCuadrillas = (props) => {
	const [t] = useTranslation('global');
	const { value, handleCuadrillaCnange, dataGrafico, fecha } = props;
	return (
		<>
			<Paper sx={{ width: '97%', padding: '1px' }} variant="outlined">
				<TabContext value={value}>
					<TabList
						onChange={handleCuadrillaCnange}
						aria-label="lab API tabs example"
						centered
						variant="fullWidth"
					>
						<Tab label={t('formatosCosechas.title')} value="1" />
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
						<GraficoCuadrillas dataGrafico={dataGrafico} fecha={fecha} />
					)}
				</Grid>
			</Paper>
		</>
	);
};

export default DashboardGraficoCuadrillas;
