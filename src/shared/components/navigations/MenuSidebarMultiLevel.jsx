import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSidebarContext } from '../../contexts/sidebar';
import MenuItem from './MenuItem';

export default function MenuSidebarMultiLevel({ item }) {
	const [t] = useTranslation('global');
	const { items: children } = item;

	const { dispatch, expandedMenu } = useSidebarContext();
	const [open, setOpen] = React.useState(false);

	const handleClick = (id) => {
		if (id !== undefined) {
			dispatch({
				type: 'SET_EXPANDED_MENU',
				payload: expandedMenu === id ? null : id,
			});
		} else {
			setOpen(!open);
		}
	};

	return (
		<React.Fragment key={item.id}>
			<ListItemButton
				onClick={() => handleClick(item.id)}
				sx={{
					py: '2px',
					px: 3,
					color: 'rgba(255, 255, 255, 0.7)',
					// '&:hover, &:focus': {
					// 	bgcolor: '#00A65A',
					// },
				}}
			>
				<ListItemIcon sx={{ color: '#fff', minWidth: 24 }}>
					<FontAwesomeIcon icon={item.icon} />
				</ListItemIcon>
				<ListItemText primary={t(item.title)} />
				{expandedMenu === item.id ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse
				in={item.id === undefined ? open : expandedMenu === item.id}
				timeout="auto"
				unmountOnExit
			>
				<List sx={{ pl: 2, backgroundColor: '#2A638F', color: '#FDFBF1' }}>
					{children.map((child, key) => (
						<MenuItem key={key} item={child} />
					))}
				</List>
			</Collapse>
		</React.Fragment>
	);
}
