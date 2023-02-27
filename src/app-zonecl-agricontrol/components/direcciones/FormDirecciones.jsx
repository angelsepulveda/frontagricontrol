import { Grid } from '@mui/material';
import { Button } from 'devextreme-react';
import { useTranslation } from 'react-i18next';

import {
	CheckBoxComponent,
	InputComponent,
	SelectComponent,
} from '../../../shared/components/controls';

const FormDirecciones = (props) => {
	const [t] = useTranslation('global');
	const {
		direcciones,
		isRemoveDireccion,
		handleRemove,
		handleChangeComuna,
		handleChangeDireccion,
		comunas,
		handleChangePredeterminada,
		isDisablePredeterminada,
	} = props;
	return (
		<>
			{direcciones.map((direccion, index) => (
				<Grid spacing={2} container sx={{ paddingLeft: 2 }} key={index}>
					<Grid
						md={12}
						xs={12}
						sm={12}
						lg={12}
						item={true}
						sx={{ padding: '5px', marginTop: 3 }}
					>
						{isRemoveDireccion ? (
							<Button
								icon="remove"
								text="Eliminar direccion"
								onClick={() => handleRemove(index)}
								type="danger"
							/>
						) : (
							''
						)}
					</Grid>
					<Grid md={12} xs={12} sm={12} lg={3} item={true}>
						<InputComponent
							label={t('direcciones.calle')}
							style={{ padding: '5px' }}
							value={direccion.calle}
							accessKey={index.toString()}
							name={'calle'}
							handleChangeEvent={handleChangeDireccion}
							required={true}
							maxLength={150}
						/>
					</Grid>
					<Grid md={12} xs={12} sm={12} lg={2} item={true}>
						<InputComponent
							label={t('direcciones.numero')}
							style={{ padding: '5px' }}
							value={direccion.numero}
							accessKey={index.toString()}
							name={'numero'}
							handleChangeEvent={handleChangeDireccion}
							required={true}
							maxLength={50}
						/>
					</Grid>
					<Grid md={12} xs={12} sm={12} lg={2} item={true}>
						<InputComponent
							label={t('direcciones.apartamento')}
							style={{ padding: '5px' }}
							value={direccion.apartamento}
							accessKey={index.toString()}
							name={'apartamento'}
							handleChangeEvent={handleChangeDireccion}
							required={false}
							maxLength={50}
						/>
					</Grid>
					<Grid md={12} xs={12} sm={12} lg={2} item={true}>
						<SelectComponent
							dataSource={comunas}
							style={{ padding: '5px' }}
							id={index.toString()}
							displayExpr={'comuna'}
							valueExpr={'codComuna'}
							label={t('common.comuna')}
							value={direccion.codComuna}
							selectionChangedEvent={handleChangeComuna}
							required={true}
						/>
					</Grid>
					<Grid md={12} xs={12} sm={12} lg={3} item={true}>
						<InputComponent
							label={t('direcciones.ciudad')}
							style={{ padding: '5px' }}
							value={direccion.ciudad}
							accessKey={index.toString()}
							name={'ciudad'}
							handleChangeEvent={handleChangeDireccion}
							required={false}
							maxLength={100}
						/>
					</Grid>
					<Grid md={12} xs={12} sm={12} lg={3} item={true}>
						<InputComponent
							label={t('direcciones.codigoPostal')}
							style={{ padding: '5px' }}
							value={direccion.codigoPostal}
							accessKey={index.toString()}
							name={'codigoPostal'}
							handleChangeEvent={handleChangeDireccion}
							required={false}
							maxLength={30}
						/>
					</Grid>
					<Grid md={12} xs={12} sm={12} lg={6} item={true}>
						<InputComponent
							label={t('direcciones.informacionAdicional')}
							style={{ padding: '5px' }}
							value={direccion.informacionAdicional}
							accessKey={index.toString()}
							name={'informacionAdicional'}
							handleChangeEvent={handleChangeDireccion}
							required={false}
							maxLength={50}
						/>
					</Grid>
					<Grid
						md={6}
						xs={6}
						sm={6}
						lg={2}
						item={true}
						sx={{ alignItems: 'center', textAlign: 'center' }}
					>
						<CheckBoxComponent
							styles={{ padding: '1px', marginBottom: '20px' }}
							label={t('common.predeterminada')}
							value={direccion.predeterminada === 1}
							name={'predeterminada'}
							valueChangeEvent={(e) => handleChangePredeterminada(e, index)}
							disabled={isDisablePredeterminada}
						/>
					</Grid>
				</Grid>
			))}
		</>
	);
};

export default FormDirecciones;
