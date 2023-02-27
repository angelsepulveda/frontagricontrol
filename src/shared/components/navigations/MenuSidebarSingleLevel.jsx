import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const itemCss = {
	py: '2px',
	px: 3,
	color: 'rgba(255, 255, 255, 0.8)',
	// '&:hover, &:focus': {
	// 	bgcolor: '#00A65A',
	// },
};

export default function MenuSidebarSingleLevel({ item }) {
	const [t] = useTranslation('global');
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<ListItem disablePadding>
			<ListItemButton
				sx={itemCss}
				onClick={() => navigate(item.path)}
				selected={location.pathname === item.path}
			>
				<ListItemIcon sx={{ color: '#fff', minWidth: 24 }}>
					<FontAwesomeIcon icon={item.icon} />
				</ListItemIcon>
				<ListItemText primary={t(item.title)} sx={{ color: '#fff' }} />
			</ListItemButton>
		</ListItem>
	);
}
