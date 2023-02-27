import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IconBreadcrumbs = (props) => {
	const { urls } = props;
	const navigate = useNavigate();

	const [paths, setPaths] = useState([]);

	useEffect(() => {
		setPaths(urls);
	}, [urls]);

	return (
		<div
			role="presentation"
			style={{
				padding: '10px 0 10px 0',
				margin: '10px 10px',
				cursor: 'pointer',
			}}
		>
			<Breadcrumbs aria-label="breadcrumb">
				<Link
					underline="hover"
					sx={{ display: 'flex', alignItems: 'center' }}
					color="inherit"
					onClick={() => navigate('/dashboard')}
				>
					<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
					Dashboard
				</Link>
				{paths.map((path, index) => (
					<Link
						key={index}
						underline="hover"
						sx={{ display: 'flex', alignItems: 'center' }}
						color="inherit"
						onClick={() => navigate(path.url)}
					>
						{path.name === '/dashboard' || path.name === '/' ? '' : path.name}
					</Link>
				))}
			</Breadcrumbs>
		</div>
	);
};

export default IconBreadcrumbs;
