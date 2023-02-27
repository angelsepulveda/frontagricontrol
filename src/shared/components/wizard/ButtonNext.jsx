import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useWizardContext } from '../../contexts/wizard/useContext';

export const ButtonNext = ({ handleClick }) => {
	const [t] = useTranslation('global');
	const { activePageIndex, steps } = useWizardContext();

	const handleOnClick = async () => {
		await handleClick();
	};

	return (
		<Grid
			item={true}
			sx={{
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginBottom: 0,
				textAlign: 'center',
			}}
		>
			<Button
				variant="contained"
				fullWidth
				onClick={handleOnClick}
				disabled={!(activePageIndex < steps - 1)}
			>
				{t('common.siguiente')}
			</Button>
		</Grid>
	);
};
