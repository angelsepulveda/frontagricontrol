import '../../../assets/css/app-zonecl-agricontrol/components/trabajadores/cargaMasiva.css';

import { LoadPanel } from 'devextreme-react';
import { useReducer } from 'react';

import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import ButtonsCargaMasivaTrabajadores from '../../components/trabajadores/ButtonsCargaMasivaTrabajadores';
import DataGridCargaTrabajadores from '../../components/trabajadores/DataGridCargaTrabajadores';
import DragAndDropTrabajadores from '../../components/trabajadores/DragAndDropTrabajadores';
import {
	CargaMasivaTrabajadoresContext,
	reducer,
} from '../../contexts/cargaMasivaTrabajadores';
import useCargaMasivaTrabajadores from '../../hooks/trabajadores/useCargaMasivaTrabajadores';

export const CargaMasivaTrabajadores = () => {
	const { setIsLoading, cuadrillas, contratistas, sexos, isLoading } =
		useCargaMasivaTrabajadores();

	const [state, dispatch] = useReducer(reducer);

	const context = {
		...state,
		dispatch,
	};

	return (
		<>
			<LoadPanel
				shadingColor="rgba(0,0,0,0.4)"
				visible={isLoading}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			<IconBreadcrumbs
				urls={[
					{ name: 'trabajadores', url: '/trabajadores' },
					{ name: 'carga-masiva', url: '/trabajadores/carga-masiva' },
				]}
			/>
			<CargaMasivaTrabajadoresContext.Provider value={context}>
				<DragAndDropTrabajadores
					setIsLoading={setIsLoading}
					cuadrillas={cuadrillas}
					sexos={sexos}
					contratistas={contratistas}
				/>
				<DataGridCargaTrabajadores />
				<ButtonsCargaMasivaTrabajadores />
			</CargaMasivaTrabajadoresContext.Provider>
		</>
	);
};
