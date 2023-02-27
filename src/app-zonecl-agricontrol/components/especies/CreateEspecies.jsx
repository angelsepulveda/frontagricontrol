import { LoadingButton } from '@mui/lab';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { InputComponent,SelectComponent } from '../../../shared/components/controls';
import styleModalStandard from '../../../shared/helpers/styleModal';
import useCreateEspecie from '../../hooks/especies/useCreateEspecie';

const CreateEspecies = (props) => {
	const [t] = useTranslation('global');
	const open = props.open;
	const handleClose = props.closeHandle;
	const loadDataPais = props.loadData;

	const {
		onInsert,
		isActive,
		isActiveClose,
		isLoading,
		nemoTecnico,
		onValueChanged,
		especiesMaster,
		close,
	} = useCreateEspecie(handleClose, loadDataPais);

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
			>
				<Fade in={open}>
					<Card sx={styleModalStandard}>
						<Grid
							container
							spacing={2}
							sx={{ borderBottom: '1px solid #e9ecef' }}
						>
							<Grid
								item
								xs={12}
								md={12}
								sx={{
									paddingTop: 0,
									margin: 0,
								}}
							>
								<Typography
									id="transition-modal-title"
									variant="h6"
									component="h3"
								>
									{t('especies.registrar')}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={2} sx={{ padding: '50px 20px' }}>
							<Grid item xs={12} md={12}>
								<SelectComponent
									dataSource={especiesMaster}
									style={{ paddingBottom: '5px' }}
									displayExpr={'especie'}
									valueExpr={'codEspecie'}
									label={t('common.selectEspecie')}
									valueChangedEvent={onValueChanged}
									required={false}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<InputComponent
									value={nemoTecnico}
									label={t('common.nemoTecnico')}
									required={false}
									style={{ paddingBottom: '5px' }}
									disabled={true}
								/>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
							sx={{ borderTop: '1px solid #e0e0e0', marginBottom: 0 }}
						>
							<Grid item xs={12} md={6}>
								<LoadingButton
									fullWidth
									variant="contained"
									color="primary"
									disabled={isActive}
									loading={isLoading}
									onClick={() => onInsert()}
								>
									{t('common.guardar')}
								</LoadingButton>
							</Grid>
							<Grid item xs={12} md={6}>
								<Button
									fullWidth
									onClick={() => close()}
									variant="contained"
									disabled={isActiveClose}
									color="error"
								>
									{t('common.cancelar')}
								</Button>
							</Grid>
						</Grid>
					</Card>
				</Fade>
			</Modal>
		</div>
	);
};

export default CreateEspecies;
