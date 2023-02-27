import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useWizardContext } from '../../contexts/wizard/useContext';

export const ButtonPrev = ({ handleClick }) => {
	const [t] = useTranslation('global');
	const { activePageIndex } = useWizardContext();
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
				color="error"
				onClick={handleClick}
				disabled={!(activePageIndex > 0)}
			>
				{t('common.atras')}
			</Button>
		</Grid>
	);
};
