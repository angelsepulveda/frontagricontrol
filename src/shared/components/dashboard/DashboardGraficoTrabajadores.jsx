import '../../../assets/css/shared/components/graficoTrabajadores.css';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Grid, Paper, Tab } from '@mui/material';
import DataGrid, {
	Column,
	LoadPanel,
	Scrolling,
	Sorting,
} from 'devextreme-react/data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const noBorderStyles = {
	border: 'none',
};

const DashboardGraficoTrabajadores = (props) => {
	const [t] = useTranslation('global');
	const [loadPanelEnabled, setLoadPanelEnabled] = useState(true);

	const { value, handleTrabajadorCnange, dataGrafico } = props;

	const onContentReady = () => {
		setLoadPanelEnabled(false);
	};

	const cellRender = (data) => {
		return <span className="badge">{data.value}</span>;
	};

	useEffect(() => {}, [dataGrafico]);

	return (
		<>
			<Paper sx={{ width: '97%', padding: '1px' }} variant="outlined">
				<TabContext value={value}>
					<TabList
						onChange={handleTrabajadorCnange}
						aria-label="lab API tabs example"
						centered
						variant="fullWidth"
						sx={{ border: 'none' }}
					>
						<Tab label={t('trabajadores.title')} value="1" />
					</TabList>
				</TabContext>
				<Grid
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						margin: '0 auto',
						padding: 0,
						border: 'none',
					}}
				>
					{value === '1' && (
						<DataGrid
							height={410}
							dataSource={dataGrafico}
							keyExpr="id"
							showBorders={false}
							showColumnLine={false}
							showRowLines={false}
							onContentReady={onContentReady}
							id="miDatagrid"
							style={noBorderStyles}
						>
							<Column dataField="id" visible={false} />
							<Column dataField="trabajador" caption={t('common.trabajador')} />
							<Column
								dataField="kilos"
								caption={t('common.kilos')}
								cellRender={cellRender}
							></Column>
							<Sorting mode="none" />
							<Scrolling mode="virtual" />
							<LoadPanel enabled={loadPanelEnabled} />
						</DataGrid>
					)}
				</Grid>
			</Paper>
		</>
	);
};

export default DashboardGraficoTrabajadores;
