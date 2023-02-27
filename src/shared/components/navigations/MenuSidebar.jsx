import { Toolbar } from '@mui/material';

import Menu from './Menu';

export default function MenuSidebar() {
	return (
		<div>
			<Toolbar sx={{ background: '#2A638F' }}>
				<img src="/static/image/logo-empresa-border.png" className="logo" />
			</Toolbar>
			<Menu />
		</div>
	);
}
