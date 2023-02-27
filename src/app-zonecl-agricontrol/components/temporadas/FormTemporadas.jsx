import '../../../assets/css/app-zonecl-agricontrol/components/temporadas/formTemporadas.css';

import { Card } from '@mui/material';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button, ValidationSummary } from 'devextreme-react';
import { useTranslation } from 'react-i18next';

import {
	DateBoxComponent,
	InputComponent,
	SelectComponent,
} from '../../../shared/components/controls';
import styleModalFormTemporadas from '../../helpers/temporadas/stypeModalFormTemporadas';
import useFormTemporadas from '../../hooks/temporadas/useFormTemporadas';

const FormTemporadas = (props) => {
	const [t] = useTranslation('global');
	const open = props.open;
	const handleClose = props.closeHandle;
	const temporada = props.temporada;
	const setTemporada = props.setTemporada;
	const setFormModal = props.setFormModal;
	const loadData = props.loadData;
	const {
		especies,
		onInsert,
		isActive,
		close,
		estados,
		handleChangeEstado,
		formTemporada,
		handleChangeTermino,
		handleChangeInicio,
		handleChangeEspecie,
	} = useFormTemporadas(
		handleClose,
		temporada,
		setTemporada,
		setFormModal,
		loadData,
	);
	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={() => handleClose()}
				closeAfterTransition
			>
				<Fade in={open}>
					<Card sx={styleModalFormTemporadas}>
						<form action="" onSubmit={onInsert}>
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
										padding: 2,
										margin: 0,
									}}
								>
									<Typography
										id="transition-modal-title"
										variant="h6"
										component="h3"
										sx={{
											padding: 0,
											marginTop: '15px',
											alignContent: 'center',
										}}
									>
										{t('temporadas.formulario')}
									</Typography>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}
								sx={{ padding: '50px 50px', marginBottom: 2 }}
							>
								<Grid item xs={12} md={6}>
									<DateBoxComponent
										required={true}
										label={t('temporadas.inicio')}
										value={
											formTemporada.inicio
												? formTemporada.inicio
												: temporada.inicio
										}
										handleChangeEvent={handleChangeInicio}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<DateBoxComponent
										required={true}
										label={t('temporadas.termino')}
										value={
											formTemporada.termino
												? formTemporada.termino
												: temporada.termino
										}
										handleChangeEvent={handleChangeTermino}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<SelectComponent
										dataSource={especies}
										displayExpr={'especie'}
										valueExpr={'codEspecie'}
										label={t('common.especie')}
										value={
											formTemporada.codEspecie > 0
												? formTemporada.codEspecie
												: temporada.codEspecie
										}
										valueChangedEvent={handleChangeEspecie}
										required={true}
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<InputComponent
										value={
											formTemporada.temporada
												? formTemporada.temporada
												: temporada.temporada
										}
										label={t('temporadas.temporada')}
										disabled={true}
										required={true}
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<SelectComponent
										dataSource={estados}
										displayExpr={'estado'}
										valueExpr={'codEstado'}
										label={t('common.estado')}
										value={formTemporada.codEstado}
										valueChangedEvent={handleChangeEstado}
										required={true}
									/>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}
								sx={{
									borderTop: '1px solid #e0e0e0',
									marginBottom: 0,
									padding: 0,
								}}
							>
								<Grid
									item
									xs={12}
									md={6}
									alignContent="center"
									sx={{
										marginTop: '10px',
									}}
								>
									<ValidationSummary visible={false}></ValidationSummary>
									<Button
										width="100%"
										height={38}
										text={t('common.guardar')}
										type="success"
										disabled={isActive}
										stylingMode="contained"
										useSubmitBehavior={true}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									sx={{
										marginTop: '10px',
									}}
								>
									<Button
										width="100%"
										height={38}
										onClick={() => close()}
										stylingMode="contained"
										type="danger"
									>
										{t('common.cancelar')}
									</Button>
								</Grid>
							</Grid>
						</form>
					</Card>
				</Fade>
			</Modal>
		</>
	);
};

export default FormTemporadas;
