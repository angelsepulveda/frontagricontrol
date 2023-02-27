import { Box, Paper, Toolbar } from '@mui/material';
import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import useLayoutAdmin from '../hooks/useLayoutAdmin';

export const appContext = createContext();

export default function LayoutAdmin() {
	const { estados, handleDrawerToggle, mobileOpen, user } = useLayoutAdmin();

	return (
		<appContext.Provider value={{ estados, user }}>
			<Box
				sx={{
					display: 'flex',
					background: '#ECF0F5',
					height: '100vh',
					width: '100%',
				}}
			>
				<Navbar handleDrawerToggle={handleDrawerToggle} />
				<Sidebar
					handleDrawerToggle={handleDrawerToggle}
					mobileOpen={mobileOpen}
				/>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 1,
						width: { sm: '100vh', xs: '100vh' },
					}}
				>
					<Toolbar />
					<ToastContainer autoClose={3000} />
					<Paper
						sx={{
							maxWidth: { sm: '90%', xs: '100vh' },
							margin: 'auto',
							overflow: 'hidden',
							p: 2,
						}}
					>
						<Outlet />
					</Paper>
				</Box>
			</Box>
		</appContext.Provider>
	);
}
