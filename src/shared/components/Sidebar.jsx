import { Box, Drawer } from '@mui/material';
import { useReducer } from 'react';

import { initialState, reducer, SidebarContext } from './../contexts/sidebar';
import MenuSidebar from './navigations/MenuSidebar.jsx';

export default function Sidebar(props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const context = {
		...state,
		dispatch,
	};
	return (
		<Box
			component="nav"
			sx={{ width: { md: 240, xs: 0 }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<SidebarContext.Provider value={context}>
				<Drawer
					variant="temporary"
					open={props.mobileOpen}
					onClose={props.handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
					}}
				>
					<MenuSidebar />
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', md: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
					}}
					open
				>
					<MenuSidebar />
				</Drawer>
			</SidebarContext.Provider>
		</Box>
	);
}
