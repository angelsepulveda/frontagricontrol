import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const DataGridSkeleton = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: 200,
			}}
		>
			<Skeleton
				animation="wave"
				variant="rectangular"
				width={'100%'}
				height={'100%'}
			/>
		</Box>
	);
};

export default DataGridSkeleton;
