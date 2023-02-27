import '../../assets/css/shared/pages/login.css';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { tabTitle } from '../helpers/headerTitle';
import useLogin from '../hooks/useLogin';

const theme = createTheme();

export default function Login() {
	const [t] = useTranslation('global');

	const title = t('login.title').toString();

	tabTitle(`AgriControl - ${title}`);
	const { setPassword, password, setEmail, email, loading, handleSubmit } =
		useLogin();

	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://source.unsplash.com/random)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<img
							src="/static/image/logo-empresa.png"
							alt="AgriControl"
							className="logo-login"
						/>

						<Typography component="h2" variant="h6">
							{t('login.title')}
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								color="success"
								id="email"
								label={t('common.email')}
								name="email"
								autoComplete="email"
								autoFocus
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								color="success"
								name="password"
								label={t('common.password')}
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="success" />}
								label={t('login.recordarme')}
							/>
							<LoadingButton
								fullWidth
								variant="contained"
								type="submit"
								color="success"
								loading={loading}
							>
								{t('login.button')}
							</LoadingButton>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										{t('login.recuperarPassword')}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
