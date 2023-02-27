import '../../assets/css/shared/pages/navbar.css';

import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Avatar,
	Box,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';

import useNavbar from '../hooks/useNavbar';

export default function Navbar(props) {
	const {
		imageLanguage,
		handleOpenLanguageMenu,
		handleCloseLanguageMenu,
		anchorLanguage,
		languages,
		settings,
		handleOpenUserMenu,
		handleCloseUserMenu,
		anchorElUser,
		user,
	} = useNavbar();
	return (
		<Box sx={{ flexGrow: 0 }}>
			<AppBar
				position="fixed"
				sx={{
					width: { md: `calc(100% - 240px)` },
					ml: { md: `240px` },
					height: '50px',
					fontSize: '14px',
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={props.handleDrawerToggle}
						sx={{ mr: 2, display: { md: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
						<Grid
							container
							spacing={0}
							direction="row"
							alignItems="center"
							justifyContent="center"
						>
							<Grid item xs={6} sx={{ marginBottom: 2, paddingLeft: 10 }}>
								<IconButton onClick={handleOpenLanguageMenu} sx={{ p: 2 }}>
									<Avatar
										alt="Remy Sharp"
										src={imageLanguage}
										sx={{ mr: 2, height: '25px', width: '25px' }}
									/>
								</IconButton>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorLanguage}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorLanguage)}
									onClose={handleCloseLanguageMenu}
								>
									{languages.map((language) => (
										<MenuItem key={language.key} onClick={language.onClick} sx={{ width: '150px' }}>
											<Typography textAlign="center" sx={{ fontSize: 15 , width: '150px' }}>
												{language.text}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Grid>
							<Grid item xs={6} sx={{ marginBottom: 2 }}>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt="Remy Sharp"
										src={
											user.avatar !== null
												? user.avatar
												: '/static/image/user.jpg'
										}
										sx={{ mr: 2, height: '25px', width: '25px' }}
									/>
									<Typography
										variant="button"
										display="block"
										gutterBottom
										sx={{ color: '#fff', fontSize: '10px' }}
									>
										{user.name !== null || user.name !== ''
											? user.name
											: user.email}
										<p className="productor">
											Productor:{' '}
											{user.codProductor !== undefined ? user.codProductor : ''}{' '}
										</p>
									</Typography>
								</IconButton>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem key={setting.key} onClick={setting.onClick} sx={{ width: '150px' }}>
											<Typography textAlign="center" sx={{ fontSize: 15 , width: '150px' }}>
												{setting.text}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Grid>
						</Grid>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
