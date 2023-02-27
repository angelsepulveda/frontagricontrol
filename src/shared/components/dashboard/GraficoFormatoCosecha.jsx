import '../../../assets/css/shared/components/char.css';

import { Grid } from '@mui/material';
import Chart, {
	ArgumentAxis,
	Label,
	Legend,
	Series,
	Tooltip,
} from 'devextreme-react/chart';

import { customPalette } from '../../helpers/palette';
import TooltipGraficos from './TooltipGraficos';

const GraficoFormatoCosecha = (props) => {
	const { dataGrafico } = props;
	return (
		<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
			<Grid
				sx={{
					width: '100%',
					height: 343,
				}}
				xs={12}
				item
			>
				{dataGrafico.length > 0 && (
					<Chart dataSource={dataGrafico} id="chart" palette={customPalette}>
						<ArgumentAxis tickInterval={100}>
							<Label format="decimal" />
						</ArgumentAxis>
						<Series type="bar" argumentField="cuadrilla" valueField="kilos" />
						<Legend visible={false} />
						<Tooltip enabled={true} contentRender={TooltipGraficos} />
					</Chart>
				)}
			</Grid>
		</Grid>
	);
};

export default GraficoFormatoCosecha;
