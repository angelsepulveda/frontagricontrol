import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const SkeletonFormUsuarios = () => {
	return (
		<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
			<Grid
				xs={12}
				item={true}
				sx={{ paddingBottom: 4, borderBottom: '1px solid #e9ecef' }}
			>
				<Skeleton
					animation="wave"
					variant="rectangular"
					width={210}
					height={60}
				/>
			</Grid>
			<Grid xs={12} item={true} sx={{ minHeight: 350 }}>
				<form>
					<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
						<Grid xs={12} item={true} sx={{ marginTop: 4 }}></Grid>
						<Grid
							md={12}
							xs={12}
							sm={12}
							lg={2}
							item={true}
							sx={{ marginBottom: 2 }}
						></Grid>
						<Grid
							md={12}
							xs={12}
							sm={12}
							lg={2}
							item={true}
							sx={{ marginBottom: 2 }}
						></Grid>
					</Grid>

					<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
						<Grid
							md={12}
							xs={12}
							sm={12}
							lg={12}
							item={true}
							sx={{ padding: '5px' }}
						></Grid>
						<Grid md={12} xs={12} sm={12} lg={3} item={true}>
							<Skeleton
								animation="wave"
								variant="rectangular"
								width={'100%'}
								height={60}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={2} item={true}>
							<Skeleton
								animation="wave"
								variant="rectangular"
								width={'100%'}
								height={60}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={2} item={true}>
							<Skeleton
								animation="wave"
								variant="rectangular"
								width={'100%'}
								height={60}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={2} item={true}>
							<Skeleton
								animation="wave"
								variant="rectangular"
								width={'100%'}
								height={60}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={3} item={true}>
							<Skeleton
								animation="wave"
								variant="rectangular"
								width={'100%'}
								height={60}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={3} item={true}>
							<Skeleton
								animation="wave"
								variant="rectangular"
								width={'100%'}
								height={60}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={6} item={true}>
							<Skeleton
								animation="wave"
								variant="rectangular"
								width={'100%'}
								height={60}
							/>
						</Grid>
					</Grid>
					<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
						<Grid
							xs={12}
							md={12}
							sm={12}
							lg={6}
							item={true}
							sx={{ marginTop: 5 }}
						></Grid>
					</Grid>
					<Grid
						spacing={2}
						container
						sx={{
							paddingLeft: 2,
							marginTop: 4,
							paddingTop: 0,
							borderTop: '1px solid #e9ecef',
						}}
					>
						<Grid
							xs={12}
							md={12}
							sm={12}
							lg={6}
							item={true}
							sx={{ marginTop: 2 }}
						></Grid>
						<Grid
							xs={12}
							md={12}
							sm={12}
							lg={6}
							item={true}
							sx={{ marginTop: 2 }}
						></Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};

export default SkeletonFormUsuarios;
