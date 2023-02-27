import { Grid } from '@mui/material';
import { Children, useEffect } from 'react';

import { useWizardContext } from '../../contexts/wizard/useContext';

export const Pages = (props) => {
	const { activePageIndex, setSteps } = useWizardContext();
	const pages = Children.toArray(props.children);
	const steps = Children.count(props.children);
	const currentPages = pages[activePageIndex];

	useEffect(() => {
		setSteps(steps);
	}, [steps, setSteps]);

	return (
		<Grid
			xs={12}
			item={true}
			sx={{ paddingBottom: 1, borderBottom: '1px solid #e9ecef' }}
		>
			{currentPages}
		</Grid>
	);
};
