import '../../../assets/css/app-zonecl-agricontrol/components/direcciones/ViewDirecciones.css';

import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CheckBoxComponent,InputComponent, SelectComponent } from '../../../shared/components/controls'
import useViewDirecciones from '../../hooks/direcciones/useViewDirecciones';

const ViewDirecciones = (props) => {
	const [t] = useTranslation('global');
	const { direcciones } = props;

	const { comunas } = useViewDirecciones();

	if (direcciones.length > 0) {
		return (
			<>
				{direcciones.map((direccion, index) => (
					<Grid spacing={2} container sx={{ paddingLeft: 2 }} key={index}>
						<Grid md={12} xs={12} sm={12} lg={3} item={true}>
							<InputComponent
								value={direccion.calle}
								label={t('direcciones.calle')}
								disabled={true}
								style={{ padding: '5px' }}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={2} item={true}>
							<InputComponent
								value={direccion.numero}
								label={t('direcciones.numero')}
								disabled={true}
								style={{ padding: '5px' }}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={2} item={true}>
							<InputComponent
								value={direccion.apartamento}
								label={t('direcciones.apartamento')}
								disabled={true}
								style={{ padding: '5px' }}
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
								disabled={true}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={3} item={true}>
							<InputComponent
								value={direccion.ciudad}
								label={t('direcciones.ciudad')}
								disabled={true}
								style={{ padding: '5px' }}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={3} item={true}>
							<InputComponent
								value={direccion.codigoPostal}
								label={t('direcciones.codigoPostal')}
								disabled={true}
								style={{ padding: '5px' }}
							/>
						</Grid>
						<Grid md={12} xs={12} sm={12} lg={6} item={true}>
							<InputComponent
								value={direccion.informacionAdicional}
								label={t('direcciones.informacionAdicional')}
								disabled={true}
								style={{ padding: '5px' }}
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
								disabled={true}
							/>
						</Grid>
					</Grid>
				))}
			</>
		);
	} else {
		return (
			<div className="direcciones ">
				<h6>No hay direcciones</h6>
			</div>
		);
	}
};

export default ViewDirecciones;
