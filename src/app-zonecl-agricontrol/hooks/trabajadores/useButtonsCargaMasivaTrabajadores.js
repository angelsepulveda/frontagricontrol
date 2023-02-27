import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { messageConfirm } from '../../../shared/helpers/message';
import { useCargaMasivaTrabajadoresContext } from '../../contexts/cargaMasivaTrabajadores';
import trabajadoresService from '../../services/trabajadoresService';

const useButtonsCargaMasivaTrabajadores = () => {
	const { trabajadores, dispatch } = useCargaMasivaTrabajadoresContext();
	const [update, setUpdate] = useState(false);

	const navigate = useNavigate();

	const handleSave = async () => {
		const message = {
			text: 'Estas seguro de ingresar estos registros?',
			confirmButtonText: 'Aceptar',
		};
		messageConfirm(message, async () => {
			if (trabajadores !== undefined) {
				const trabajadoresCreated = trabajadores.map((trabajador) => {
					return {
						codTrabajador: trabajador.codTrabajador
							.replace(/,/g, '')
							.replace(/-/g, ''),
						nombres: trabajador.nombres,
						primerApellido: trabajador.primerApellido,
						segundoApellido: trabajador.segundoApellido,
						codCuadrilla: trabajador.codCuadrilla,
						codContratista: trabajador.codContratista,
						fechaNacimiento: trabajador.fechaNacimiento,
						email: trabajador.email,
						telefono1: trabajador.telefono1,
						codSexo: trabajador.codSexo,
					};
				});

				if (update) {
					await trabajadoresService.updateMasivo(trabajadoresCreated);
				} else {
					await trabajadoresService.createMasivo(trabajadoresCreated);
				}

				navigate('/trabajadores');
			} else {
				dispatch({
					type: 'ERROR_MESSAGE',
					payload: 'Debe ingresar un excel con el listado de trabajadores',
				});
			}
		});
	};
	return {
		handleSave,
		navigate,
		setUpdate,
	};
};

export default useButtonsCargaMasivaTrabajadores;
