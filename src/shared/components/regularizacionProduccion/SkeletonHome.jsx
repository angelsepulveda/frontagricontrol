import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const SkeletonHome = () => {
	return (
		<>
			<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
				<Grid xs={12} item sx={{ padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={12} md={6} lg={4} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={6} md={6} lg={6} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
				<Grid xs={6} md={6} lg={6} item sx={{ mt: 3, padding: 1 }}>
					<Skeleton
						animation="wave"
						variant="rectangular"
						width={'100%'}
						height={60}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default SkeletonHome;
