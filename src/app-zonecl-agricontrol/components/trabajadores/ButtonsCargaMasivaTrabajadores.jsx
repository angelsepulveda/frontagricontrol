import { Grid } from '@mui/material';
import { Button, CheckBox } from 'devextreme-react';
import { useTranslation } from 'react-i18next';

import useButtonsCargaMasivaTrabajadores from '../../hooks/trabajadores/useButtonsCargaMasivaTrabajadores';

const ButtonsCargaMasivaTrabajadores = () => {
	const [t] = useTranslation('global');

	const { handleSave, navigate, setUpdate } =
		useButtonsCargaMasivaTrabajadores();
	return (
		<Grid spacing={2} container sx={{ paddingLeft: 2 }}>
			<Grid
				xs={12}
				md={12}
				sm={12}
				lg={12}
				item={true}
				sx={{ marginLeft: 2, marginTop: 0 }}
			>
				<CheckBox
					text="Actualiza datos para trabajadores existentes"
					onValueChanged={(e) => setUpdate(e.value)}
				/>
			</Grid>
			<Grid xs={12} md={12} sm={12} lg={6} item={true} sx={{ marginTop: 2 }}>
				<Button
					width="100%"
					height={38}
					text={t('common.guardar')}
					type="default"
					stylingMode="contained"
					onClick={() => handleSave()}
				/>
			</Grid>
			<Grid xs={12} md={12} sm={12} lg={6} item={true} sx={{ marginTop: 2 }}>
				<Button
					width="100%"
					height={38}
					text={t('common.cancelar')}
					type="danger"
					stylingMode="contained"
					onClick={() => navigate('/trabajadores')}
				/>
			</Grid>
		</Grid>
	);
};

export default ButtonsCargaMasivaTrabajadores;
