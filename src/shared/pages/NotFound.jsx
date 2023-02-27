import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { tabTitle } from '../helpers/headerTitle';

const NotFound = () => {
	const [t] = useTranslation('global');

	const title = t('usuarios.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const navigate = useNavigate();
	const routeChange = () => {
		const path = `/`;
		navigate(path);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				marginTop: 30,
			}}
		>
			<Container maxWidth="lg" sx={{ textAlign: 'center' }}>
				<Grid container>
					<Grid xs={12} item={true}>
						<img
							src="./static/image/logo-empresa.png"
							alt=""
							width={300}
							height={135}
						/>
					</Grid>
					<Grid xs={12} item={true}>
						<Typography variant="h1">404</Typography>
						<Typography variant="h6" sx={{ padding: 3 }}>
							{t('notFound.message')}
						</Typography>
						<Button variant="contained" onClick={() => routeChange()}>
							{t('common.regresar')}
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default NotFound;
