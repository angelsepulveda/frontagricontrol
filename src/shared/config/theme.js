import { createTheme } from '@mui/material';

/**
 *  COLORES DE LA APLICACIÓN
 */
const primary = '#BAD634';

/** FIN COLORES DE LA APLICACION**/

const theme = createTheme({
	palette: {
		primary: {
			main: primary,
			contrastText: '#FEFCF8',
		},
		background: {
			default: '#F4F6F8',
			paper: '#fff',
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				style: {
					borderRadius: 0,
					textTransform: 'none',
					boxShadow: 'none',
					color: '#FDFBF1',
					fontSize: '14px',
				},
			},
		},
		MuiModal: {
			defaultProps: {
				style: {
					border: 'none',
					outline: 'none',
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected:hover': {
						backgroundColor: '#BAD634',
					},
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: '#3A6F99',
					border: 'none',
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						color: '#FDFBF1',
						backgroundColor: '#BAD634',
					},
					'&:hover': {
						color: '#FDFBF1',
						backgroundColor: '#BAD634',
					},
				},
			},
		},
		MuiAppBar: {
			defaultProps: {
				style: {
					color: '#fff',
					marginBottom: 20,
				},
			},
		},
	},
});

export default theme;
